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
    <div className="flex flex-wrap justify-center gap-2 mt-4 px-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.id}
            type="button"
            onClick={() => !disabled && onSelect(action.message)}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.02 } : undefined}
            whileTap={!disabled ? { scale: 0.98 } : undefined}
            className={`inline-flex items-center gap-2 px-4 py-2
              bg-white/5 hover:bg-white/10
              border border-white/10 hover:border-brand-orange/50
              rounded-full text-sm text-gray-300 hover:text-white
              transition-all duration-200
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            <span>{action.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default QuickActions;
