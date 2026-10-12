// Share requests across API routes, retry transient Wikimedia errors, and retain
// successful responses as a fallback when Wikimedia temporarily rejects traffic.
const cache = new Map<string, { body: string; contentType: string; saved: number }>();
const pending = new Map<string, Promise<Response>>();
let cooldownUntil = 0;
export async function fetchWikipediaResource(url: string, init?: RequestInit): Promise<Response> {
  const saved = cache.get(url);
  const restore = () => new Response(saved!.body, {headers:{'Content-Type':saved!.contentType}});
  if (saved && (Date.now() - saved.saved < 300000 || Date.now() < cooldownUntil)) return restore();
  if (Date.now() < cooldownUntil) throw new Error('Wikipedia is rate-limiting requests');
  const inFlight = pending.get(url);
  if (inFlight) return (await inFlight).clone();
  const run = async () => {
    let last: unknown;
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const response = await fetch(url, { ...init, headers: { 'User-Agent': 'WikiForce/1.0 (Slovak Wikipedia reader)', ...init?.headers }, signal: AbortSignal.timeout(10000) });
        if (response.ok) {
          const body = await response.text();
          const data = JSON.parse(body);
          if (['maxlag', 'ratelimited', 'readonly', 'internal_api_error'].some(code => data.error?.code?.startsWith(code))) throw new Error(data.error.code);
          cache.delete(url);
          const contentType = response.headers.get('content-type') || 'application/json';
          cache.set(url, {body,contentType,saved:Date.now()});
          let bytes = Array.from(cache.values()).reduce((total, entry) => total + entry.body.length * 2, 0);
          while (cache.size > 200 || bytes > 32 * 1024 * 1024) {
            const oldest = cache.keys().next().value!;
            bytes -= cache.get(oldest)!.body.length * 2;
            cache.delete(oldest);
          }
          return new Response(body, {headers:{'Content-Type':contentType}});
        }
        last = new Error(`Wikipedia HTTP ${response.status}`);
        if (saved) return restore();
        if (response.status === 429) {
          const seconds = Number(response.headers.get('retry-after'));
          cooldownUntil = Date.now() + Math.min(Number.isFinite(seconds) && seconds > 0 ? seconds : 30, 60) * 1000;
          break;
        }
        if (response.status === 404) return response;
      } catch (error) { last = error; }
      if (attempt < 3) await new Promise(resolve => setTimeout(resolve, 500 * 2 ** attempt));
    }
    if (saved) return restore();
    throw last instanceof Error ? last : new Error('Wikipedia unavailable');
  };
  const promise = run();
  pending.set(url, promise);
  try { return (await promise).clone(); } finally { pending.delete(url); }
}
