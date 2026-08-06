'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Layers, FileText, Wrench } from 'lucide-react';

interface QuickActionsProps {
  onSelect: (message: string) => void;
  disabled?: boolean;
}

/**
 * QuickActions Component
 *
 * Quick action suggestion buttons for common user intents.
 * Clicking a button sends a pre-defined message to the agent.
 */
export function QuickActions({ onSelect, disabled = false }: QuickActionsProps) {
  const t = useTranslations('chat');

  const actions = [
    {
      id: 'compare',
      label: t('quickActions.compare'),
      message: t('quickActionMessages.compare'),
      icon: Layers,
    },
    {
      id: 'licensing',
      label: t('quickActions.licensing'),
      message: t('quickActionMessages.licensing'),
      icon: FileText,
    },
    {
      id: 'technical',
      label: t('quickActions.technical'),
      message: t('quickActionMessages.technical'),
      icon: Wrench,
    },
  ];

  return (
    <div className="mt-5 grid gap-2">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.id}
            type="button"
            onClick={() => !disabled && onSelect(action.message)}
            disabled={disabled}
            whileTap={!disabled ? { scale: 0.99 } : undefined}
            className={`flex min-h-11 w-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.025] px-3.5 text-left text-sm text-white/55 transition hover:border-[#efa634]/30 hover:bg-white/[0.045] hover:text-white
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/[0.04] text-[#efa634]"><Icon className="h-3.5 w-3.5" aria-hidden="true" /></span>
            <span>{action.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default QuickActions;
