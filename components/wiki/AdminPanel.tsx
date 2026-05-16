"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Keyboard, 
  Home,
  Info,
  Lock,
  Wand2,
  CheckCircle,
  Hash,
  Eye,
  MessageSquare
} from 'lucide-react';
import { useWiki } from '@/lib/wiki-context';
import { DEFAULT_CONFIG, ADMIN_PASSWORD, ACTIVATION_CODE } from '@/lib/wiki-store';

export function AdminPanel() {
  const router = useRouter();
  const { config, setConfig, setAdminMode, resetArticleIndex, deactivateForce } = useWiki();
  
  const [localConfig, setLocalConfig] = useState(config);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'help' | 'settings'>('help');

  useEffect(() => {
    setLocalConfig(config);
  }, [config]);

  const handleSave = () => {
    setConfig(localConfig);
    
    if (newAdminPassword) {
      localStorage.setItem('wiki-admin-password', newAdminPassword);
    }
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setLocalConfig(DEFAULT_CONFIG);
    resetArticleIndex();
    deactivateForce();
    localStorage.removeItem('wiki-admin-password');
  };

  const handleExit = () => {
    setAdminMode(false);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Akronym Admin Panel</h1>
              <p className="text-xs text-gray-400">Tajne nastavenia kuzelnickeh triku</p>
            </div>
          </div>
          
          <button
            onClick={handleExit}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <Home className="w-4 h-4" />
            Spat na Wiki
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('help')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'help' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Info className="w-4 h-4 inline mr-2" />
              Navod
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'settings' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Nastavenia
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'help' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 space-y-6">
              <h2 className="text-xl font-medium">Ako funguje AKRONYM trik</h2>
              
              <div className="space-y-4">
                <div className="bg-purple-900/30 border border-purple-700/50 rounded-lg p-4">
                  <h3 className="font-medium text-purple-400 mb-3 flex items-center gap-2">
                    <Wand2 className="w-5 h-5" />
                    Princip triku
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Divak si vyberie niekolko nahodnych clankov z Wikipedie. Kazdy clanok obsahuje klucove slovo. 
                    Z tych slov na urcitej pozicii (napr. 3. pismeno) sa zlozi jeho meno!
                  </p>
                  <div className="bg-gray-900 rounded-lg p-3 text-sm">
                    <p className="text-gray-400 mb-2">Priklad pre meno &quot;PETER&quot; s poziciou 3:</p>
                    <div className="text-gray-300 space-y-1 font-mono">
                      <div>1. clanok: slovo &quot;o<span className="text-purple-400 font-bold underline">P</span>era&quot; - 3. pismeno = P</div>
                      <div>2. clanok: slovo &quot;id<span className="text-purple-400 font-bold underline">E</span>a&quot; - 3. pismeno = E</div>
                      <div>3. clanok: slovo &quot;vi<span className="text-purple-400 font-bold underline">T</span>az&quot; - 3. pismeno = T</div>
                      <div>4. clanok: slovo &quot;id<span className="text-purple-400 font-bold underline">E</span>al&quot; - 3. pismeno = E</div>
                      <div>5. clanok: slovo &quot;bu<span className="text-purple-400 font-bold underline">R</span>ka&quot; - 3. pismeno = R</div>
                    </div>
                    <p className="text-purple-400 mt-2 font-bold">= P-E-T-E-R</p>
                  </div>
                </div>

                <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-4">
                  <h3 className="font-medium text-blue-400 mb-3 flex items-center gap-2">
                    <Keyboard className="w-5 h-5" />
                    Aktivacia (kod: {ACTIVATION_CODE})
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Vo vyhladavani napises &quot;{ACTIVATION_CODE}&quot; (5x pismeno x) a aktivuje sa tajny rezim. Kym pises kod, na obrazovke sa zobrazuje maskovaci text.
                  </p>
                  <div className="bg-gray-900 rounded-lg p-3 text-sm">
                    <ol className="text-gray-300 space-y-2 ml-4 list-decimal">
                      <li><code className="bg-gray-800 px-1 rounded">{ACTIVATION_CODE}</code> - napis 5x &quot;x&quot;, aktivuje tajny rezim (zobrazuje sa maskovaci text)</li>
                      <li>Pismeno pre poziciu:
                        <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
                          <span><code className="bg-gray-800 px-1 rounded">a</code> = pozicia 1</span>
                          <span><code className="bg-gray-800 px-1 rounded">b</code> = pozicia 2</span>
                          <span><code className="bg-gray-800 px-1 rounded">c</code> = pozicia 3</span>
                          <span><code className="bg-gray-800 px-1 rounded">d</code> = pozicia 4</span>
                          <span><code className="bg-gray-800 px-1 rounded">e</code> = pozicia 5</span>
                          <span><code className="bg-gray-800 px-1 rounded">f</code> = pozicia 6</span>
                        </div>
                      </li>
                      <li>Pises meno divaka - kazde pismeno sa zobrazi</li>
                      <li><code className="bg-gray-800 px-1 rounded">medzera</code> - potvrdi meno a ukonci tajny rezim</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
                  <h3 className="font-medium text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Cely postup
                  </h3>
                  <ol className="text-gray-300 text-sm space-y-2 ml-4 list-decimal">
                    <li>Popros divaka nech ti povie meno (napr. &quot;Peter&quot;)</li>
                    <li>Vo vyhladavani napises: <code className="bg-gray-800 px-1 rounded">{ACTIVATION_CODE}</code> + <code className="bg-gray-800 px-1 rounded">c</code> + <code className="bg-gray-800 px-1 rounded">peter</code> + <code className="bg-gray-800 px-1 rounded">medzera</code></li>
                    <li>Kym pises, divak vidi maskovaci text: &quot;{config.maskText}&quot;</li>
                    <li>Po medzerere je meno ulozene. Pokracuj v pisani (zobrazuje sa dalsi maskovaci text)</li>
                    <li>Divak si vyberie clanok - tym sa aktivuje FORCE</li>
                    <li>Na kazdom clanku su teraz FORCE linky - divak si vyberie clanky podla poctu pismen v mene</li>
                    <li>Kazdy clanok ma slova kde na zvolenej pozicii je pismeno z jeho mena</li>
                    <li>Po poslednom pismene sa automaticky presmeruje na sk.wikipedia.org</li>
                  </ol>
                </div>

                <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-4">
                  <h3 className="font-medium text-yellow-400 mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Feedback funkcia
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Ak zapnes Feedback v nastaveniach, v navrhoch vyhladavania sa zobrazi potvrdenie zadaneho mena 
                    (v popise druheho vysledku). Toto je uzitocne pre overenie ze si spravne zadal meno.
                  </p>
                </div>
              </div>

              <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 text-sm text-gray-300">
                <strong>Tip:</strong> URL s parametrami (<code className="bg-gray-700 px-1 rounded">?p=3&n=PETER</code>) mozes otvorit na hociktorom zariadeni - nastavenia sa automaticky nacitaju!
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Status */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Hash className="w-5 h-5 text-purple-400" />
                  Aktualny stav triku
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Force meno</label>
                    <div className="bg-gray-700 rounded px-3 py-2 font-mono text-lg">
                      {config.forceName || <span className="text-gray-500">Nenastavene</span>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Force pozicia</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6].map((pos) => (
                        <div
                          key={pos}
                          className={`w-10 h-10 rounded-lg font-bold text-lg flex items-center justify-center ${
                            config.forcePosition === pos
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-700 text-gray-500'
                          }`}
                        >
                          {pos}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Stav force</label>
                    <div className={`rounded px-3 py-2 ${config.isForceActive ? 'bg-green-700' : 'bg-gray-700'}`}>
                      {config.isForceActive ? 'AKTIVNY' : 'Neaktivny'} 
                      {config.isForceActive && ` - clanok ${config.currentArticleIndex + 1}/${config.forceName.length}`}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Aktualne pismeno</label>
                    <div className="bg-gray-700 rounded px-3 py-2">
                      {config.forceName ? (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-lg tracking-widest">
                            {config.forceName.split('').map((char, i) => (
                              <span 
                                key={i} 
                                className={i === config.currentArticleIndex ? 'text-green-400 font-bold' : 'text-gray-400'}
                              >
                                {char}
                              </span>
                            ))}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ({config.currentArticleIndex + 1}/{config.forceName.length})
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    resetArticleIndex();
                    deactivateForce();
                  }}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Resetovat trik
                </button>
              </div>

              {/* Mask text setting */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-400" />
                  Maskovaci text
                </h2>
                <p className="text-gray-400 text-sm mb-3">
                  Tento text sa zobrazuje kym pises aktivacny kod ({ACTIVATION_CODE})
                </p>
                <input
                  type="text"
                  value={localConfig.maskText}
                  onChange={(e) => setLocalConfig({ ...localConfig, maskText: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  placeholder="Historia Slovenska"
                />
              </div>
            </div>

            {/* Settings column */}
            <div className="space-y-6">
              {/* Feedback setting */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-yellow-400" />
                  Feedback
                </h2>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localConfig.showFeedback}
                    onChange={(e) => setLocalConfig({ ...localConfig, showFeedback: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-300">
                    Zobrazit potvrdenie mena v navrhoch vyhladavania
                  </span>
                </label>
                <p className="text-gray-500 text-xs mt-2">
                  Ak je zapnute, v popise druheho vysledku sa zobrazi [MENO@POZICIA]
                </p>
              </div>

              {/* Admin password */}
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-yellow-400" />
                  Heslo administratora
                </h2>
                
                <div className="mb-4">
                  <label className="block text-sm text-gray-400 mb-2">
                    Nove heslo pre pristup do admin panelu
                  </label>
                  <input
                    type="password"
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    placeholder="Nechajte prazdne ak nechcete zmenit"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Aktualne heslo: <code className="bg-gray-700 px-1 rounded">{ADMIN_PASSWORD}</code>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {saved ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Ulozene!
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Ulozit nastavenia
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
