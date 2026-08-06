'use client';

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Bot, Headphones, Loader2, Send, Sparkles, User, Users, X } from 'lucide-react';
import { useChatContext } from './ChatContext';
import { QuickActions } from './QuickActions';
import { EscalationModal } from './EscalationModal';

export function ChatPanel() {
  const t = useTranslations('chat');
  const common = useTranslations('common');
  const navigation = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const {
    messages,
    isOpen,
    isTyping,
    error,
    isConnecting,
    showEscalationModal,
    isSubmittingEscalation,
    closePanel,
    sendMessage,
    setShowEscalationModal,
    submitEscalation,
  } = useChatContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focus = window.setTimeout(() => inputRef.current?.focus(), 320);
    const escape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape' && !showEscalationModal) closePanel();
    };
    document.addEventListener('keydown', escape);
    return () => {
      window.clearTimeout(focus);
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', escape);
    };
  }, [closePanel, isOpen, showEscalationModal]);

  const handleSend = useCallback(() => {
    const value = inputValue.trim();
    if (!value || isConnecting || isTyping) return;
    void sendMessage(value);
    setInputValue('');
  }, [inputValue, isConnecting, isTyping, sendMessage]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  const routeLabel = (action: string) => {
    if (action === 'book-demo') return common('bookDemo');
    if (action === 'quotation') return common('getQuote');
    if (action === 'licensing') return navigation('licensing');
    if (action === 'soundtrack-trial') return t('trialAction');
    if (action === 'soundtrack-your-brand') return navigation('soundtrack');
    if (action === 'beat-breeze') return navigation('beatBreeze');
    return action;
  };

  const pageRoute = pathname.split('/').filter(Boolean)[1] || '';
  const pageName = pageRoute === 'beat-breeze' ? navigation('beatBreeze')
    : pageRoute === 'soundtrack-your-brand' ? navigation('soundtrack')
      : pageRoute === 'how-it-works' ? navigation('howItWorks')
        : pageRoute === 'quotation' ? common('getQuote')
          : pageRoute === 'book-demo' ? common('bookDemo')
            : pageRoute === 'licensing' ? navigation('licensing')
              : pageRoute === 'soundtrack-trial' ? t('trialAction')
                : pageRoute === 'solutions' ? navigation('solutions')
                  : t('homeContext');
  const canSend = inputValue.trim().length > 0 && !isConnecting && !isTyping;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label={t('close')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm"
              onClick={closePanel}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-full max-w-[30rem] flex-col overflow-hidden border-l border-white/10 bg-[#06121b]/[0.985] shadow-[-35px_0_110px_rgba(0,0,0,.48)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="assistant-title"
            >
              <div className="relative overflow-hidden border-b border-white/[0.09] px-5 pb-5 pt-5 sm:px-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_0,rgba(239,166,52,.17),transparent_39%),radial-gradient(circle_at_90%_20%,rgba(73,213,197,.10),transparent_34%)]" aria-hidden="true" />
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative grid h-12 w-12 place-items-center rounded-2xl border border-[#efa634]/25 bg-[#efa634]/10 text-[#f2b54d]">
                      <Headphones className="h-5 w-5" aria-hidden="true" />
                      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#07141d] bg-[#49d5c5]" />
                    </div>
                    <div>
                      <p className="font-label text-[.61rem] font-semibold uppercase tracking-[.17em] text-[#49d5c5]">{t('guideLabel')}</p>
                      <h2 id="assistant-title" className="mt-1 font-headline text-lg font-medium tracking-[-0.025em] text-white">{t('assistantName')}</h2>
                    </div>
                  </div>
                  <button type="button" onClick={closePanel} className="rounded-full border border-white/10 p-2.5 text-white/45 transition hover:border-white/25 hover:bg-white/5 hover:text-white" aria-label={t('close')}><X className="h-4 w-4" /></button>
                </div>
                <div className="relative mt-4 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-3 font-label text-[.63rem] uppercase tracking-[.12em]">
                  <span className="flex min-w-0 items-center gap-2 text-white/35"><Sparkles className="h-3.5 w-3.5 shrink-0 text-[#efa634]" /><span className="truncate capitalize">{pageName}</span></span>
                  <span className="shrink-0 text-[#7bded2]/70">{t('status.connected')}</span>
                </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="border-b border-red-400/15 bg-red-400/[0.07] px-5 py-3 text-sm text-red-200" role="alert">
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5" role="log" aria-live="polite" aria-label={t('messagesLabel')}>
                {messages.length === 0 && !isTyping && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="rounded-[1.35rem] border border-white/[0.09] bg-[linear-gradient(145deg,rgba(239,166,52,.08),rgba(73,213,197,.035))] p-5">
                      <div className="flex items-start gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.055] text-[#49d5c5]"><Bot className="h-4 w-4" /></span>
                        <div>
                          <h3 className="font-headline text-xl font-medium tracking-[-0.03em] text-white">{t('welcomeTitle')}</h3>
                          <p className="mt-2 text-sm leading-6 text-white/52">{t('welcomePrompt')}</p>
                        </div>
                      </div>
                      <QuickActions onSelect={(message) => void sendMessage(message)} disabled={false} />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link href={`/${locale}/book-demo?source=assistant`} onClick={closePanel} className="group flex min-h-[4.5rem] items-center justify-between rounded-2xl border border-[#efa634]/20 bg-[#efa634]/[0.055] px-4 text-sm font-semibold text-white/72 transition hover:border-[#efa634]/45 hover:text-white">
                        {common('bookDemo')} <ArrowUpRight className="h-4 w-4 text-[#efa634] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                      <Link href={`/${locale}/quotation?source=assistant`} onClick={closePanel} className="group flex min-h-[4.5rem] items-center justify-between rounded-2xl border border-[#49d5c5]/20 bg-[#49d5c5]/[0.045] px-4 text-sm font-semibold text-white/72 transition hover:border-[#49d5c5]/45 hover:text-white">
                        {common('getQuote')} <ArrowUpRight className="h-4 w-4 text-[#49d5c5] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}

                {messages.map((message) => (
                  <motion.div key={message.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-2.5 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${message.role === 'user' ? 'bg-[#efa634]/12 text-[#efa634]' : 'bg-[#49d5c5]/10 text-[#49d5c5]'}`}>
                      {message.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </span>
                    <div className="max-w-[83%]">
                      <div className={`rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'rounded-tr-sm border border-[#efa634]/14 bg-[#efa634]/10 text-white/82' : 'rounded-tl-sm border border-white/[0.08] bg-white/[0.045] text-white/72'}`}>
                        {message.text}
                      </div>
                      {message.role === 'agent' && message.actions?.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.actions.slice(0, 2).map((action) => (
                            <Link key={action} href={`/${locale}/${action}`} onClick={closePanel} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 font-label text-[.68rem] font-semibold text-white/52 transition hover:border-[#49d5c5]/35 hover:text-white">
                              {routeLabel(action)} <ArrowUpRight className="h-3 w-3" />
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#49d5c5]/10 text-[#49d5c5]"><Bot className="h-3.5 w-3.5" /></span>
                    <div className="flex gap-1 rounded-2xl rounded-tl-sm border border-white/[0.08] bg-white/[0.045] px-4 py-4">
                      {[0, 1, 2].map((value) => <span key={value} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/45" style={{ animationDelay: `${value * 130}ms` }} />)}
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="border-t border-white/[0.09] bg-[#07151f] p-4 sm:p-5">
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-2 pl-4 transition focus-within:border-[#49d5c5]/35 focus-within:bg-white/[0.05]">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    maxLength={1200}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t('placeholder')}
                    disabled={isConnecting}
                    className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/28"
                    aria-label={t('placeholder')}
                  />
                  <motion.button type="button" onClick={handleSend} disabled={!canSend} whileTap={canSend ? { scale: .94 } : undefined} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#efa634,#e7c762)] text-[#07131c] transition disabled:cursor-not-allowed disabled:opacity-25" aria-label={t('send')}>
                    {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </motion.button>
                </div>
                <button type="button" onClick={() => setShowEscalationModal(true)} className="mx-auto mt-3 flex items-center gap-2 font-label text-[.68rem] text-white/35 transition hover:text-white"><Users className="h-3.5 w-3.5" /> {t('humanFollowup')}</button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <EscalationModal isOpen={showEscalationModal} onClose={() => setShowEscalationModal(false)} onSubmit={submitEscalation} isSubmitting={isSubmittingEscalation} />
    </>
  );
}

export default ChatPanel;
