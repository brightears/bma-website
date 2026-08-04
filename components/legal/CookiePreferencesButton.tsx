'use client';

export function CookiePreferencesButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="mt-4 inline-flex min-h-11 items-center rounded-full border border-[#f0a539]/30 px-5 font-label text-sm font-semibold text-[#f0a539] transition hover:border-[#f0a539] hover:bg-[#f0a539]/10"
      onClick={() => window.dispatchEvent(new Event('bma:open-cookie-preferences'))}
    >
      {children}
    </button>
  );
}
