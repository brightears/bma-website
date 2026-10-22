import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';
import { OFFICIAL_CONTACTS } from '@/lib/official-contacts';

const NEVER_ITEMS = ['commands', 'remoteTools', 'secrets', 'bank'] as const;

/**
 * Anti-impersonation notice listing BMAsia's official channels. Every value
 * comes from lib/official-contacts.ts (derived from lib/constants.ts).
 */
export function VerifyContacts({ className = '' }: { className?: string }) {
  const t = useTranslations('verifyContacts');

  return (
    <section aria-labelledby="verify-bmasia-contacts" className={`rounded-[1.25rem] border border-white/[0.09] bg-white/[0.02] p-5 ${className}`}>
      <h3 id="verify-bmasia-contacts" className="flex items-center gap-2 font-label text-sm font-semibold text-white">
        <ShieldCheck className="h-4 w-4 text-[#49d5c5]" aria-hidden="true" />
        {t('title')}
      </h3>
      <p className="mt-2 text-sm leading-6 text-white/48">{t('intro')}</p>

      <dl className="mt-4 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
        <dt className="text-white/40">{t('domainsLabel')}</dt>
        <dd className="text-white/72">
          {OFFICIAL_CONTACTS.domains.map((domain, index) => (
            <span key={domain}>
              {index > 0 && ', '}
              <a href={`https://${domain}`} className="hover:text-[#efa634]">{domain}</a>
            </span>
          ))}
        </dd>
        <dt className="text-white/40">{t('emailLabel')}</dt>
        <dd className="text-white/72">
          <a href={`mailto:${OFFICIAL_CONTACTS.email}`} className="hover:text-[#efa634]">{OFFICIAL_CONTACTS.email}</a>
        </dd>
        <dt className="text-white/40">{t('phoneLabel')}</dt>
        <dd className="text-white/72">
          <a href={OFFICIAL_CONTACTS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-[#efa634]">{OFFICIAL_CONTACTS.phoneDisplay}</a>
        </dd>
        <dt className="text-white/40">{t('lineLabel')}</dt>
        <dd className="text-white/72">
          <a href={OFFICIAL_CONTACTS.line} target="_blank" rel="noopener noreferrer" className="break-all hover:text-[#efa634]">{OFFICIAL_CONTACTS.line.replace(/^https:\/\//, '')}</a>
        </dd>
      </dl>

      <p className="mt-4 text-sm font-medium text-white/72">{t('neverTitle')}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-white/48">
        {NEVER_ITEMS.map((key) => <li key={key}>{t(`never.${key}`)}</li>)}
      </ul>
      <p className="mt-3 text-sm leading-6 text-white/48">{t('unsure')}</p>
    </section>
  );
}
