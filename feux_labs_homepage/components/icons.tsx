type IconProps = { size?: number; className?: string };

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function PhoneIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 2 5.2 2 2 0 0 1 4 4Z" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 20l1.3-3.9A8 8 0 1 1 8.7 19L4 20Z" />
      <path d="M8.5 8.6c0-.5.4-1 1-1h.6c.3 0 .6.2.7.5l.6 1.6c.1.3 0 .6-.1.8l-.6.7c.5 1 1.4 1.9 2.4 2.4l.7-.6c.2-.2.5-.2.8-.1l1.6.6c.3.1.5.4.5.7v.6c0 .6-.5 1-1 1-3.3 0-6.7-3.4-6.7-6.7Z" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M15 8.5h-2a1 1 0 0 0-1 1V12h3l-.4 3H12v6H9v-6H7v-3h2V9a4 4 0 0 1 4-4h2v3.5Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SunIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8" />
    </svg>
  );
}

export function ClockIcon({ size = 22, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function MoonIcon({ size = 18, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4 6.8 6.8 0 0 0 20 14.5Z" />
    </svg>
  );
}
