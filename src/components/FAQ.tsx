// File: src/components/FAQ.tsx
import React, { useState } from 'react';

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

type FAQListProps = {
  items: FAQ[];
  /**
   * If true multiple items can be open at once. Default: true
   */
  allowMultipleOpen?: boolean;
};

export default function FAQList({ items, allowMultipleOpen = true }: FAQListProps) {
  // If multiple allowed, store a Set of open ids; otherwise a single open id string | null
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());
  const [openId, setOpenId] = useState<string | null>(null);

  function isOpen(id: string) {
    return allowMultipleOpen ? openSet.has(id) : openId === id;
  }

  function toggle(id: string) {
    if (allowMultipleOpen) {
      setOpenSet(prev => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    } else {
      setOpenId(prev => (prev === id ? null : id));
    }
  }

  return (
    <section aria-label="FAQ" className="space-y-2">
      {items.map(item => (
        <div key={item.id} className="border border-red-900 rounded-xl p-4 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-300 transition">
          <button
            type="button"
            onClick={() => toggle(item.id)}
            aria-expanded={isOpen(item.id)}
            aria-controls={`faq-${item.id}`}
            className="w-full text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <span className="font-semibold text-gray-800">{item.question}</span>
            <span className="ml-4 text-xl font-bold text-red-600" aria-hidden>
              {isOpen(item.id) ? '−' : '+'}
            </span>
          </button>

          <div
            id={`faq-${item.id}`}
            role="region"
            hidden={!isOpen(item.id)}
            className="mt-3 text-sm text-gray-600 leading-relaxed"
          >
            {item.answer}
          </div>
        </div>
      ))}
    </section>
  );
}


