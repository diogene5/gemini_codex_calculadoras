import { useEffect, useMemo, useState } from 'react';
import { Download, Signal, SignalHigh, X } from 'lucide-react';

const DISMISS_KEY = 'calc-ped-install-banner-dismissed';

export function PwaInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISS_KEY) === 'true');

  const isStandalone = useMemo(() => {
    const displayModeStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const navigatorStandalone = window.navigator.standalone === true;
    return displayModeStandalone || navigatorStandalone;
  }, []);

  const isIos = useMemo(() => /iphone|ipad|ipod/i.test(window.navigator.userAgent), []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      localStorage.removeItem(DISMISS_KEY);
      setDismissed(false);
    };

    const handleInstalled = () => {
      setDeferredPrompt(null);
      localStorage.setItem(DISMISS_KEY, 'true');
      setDismissed(true);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showInstallBanner = !isStandalone && !dismissed && (Boolean(deferredPrompt) || isIos);

  if (!showInstallBanner && isOnline) {
    return null;
  }

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, 'true');
    setDismissed(true);
  };

  const install = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    localStorage.setItem(DISMISS_KEY, 'true');
    setDismissed(true);
  };

  return (
    <div className="pwa-stack">
      {!isOnline ? (
        <div className="pwa-banner pwa-banner-offline">
          <div className="pwa-banner-copy">
            <span className="pwa-banner-title">
              <Signal size={16} />
              Sem internet
            </span>
            <p>O app continua usando conteudo em cache e os modulos ja visitados.</p>
          </div>
          <span className="pwa-chip">
            <SignalHigh size={14} />
            Offline
          </span>
        </div>
      ) : null}

      {showInstallBanner ? (
        <div className="pwa-banner">
          <div className="pwa-banner-copy">
            <span className="pwa-banner-title">
              <Download size={16} />
              Instalar no celular
            </span>
            <p>
              {deferredPrompt
                ? 'Instale como app para abrir mais rapido e usar o cache offline.'
                : 'No iPhone/iPad, use Compartilhar > Adicionar a Tela de Inicio.'}
            </p>
          </div>

          <div className="pwa-banner-actions">
            {deferredPrompt ? (
              <button type="button" className="pwa-primary" onClick={install}>
                Instalar
              </button>
            ) : null}
            <button type="button" className="pwa-ghost" onClick={dismiss} aria-label="Fechar banner">
              <X size={16} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
