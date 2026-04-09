'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

type ConsentState = 'pending' | 'accepted' | 'rejected';

export const CookieConsent: React.FC = () => {
  const [consent, setConsent] = useState<ConsentState>('pending');
  const [visible, setVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const stored = localStorage.getItem('cookie_consent');
    if (stored === 'accepted') {
      setConsent('accepted');
      enableAnalytics();
    } else if (stored === 'rejected') {
      setConsent('rejected');
    } else {
      // No consent stored — show banner after brief delay
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const enableAnalytics = () => {
    // Fire GTM only after consent
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    if (gtmId && !document.querySelector(`script[src*="googletagmanager.com/gtm.js?id=${gtmId}"]`)) {
      const gtmScript = document.createElement('script');
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      document.head.appendChild(gtmScript);
    }

    // Fire Apollo.io tracker only after consent
    if (!document.querySelector('script[src*="assets.apollo.io"]')) {
      const apolloScript = document.createElement('script');
      apolloScript.innerHTML = `
        (function(){
          var n=Math.random().toString(36).substring(7),
          o=document.createElement("script");
          o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;
          o.async=true;o.defer=true;
          o.onload=function(){window.trackingFunctions.onLoad({appId:"691d948496127f0021ef7728"})};
          document.head.appendChild(o)
        })();
      `;
      document.head.appendChild(apolloScript);
    }
  };

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setConsent('accepted');
    setVisible(false);
    enableAnalytics();
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setConsent('rejected');
    setVisible(false);
  };

  if (!visible || consent !== 'pending') return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[80] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-[#1a1a1a] border border-white/10 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="text-white/80 text-sm leading-relaxed">
            We use cookies to analyze site traffic and improve your experience. By clicking &ldquo;Accept&rdquo;, you consent to our use of analytics cookies.{' '}
            <Link href={`/${locale}/cookies`} className="text-brand-orange hover:underline">
              Cookie Policy
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleReject}
            className="px-5 py-2 text-white/60 hover:text-white text-sm font-label transition-colors"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-brand-orange text-black text-sm font-label font-bold hover:bg-amber-400 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
