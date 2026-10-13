// ZEN Automotive Analytics & Privacy-Friendly Telemetry Tracker

class ZenAnalytics {
  constructor() {
    this.storageKey = 'zen_analytics_events';
    this.consentKey = 'zen_cookie_consent';
    this.sessionStartTime = Date.now();
    this.init();
  }

  init() {
    // Check user consent
    this.hasConsent = localStorage.getItem(this.consentKey) === 'accepted';
    
    // Auto track page view
    this.track('page_view', {
      path: window.location.pathname,
      title: document.title,
      referrer: document.referrer || 'direct'
    });
  }

  setConsent(accepted) {
    this.hasConsent = accepted;
    localStorage.setItem(this.consentKey, accepted ? 'accepted' : 'declined');
    if (accepted) {
      this.track('consent_granted', { timestamp: Date.now() });
    }
  }

  track(eventName, properties = {}) {
    // Non-intrusive console logging in development
    const payload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      duration: Math.round((Date.now() - this.sessionStartTime) / 1000),
      ...properties
    };

    if (import.meta.env?.DEV) {
      console.log(`[ZEN Analytics] ⚡ ${eventName}`, payload);
    }

    // Optional dispatch to Vercel Analytics if available
    if (window.va) {
      window.va('event', { name: eventName, data: properties });
    }

    // Save recent events in memory/session for debugging if needed
    try {
      const recent = JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
      recent.push(payload);
      if (recent.length > 50) recent.shift();
      sessionStorage.setItem(this.storageKey, JSON.stringify(recent));
    } catch {
      // Ignore storage errors in private browsing
    }
  }
}

export const analytics = new ZenAnalytics();
window.zenAnalytics = analytics;
