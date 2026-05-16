"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { DEFAULT_CONFIG, ADMIN_PASSWORD, type WikiConfig } from './wiki-store';

interface WikiContextType {
  config: WikiConfig;
  setConfig: (config: WikiConfig) => void;
  isAdminMode: boolean;
  setAdminMode: (mode: boolean) => void;
  checkAdminPassword: (password: string) => boolean;
  // Track article visits for force
  incrementArticleIndex: () => void;
  resetArticleIndex: () => void;
  getCurrentLetterIndex: () => number;
  activateForce: () => void;
  deactivateForce: () => void;
  isHydrated: boolean;
}

const WikiContext = createContext<WikiContextType | undefined>(undefined);

const STORAGE_KEY = 'wiki-akronym-config';
const SESSION_KEY = 'wiki-akronym-session'; // For runtime state (force active, article index)

export function WikiProvider({ children }: { children: ReactNode }) {
  const [config, setConfigState] = useState<WikiConfig>(DEFAULT_CONFIG);
  const [isAdminMode, setAdminMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load config from localStorage on mount, but URL params take priority
  useEffect(() => {
    // Mark as hydrated
    setIsHydrated(true);
    
    // First check URL params - these override everything (for sharing between devices)
    const urlParams = new URLSearchParams(window.location.search);
    const urlPosition = urlParams.get('p');
    const urlName = urlParams.get('n');
    const urlMaskText = urlParams.get('m');
    const urlFeedback = urlParams.get('f');
    
    // Start with stored config or defaults
    let baseConfig = { ...DEFAULT_CONFIG };
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        baseConfig = { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch (e) {
      console.error('Failed to parse stored config:', e);
    }
    
    // Load runtime session state (force active, article index) from sessionStorage
    try {
      const sessionData = sessionStorage.getItem(SESSION_KEY);
      if (sessionData) {
        const session = JSON.parse(sessionData);
        baseConfig.isForceActive = session.isForceActive || false;
        baseConfig.currentArticleIndex = session.currentArticleIndex || 0;
      }
    } catch (e) {
      console.error('Failed to parse session data:', e);
    }
    
    // Override with URL params if present (for cross-device sharing)
    if (urlPosition && urlName) {
      const position = parseInt(urlPosition, 10);
      if (position >= 1 && position <= 6) {
        baseConfig.forcePosition = position;
        baseConfig.forceName = urlName.toUpperCase();
      }
    }
    
    if (urlMaskText) {
      baseConfig.maskText = decodeURIComponent(urlMaskText);
    }
    
    if (urlFeedback !== null) {
      baseConfig.showFeedback = urlFeedback === '1';
    }
    
    setConfigState(baseConfig);
  }, []);

  const setConfig = (newConfig: WikiConfig) => {
    setConfigState(newConfig);
    // Save to localStorage (but reset active states)
    const toStore = { ...newConfig, currentArticleIndex: 0, isForceActive: false };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  };

  const checkAdminPassword = (password: string) => {
    const storedPassword = localStorage.getItem('wiki-admin-password') || ADMIN_PASSWORD;
    return password === storedPassword;
  };

  // Helper to save session state
  const saveSessionState = (isForceActive: boolean, currentArticleIndex: number) => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ isForceActive, currentArticleIndex }));
    } catch (e) {
      console.error('Failed to save session state:', e);
    }
  };

  const activateForce = () => {
    setConfigState(prev => {
      const newState = { ...prev, isForceActive: true, currentArticleIndex: 0 };
      saveSessionState(true, 0);
      return newState;
    });
  };

  const deactivateForce = () => {
    setConfigState(prev => {
      saveSessionState(false, 0);
      sessionStorage.removeItem(SESSION_KEY);
      return { ...prev, isForceActive: false, currentArticleIndex: 0 };
    });
  };

  const incrementArticleIndex = () => {
    setConfigState(prev => {
      const newIndex = prev.currentArticleIndex + 1;
      saveSessionState(prev.isForceActive, newIndex);
      return { ...prev, currentArticleIndex: newIndex };
    });
  };

  const resetArticleIndex = () => {
    setConfigState(prev => {
      saveSessionState(prev.isForceActive, 0);
      return { ...prev, currentArticleIndex: 0 };
    });
  };

  // Get current letter index (0-based, which letter of forceName we're on)
  const getCurrentLetterIndex = (): number => {
    // currentArticleIndex starts at 0 after first click activates force
    // So article 0 = letter 0, article 1 = letter 1, etc.
    return config.currentArticleIndex;
  };

  return (
    <WikiContext.Provider
      value={{
        config,
        setConfig,
        isAdminMode,
        setAdminMode,
        checkAdminPassword,
        incrementArticleIndex,
        resetArticleIndex,
        getCurrentLetterIndex,
        activateForce,
        deactivateForce,
        isHydrated,
      }}
    >
      {children}
    </WikiContext.Provider>
  );
}

export function useWiki() {
  const context = useContext(WikiContext);
  if (context === undefined) {
    throw new Error('useWiki must be used within a WikiProvider');
  }
  return context;
}
