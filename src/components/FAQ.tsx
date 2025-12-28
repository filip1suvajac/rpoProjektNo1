// File: src/components/FAQ.tsx
import { useState } from 'react';

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
    <section aria-label="FAQ" className="space-y-2 max-w-[80%] mx-auto">
      {items.map(item => (
        <div key={item.id} className="rounded-xl p-4 bg-[#213743] transition">
          <button
            type="button"
            onClick={() => toggle(item.id)}
            aria-expanded={isOpen(item.id)}
            aria-controls={`faq-${item.id}`}
            className="w-full text-left flex items-center justify-between focus:outline-none "
          >
            <span className="font-semibold text-stone-50">{item.question}</span>
            <span className="ml-4 text-xl font-bold text-stone-50" aria-hidden>
              {isOpen(item.id) ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
              }
              
            </span>
          </button>

          <div
            id={`faq-${item.id}`}
            role="region"
            hidden={!isOpen(item.id)}
            className="mt-3 text-sm text-stone-300 leading-relaxed"
          >
            {item.answer}
          </div>
        </div>
      ))}
    </section>
  );
}


