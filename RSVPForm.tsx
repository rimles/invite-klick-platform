import React from 'react';
import type { EventTheme } from '../../types';
import { IconCheck, IconHeart } from '../icons';
import { TextArea, Select } from './FormField';

type Answer = 'yes' | 'no' | 'maybe' | null;

export function RSVPForm({ theme, guestName }: { theme: EventTheme; guestName?: string }) {
  const [answer, setAnswer] = React.useState<Answer>(null);
  const [guestCount, setGuestCount] = React.useState(2);
  const [meal, setMeal] = React.useState('No preference');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <div className="text-center py-10 px-4">
        <div
          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
          style={{ background: `${theme.primary}15`, color: theme.primary }}
        >
          <IconCheck size={28} />
        </div>
        <p className="font-serif text-2xl" style={{ color: theme.text }}>Thank you{guestName ? `, ${guestName.split(' ')[0]}` : ''}!</p>
        <p className="text-sm mt-2 max-w-xs mx-auto opacity-70" style={{ color: theme.muted }}>
          {answer === 'yes' && 'Your response has been recorded. We can’t wait to celebrate with you.'}
          {answer === 'no' && 'Thank you for letting us know — you’ll be missed.'}
          {answer === 'maybe' && 'Thanks for the update — let us know as soon as you can confirm.'}
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs mt-6 underline opacity-60 hover:opacity-100"
          style={{ color: theme.text }}
        >
          Edit response
        </button>
      </div>
    );
  }

  const options: { id: Answer; label: string }[] = [
    { id: 'yes', label: "Yes, I'll be there" },
    { id: 'no', label: "No, I can't make it" },
    { id: 'maybe', label: 'Maybe' },
  ];

  return (
    <div className="px-1">
      <p className="text-center font-serif text-xl mb-5" style={{ color: theme.text }}>Will you be attending?</p>
      <div className="space-y-2.5">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setAnswer(opt.id)}
            className="w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-150 flex items-center justify-between"
            style={
              answer === opt.id
                ? { borderColor: theme.primary, background: `${theme.primary}10`, color: theme.text }
                : { borderColor: `${theme.muted}30`, color: theme.text }
            }
          >
            {opt.label}
            {answer === opt.id && <IconCheck size={16} style={{ color: theme.primary }} />}
          </button>
        ))}
      </div>

      {answer === 'yes' && (
        <div className="mt-5 space-y-4 animate-[fadeIn_200ms_ease-out]">
          <div>
            <p className="text-xs font-medium mb-1.5" style={{ color: theme.muted }}>Number of guests</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                className="w-8 h-8 rounded-full border flex items-center justify-center"
                style={{ borderColor: `${theme.muted}30`, color: theme.text }}
              >
                –
              </button>
              <span className="font-serif text-lg w-6 text-center" style={{ color: theme.text }}>{guestCount}</span>
              <button
                onClick={() => setGuestCount((c) => c + 1)}
                className="w-8 h-8 rounded-full border flex items-center justify-center"
                style={{ borderColor: `${theme.muted}30`, color: theme.text }}
              >
                +
              </button>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium mb-1.5" style={{ color: theme.muted }}>Meal preference</p>
            <Select value={meal} onChange={(e) => setMeal(e.target.value)} className="!rounded-xl">
              <option>No preference</option>
              <option>Jollof & Chicken</option>
              <option>Waakye</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
            </Select>
          </div>
        </div>
      )}

      <div className="mt-4">
        <p className="text-xs font-medium mb-1.5" style={{ color: theme.muted }}>Message to the hosts (optional)</p>
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Leave a note…"
        />
      </div>

      <button
        disabled={!answer}
        onClick={() => setSubmitted(true)}
        className="w-full mt-5 py-3 rounded-xl font-medium text-sm text-white transition-all duration-150 disabled:opacity-40 flex items-center justify-center gap-2"
        style={{ background: theme.primary }}
      >
        <IconHeart size={15} /> Submit RSVP
      </button>
    </div>
  );
}
