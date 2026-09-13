import React from 'react';

// ============================================================================
// Minimal inline line-icon set — keeps the app dependency-free.
// All icons are 20x20 viewBox, stroke-based, inherit currentColor.
// ============================================================================

type IconProps = { size?: number; className?: string; strokeWidth?: number };
const base = (strokeWidth = 1.6) => ({
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

function wrap(path: React.ReactNode) {
  return function Icon({ size = 20, className, strokeWidth = 1.6 }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
        {path}
      </svg>
    );
  };
}

export const IconGrid = wrap(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);
export const IconMail = wrap(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 6.5l9 6 9-6" /></>);
export const IconUsers = wrap(<><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" /><path d="M16 8.2a3 3 0 110 5.9" /><path d="M15 13.6c2.6.5 4.5 2.6 4.5 5.4" /></>);
export const IconTemplates = wrap(<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>);
export const IconImage = wrap(<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.8" /><path d="M21 17l-5.5-5.5a2 2 0 00-2.8 0L4 20" /></>);
export const IconMusic = wrap(<><path d="M9 18V5l11-2v13" /><circle cx="6.5" cy="18" r="2.5" /><circle cx="17.5" cy="16" r="2.5" /></>);
export const IconQR = wrap(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM19 14h2M14 19h2M17 21h4v-4" /></>);
export const IconSeat = wrap(<><path d="M6 4v10a2 2 0 002 2h8a2 2 0 002-2V4" /><path d="M6 20v-2M18 20v-2" /><path d="M4 10h16" /></>);
export const IconChart = wrap(<><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>);
export const IconSettings = wrap(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 11-4 0v-.2a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 110-4h.2a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 114 0v.2a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.3 1.9V9c.2.6.7 1 1.5 1H21a2 2 0 110 4h-.2a1.7 1.7 0 00-1.4 1z" /></>);
export const IconPlus = wrap(<path d="M12 5v14M5 12h14" />);
export const IconBell = wrap(<><path d="M6 8a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6" /><path d="M9.5 19a2.5 2.5 0 005 0" /></>);
export const IconChevronRight = wrap(<path d="M9 6l6 6-6 6" />);
export const IconChevronLeft = wrap(<path d="M15 6l-6 6 6 6" />);
export const IconChevronDown = wrap(<path d="M6 9l6 6 6-6" />);
export const IconCheck = wrap(<path d="M5 13l4 4L19 7" />);
export const IconX = wrap(<path d="M6 6l12 12M18 6L6 18" />);
export const IconCalendar = wrap(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>);
export const IconMapPin = wrap(<><path d="M12 21s7-6.3 7-11.5A7 7 0 105 9.5C5 14.7 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.3" /></>);
export const IconClock = wrap(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></>);
export const IconHeart = wrap(<path d="M12 20s-7.5-4.6-10-9.3C.5 7.2 2.4 4 6 4c2.1 0 3.6 1.1 4.5 2.4C11.4 5.1 12.9 4 15 4c3.6 0 5.5 3.2 4 6.7C19.5 15.4 12 20 12 20z" />);
export const IconGallery = wrap(<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.8" /><path d="M21 15l-5-5-9 9" /></>);
export const IconPlay = wrap(<path d="M8 5.5v13l11-6.5-11-6.5z" />);
export const IconPause = wrap(<><rect x="7" y="5" width="3.5" height="14" rx="1" /><rect x="13.5" y="5" width="3.5" height="14" rx="1" /></>);
export const IconHome = wrap(<><path d="M4 11l8-7 8 7" /><path d="M6 10v9a1 1 0 001 1h4v-6h2v6h4a1 1 0 001-1v-9" /></>);
export const IconUser = wrap(<><circle cx="12" cy="8" r="3.5" /><path d="M4.5 20a7.5 7.5 0 0115 0" /></>);
export const IconMessage = wrap(<path d="M21 12a8 8 0 01-11.8 7L4 20l1.2-4.4A8 8 0 1121 12z" />);
export const IconSearch = wrap(<><circle cx="10.5" cy="10.5" r="6.5" /><path d="M20 20l-4.3-4.3" /></>);
export const IconUpload = wrap(<><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 16v3a2 2 0 002 2h12a2 2 0 002-2v-3" /></>);
export const IconEdit = wrap(<><path d="M4 20h4L18.5 9.5a2.1 2.1 0 000-3L18 6a2.1 2.1 0 00-3 0L4.5 16.5V20z" /><path d="M13.5 7.5l3 3" /></>);
export const IconTrash = wrap(<><path d="M4 7h16" /><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2" /><path d="M6 7l1 12a1 1 0 001 1h8a1 1 0 001-1l1-12" /></>);
export const IconMore = wrap(<><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></>);
export const IconArrowRight = wrap(<path d="M4 12h16M14 6l6 6-6 6" />);
export const IconUndo = wrap(<path d="M9 7L4 12l5 5M4 12h11a5 5 0 010 10h-1" />);
export const IconRedo = wrap(<path d="M15 7l5 5-5 5M20 12H9a5 5 0 000 10h1" />);
export const IconEye = wrap(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>);
export const IconPhone = wrap(<><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></>);
export const IconDesktop = wrap(<><rect x="2.5" y="4" width="19" height="13" rx="1.5" /><path d="M8 21h8M12 17v4" /></>);
export const IconSparkle = wrap(<><path d="M12 3l1.6 4.9L18 9.5l-4.4 1.6L12 16l-1.6-4.9L6 9.5l4.4-1.6z" /><path d="M19 14l.7 2.1L22 17l-2.3.9L19 20l-.7-2.1L16 17l2.3-.9z" /></>);
export const IconClipboard = wrap(<><rect x="6" y="4" width="12" height="17" rx="2" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M9 12h6M9 16h6" /></>);
export const IconLayers = wrap(<><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5" /></>);
export const IconLogout = wrap(<><path d="M9 20H6a2 2 0 01-2-2V6a2 2 0 012-2h3" /><path d="M16 17l5-5-5-5M21 12H9" /></>);
export const IconTicket = wrap(<><path d="M3 8a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 000 4v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 000-4z" /><path d="M9 6v12" strokeDasharray="2 3" /></>);
export const IconDownload = wrap(<><path d="M12 4v12M8 12l4 4 4-4" /><path d="M4 20h16" /></>);
export const IconInfo = wrap(<><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.01" /></>);
