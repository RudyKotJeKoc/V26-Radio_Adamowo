// Safety utilities for domestic violence support
import { SafetyConfig, CrisisContact } from '../types';

export const SAFETY_TOOLS = {
  QUICK_EXIT_KEY: 'Escape',
  STEALTH_REDIRECT_URL: 'https://www.google.com',
  HISTORY_CLEAR_DELAY: 100,
  ANONYMOUS_SESSION_KEY: 'radio_adamowo_anonymous'
} as const;

export const DEFAULT_CRISIS_CONTACTS: CrisisContact[] = [
  {
    name: 'Ogólnopolskie Pogotowie dla Ofiar Przemocy w Rodzinie',
    phone: '800 120 002',
    available24h: true,
    type: 'helpline',
    description: 'Bezpłatna pomoc dla ofiar przemocy domowej'
  },
  {
    name: 'Policja',
    phone: '997',
    available24h: true,
    type: 'police',
    description: 'Natychmiastowa pomoc w sytuacji zagrożenia'
  },
  {
    name: 'Telefon Zaufania dla Kobiet',
    phone: '800 897 888',
    available24h: true,
    type: 'helpline',
    description: 'Wsparcie psychologiczne i informacyjne'
  }
];

export class SafetyFeatures {
  private static config: SafetyConfig = {
    quickExitEnabled: true,
    stealthModeEnabled: true,
    anonymousSession: true,
    clearHistoryOnExit: true
  };

  static enableStealthMode(): void {
    // Store current page state
    sessionStorage.setItem('radio_adamowo_return_url', window.location.href);
    
    // Clear any audio that might be playing
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    
    // Redirect to safe site
    window.location.replace(SAFETY_TOOLS.STEALTH_REDIRECT_URL);
  }

  static clearBrowserHistory(): void {
    // Clear session storage
    sessionStorage.clear();
    
    // Clear local storage related to the app
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('radio_adamowo')) {
        localStorage.removeItem(key);
      }
    });

    // Replace history state
    if (window.history.replaceState) {
      window.history.replaceState(null, '', SAFETY_TOOLS.STEALTH_REDIRECT_URL);
    }
  }

  static enableAnonymousSession(): void {
    sessionStorage.setItem(SAFETY_TOOLS.ANONYMOUS_SESSION_KEY, 'true');
    
    // Disable analytics
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        send_page_view: false
      });
    }
  }

  static isAnonymousSession(): boolean {
    return sessionStorage.getItem(SAFETY_TOOLS.ANONYMOUS_SESSION_KEY) === 'true';
  }

  static quickExit(): void {
    this.clearBrowserHistory();
    this.enableStealthMode();
  }

  static initializeSafetyListeners(): void {
    // Global ESC key listener
    document.addEventListener('keydown', (event) => {
      if (event.key === SAFETY_TOOLS.QUICK_EXIT_KEY && !event.ctrlKey && !event.altKey) {
        // Don't trigger on form inputs unless it's a triple ESC
        const target = event.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          return;
        }
        
        event.preventDefault();
        this.quickExit();
      }
    });

    // Detection of external navigation (back button, etc.)
    window.addEventListener('beforeunload', () => {
      if (this.config.clearHistoryOnExit) {
        this.clearBrowserHistory();
      }
    });
  }

  static updateConfig(newConfig: Partial<SafetyConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  static getConfig(): SafetyConfig {
    return { ...this.config };
  }
}