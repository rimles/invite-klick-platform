import React from 'react';
import { CreatorShell } from '../../components/creator/CreatorShell';
import { Button, IconButton } from '../../components/ui/Button';
import { PaletteCard } from '../../components/ui/PaletteCard';
import { TemplateCard } from '../../components/ui/TemplateCard';
import { PhonePreview } from '../../components/ui/PhonePreview';
import { CountdownTimer } from '../../components/ui/CountdownTimer';
import { ScheduleTimeline } from '../../components/ui/ScheduleTimeline';
import { MusicLibraryRow } from '../../components/ui/MusicPlayer';
import { ComingSoon } from '../../components/ui/EmptyState';
import { useEvent } from '../../lib/store';
import { useAppData } from '../../lib/store';
import { curatedThemes, themeToCssVars } from '../../theme/tokens';
import { templates, musicLibrary } from '../../data/mockData';
import { Link, useNavigate } from '../../lib/router';
import {
  IconUndo, IconRedo, IconEye, IconDesktop, IconPhone, IconTemplates,
  IconImage, IconMusic, IconLayers, IconSparkle, IconCheck,
  IconChevronLeft,
} from '../../components/icons';

const IconColors = IconImage;

type Tool = 'templates' | 'colors' | 'fonts' | 'sections' | 'music';

const tools: { id: Tool; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'templates', label: 'Templates', icon: IconTemplates },
  { id: 'colors', label: 'Colors', icon: IconColors },
  { id: 'fonts', label: 'Fonts', icon: IconSparkle },
  { id: 'sections', label: 'Sections', icon: IconLayers },
  { id: 'music', label: 'Music', icon: IconMusic },
];

const fontPairs = [
  { id: 'fraunces-manrope', display: 'Fraunces', body: 'Manrope' },
  { id: 'playfair-inter', display: 'Playfair-style Serif', body: 'Inter-style Sans' },
  { id: 'cormorant-work', display: 'Cormorant-style Serif', body: 'Work Sans-style' },
];

export function InvitationEditor({ id }: { id: string }) {
  const event = useEvent(id);
  const { updateInvitation } = useAppData();
  const navigate = useNavigate();
  const [tool, setTool] = React.useState<Tool>('templates');
  const [previewMode, setPreviewMode] = React.useState<'phone' | 'desktop'>('phone');
  const [saveState, setSaveState] = React.useState<'saved' | 'saving'>('saved');
  const [font, setFont] = React.useState(fontPairs[0].id);
  const saveTimeout = React.useRef<any>(null);

  if (!event) {
    return (
      <CreatorShell>
        <p className="text-[#6F6467]">Invitation not found.</p>
      </CreatorShell>
    );
  }

  const theme = event.theme;

  function triggerAutosave() {
    setSaveState('saving');
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => setSaveState('saved'), 700);
  }

  function selectTheme(themeId: string) {
    const next = curatedThemes.find((t) => t.id === themeId);
    if (next) {
      updateInvitation(event.id, { theme: next, coverGradient: [next.primary, next.accent] });
      triggerAutosave();
    }
  }

  function selectTemplate(templateId: string) {
    updateInvitation(event.id, { templateId });
    triggerAutosave();
  }

  return (
    <CreatorShell>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link to={`/dashboard/invitations/${event.id}`} className="w-9 h-9 rounded-full flex items-center justify-center border border-[#E9E1D8] text-[#241A1C] hover:bg-[#F4EFE9]">
            <IconChevronLeft size={16} />
          </Link>
          <div>
            <h1 className="font-serif text-xl text-[#241A1C]">{event.title} — Design Editor</h1>
            <p className="text-xs text-[#9A8F91] mt-0.5 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${saveState === 'saved' ? 'bg-[#2F6B3F]' : 'bg-[#C9A44C] animate-pulse'}`} />
              {saveState === 'saved' ? 'Saved' : 'Saving…'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <IconButton className="border border-[#E9E1D8]"><IconUndo size={16} /></IconButton>
          <IconButton className="border border-[#E9E1D8]"><IconRedo size={16} /></IconButton>
          <Link to={`/invite/${event.slug}`}>
            <Button variant="outline" size="sm" icon={<IconEye size={15} />}>Preview</Button>
          </Link>
          <Button size="sm" icon={<IconCheck size={15} />} onClick={() => navigate(`/dashboard/invitations/${event.id}`)}>Publish</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr_340px] gap-6">
        {/* Tool rail */}
        <div className="bg-white rounded-2xl border border-[#E9E1D8] p-3 h-fit lg:sticky lg:top-24">
          <div className="flex lg:flex-col gap-1 overflow-x-auto">
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${tool === t.id ? 'bg-[#482337] text-white' : 'text-[#6F6467] hover:bg-[#F4EFE9]'}`}
              >
                <t.icon size={16} />
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div className="order-first lg:order-none">
          <div className="flex items-center justify-center gap-2 mb-4">
            <button onClick={() => setPreviewMode('phone')} className={`w-9 h-9 rounded-lg flex items-center justify-center border ${previewMode === 'phone' ? 'bg-[#482337] text-white border-[#482337]' : 'border-[#E9E1D8] text-[#6F6467]'}`}>
              <IconPhone size={15} />
            </button>
            <button onClick={() => setPreviewMode('desktop')} className={`w-9 h-9 rounded-lg flex items-center justify-center border ${previewMode === 'desktop' ? 'bg-[#482337] text-white border-[#482337]' : 'border-[#E9E1D8] text-[#6F6467]'}`}>
              <IconDesktop size={15} />
            </button>
          </div>
          <PhonePreview mode={previewMode}>
            <div style={{ background: theme.background, ...themeToCssVars(theme) } as React.CSSProperties}>
              <div
                className="p-6 flex flex-col justify-end min-h-[280px] relative"
                style={{ background: `linear-gradient(160deg, ${theme.primary}, ${theme.primary}CC)` }}
              >
                <p className="text-white/60 text-[10px] tracking-[0.2em] uppercase">{event.occasion}</p>
                <p className="font-serif text-white text-2xl mt-2 leading-tight">{event.title}</p>
                <p className="text-white/70 text-xs mt-1">{event.subtitle}</p>
                <div className="mt-4">
                  <CountdownTimer date={`${event.date}T16:00:00`} />
                </div>
              </div>
              <div className="p-5" style={{ color: theme.text }}>
                <p className="italic font-serif text-center text-sm opacity-70 mb-5">"{event.quote}"</p>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: theme.primary }}>Schedule</p>
                <ScheduleTimeline items={event.schedule} accent={theme.primary} />
              </div>
            </div>
          </PhonePreview>
        </div>

        {/* Contextual panel */}
        <div className="bg-white rounded-2xl border border-[#E9E1D8] p-5 h-fit">
          {tool === 'templates' && (
            <div>
              <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-4">Templates</p>
              <div className="space-y-3 max-h-[560px] overflow-y-auto pr-1">
                {templates.map((t) => (
                  <TemplateCard key={t.id} template={t} eventTitle={event.title} selected={event.templateId === t.id} onUse={() => selectTemplate(t.id)} />
                ))}
              </div>
            </div>
          )}
          {tool === 'colors' && (
            <div>
              <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-4">Curated Palettes</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {curatedThemes.map((t) => (
                  <PaletteCard key={t.id} theme={t} selected={event.theme.id === t.id} onSelect={() => selectTheme(t.id)} />
                ))}
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F4EFE9]">
                <p className="text-xs text-[#6F6467]">Custom & From Photo</p>
                <ComingSoon />
              </div>
            </div>
          )}
          {tool === 'fonts' && (
            <div>
              <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-4">Typography</p>
              <div className="space-y-2.5">
                {fontPairs.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => { setFont(f.id); triggerAutosave(); }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-colors ${font === f.id ? 'border-[#482337] bg-[#FBF6F3]' : 'border-[#E9E1D8]'}`}
                  >
                    <p className="font-serif text-lg text-[#241A1C]">{f.display}</p>
                    <p className="text-xs text-[#9A8F91] mt-0.5">Paired with {f.body}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          {tool === 'sections' && (
            <div>
              <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-4">Sections</p>
              <div className="space-y-2">
                {['Hero & Countdown', 'RSVP', 'Event Details', 'Schedule', 'Gallery', 'Music', 'Seating', 'QR Pass'].map((s) => (
                  <div key={s} className="flex items-center justify-between p-3 rounded-xl bg-[#FBF8F5] text-sm text-[#241A1C]">
                    {s}
                    <span className="text-[#2F6B3F] text-xs font-medium">On</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tool === 'music' && (
            <div>
              <p className="text-xs font-semibold text-[#9A8F91] uppercase tracking-wide mb-4">Music Library</p>
              <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
                {musicLibrary.map((t) => (
                  <MusicLibraryRow
                    key={t.id}
                    track={t}
                    selected={event.musicTrackId === t.id}
                    onSelect={() => { updateInvitation(event.id, { musicTrackId: t.id }); triggerAutosave(); }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </CreatorShell>
  );
}
