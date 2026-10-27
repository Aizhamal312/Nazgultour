import React, { useEffect, useRef, useState } from 'react';
import { Mountain } from 'lucide-react';
import { useI18n } from '../i18n';
import { NavLink } from '../router';

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function TundukEmblem({
  className,
  ring = true,
}: {
  className?: string;
  ring?: boolean;
}) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      {ring && (
        <circle
          cx="32"
          cy="32"
          r="30"
          stroke="currentColor"
          strokeWidth="3"
          opacity="0.95"
        />
      )}
      <g stroke="currentColor" strokeWidth="3.4" strokeLinecap="round">
        <circle cx="32" cy="32" r="19" opacity="0.9" />
        <path d="M17 26.5 Q32 50 47 26.5" />
        <path d="M17 26.5 Q32 50 47 26.5" transform="rotate(60 32 32)" />
        <path d="M17 26.5 Q32 50 47 26.5" transform="rotate(-60 32 32)" />
      </g>
      <circle cx="32" cy="32" r="3.2" fill="currentColor" />
    </svg>
  );
}

export function DiamondDivider({ className }: { className?: string }) {
  const diamondPath = 'M0 8 L7 1.5 L14 8 L7 14.5 Z';
  return (
    <svg
      viewBox="0 0 196 16"
      className={cn('h-4 w-48', className)}
      fill="none"
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={diamondPath}
          transform={`translate(${16 + i * 28} 0)`}
          stroke="currentColor"
          strokeWidth="1.4"
        />
      ))}
      <line
        x1="0"
        y1="8"
        x2="10"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <line
        x1="186"
        y1="8"
        x2="196"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Eyebrow({
  children,
  light = false,
  center = false,
}: {
  children: React.ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[0.7rem] font-extrabold uppercase tracking-[0.32em]',
        light ? 'text-gold-300' : 'text-bronze-600',
        center && 'justify-center',
      )}
    >
      <span
        className={cn('h-px w-8', light ? 'bg-gold-300/70' : 'bg-bronze-600/60')}
        aria-hidden="true"
      />
      {children}
      {center && (
        <span
          className={cn('h-px w-8', light ? 'bg-gold-300/70' : 'bg-bronze-600/60')}
          aria-hidden="true"
        />
      )}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  italic,
  intro,
  light = false,
  center = false,
  className,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  intro?: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      <Eyebrow light={light} center={center}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={cn(
          'mt-4 font-display text-4xl leading-[1.06] font-medium tracking-tight text-balance sm:text-5xl',
          light ? 'text-cream-50' : 'text-forest-950',
        )}
      >
        {title}{' '}
        {italic && (
          <em className={cn('font-light italic', light ? 'text-gold-300' : 'text-bronze-600')}>
            {italic}
          </em>
        )}
      </h2>
      {intro && (
        <p
          className={cn(
            'mt-5 max-w-2xl text-[1.02rem] leading-relaxed',
            light ? 'text-cream-100/75' : 'text-ink-500',
            center && 'mx-auto',
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

const BUTTON_VARIANTS = {
  gold: 'bg-gold-400 text-forest-950 hover:bg-gold-300 shadow-lg shadow-gold-500/25 hover:shadow-gold-400/40',
  forest: 'bg-forest-800 text-cream-50 hover:bg-forest-700 shadow-lg shadow-forest-900/20',
  whats: 'bg-whats-600 text-white hover:bg-whats-500 shadow-lg shadow-whats-700/30',
  outlineLight:
    'border-[1.5px] border-cream-50/45 text-cream-50 hover:border-cream-50 hover:bg-cream-50/10 backdrop-blur-[2px]',
  outlineDark:
    'border-[1.5px] border-forest-700/45 text-forest-800 hover:bg-forest-800 hover:text-cream-50',
} as const;

const BUTTON_SIZES = {
  sm: 'px-4 py-2 text-[0.8rem]',
  md: 'px-6 py-3 text-[0.88rem]',
  lg: 'px-7 py-3.5 text-[0.92rem]',
} as const;

export interface ButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZES;
}

export function ButtonLink({
  variant = 'forest',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 active:translate-y-0',
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

export function AmenityPill({
  children,
  dashed = false,
  light = false,
  className,
}: {
  children: React.ReactNode;
  dashed?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-semibold tracking-wide',
        dashed
          ? light
            ? 'border border-dashed border-cream-50/50 text-cream-100/80'
            : 'border border-dashed border-bronze-600/60 text-bronze-700'
          : light
            ? 'bg-cream-50/12 text-cream-100'
            : 'bg-cream-200/70 text-bark-700',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PlaceholderBadge({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-dashed px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.14em]',
        light ? 'border-gold-300/50 text-gold-300' : 'border-bronze-600/50 text-bronze-600',
      )}
    >
      <span
        className={cn('h-1.5 w-1.5 rounded-full', light ? 'bg-gold-300' : 'bg-bronze-600')}
      />
      {children}
    </span>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('reveal', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function ResilientImage({
  src,
  alt,
  className,
  loading,
  fetchPriority,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-forest-900 via-forest-800 to-bark-700 p-6 text-center text-cream-100',
          className,
        )}
        role="img"
        aria-label={alt || 'Kyzart Guesthouse mountain scenery'}
      >
        <Mountain className="h-8 w-8 text-gold-300/80" aria-hidden="true" />
        {alt && <span className="max-w-xs text-xs font-medium text-cream-100/80">{alt}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    const setMeta = (selector: string, content: string) => {
      const node = document.querySelector(selector);
      if (node) node.setAttribute('content', content);
    };
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }, [title, description]);
}

export function PageHero({
  image,
  alt,
  eyebrow,
  title,
  italic,
  intro,
  crumb,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  italic?: string;
  intro: string;
  crumb: string;
}) {
  const { t } = useI18n();
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div className="absolute inset-0" aria-hidden="true">
        <ResilientImage
          src={image}
          alt={alt}
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/88 via-forest-950/58 to-forest-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_40%,transparent_20%,rgba(18,34,26,0.45)_100%)]" />
      </div>

      <div className="wrap relative">
        <nav
          aria-label={t.breadcrumb.aria}
          className="flex flex-wrap items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-cream-100/60"
        >
          <NavLink
            to="home"
            className="transition-colors hover:text-gold-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400"
          >
            {t.breadcrumb.home}
          </NavLink>
          <span aria-hidden="true" className="text-cream-100/30">
            /
          </span>
          <span className="text-gold-300" aria-current="page">
            {crumb}
          </span>
        </nav>

        <div className="mt-7">
          <Eyebrow light>{eyebrow}</Eyebrow>
        </div>

        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.5rem,6vw,4.6rem)] leading-[1.03] font-medium tracking-tight text-cream-50 text-balance">
          {title}{' '}
          {italic && <em className="font-light text-gold-300 italic">{italic}</em>}
        </h1>

        <p className="mt-6 max-w-2xl text-[1rem] leading-relaxed text-cream-100/80 sm:text-[1.08rem]">
          {intro}
        </p>

        <div className="mt-9 flex items-center gap-3 text-gold-300/80" aria-hidden="true">
          <TundukEmblem className="h-6 w-6" ring={false} />
          <span className="h-px w-28 bg-gradient-to-r from-gold-400/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
