import React, { useEffect, useState } from 'react';
import { MapPin, Menu, Phone, X } from 'lucide-react';
import { LANGUAGES, pickLang, useI18n } from '../i18n';
import { NavLink, RouteKey, useRouter } from '../router';
import {
  buildWhatsAppUrl,
  CONTACT_CONFIG,
  MAP_CONFIG,
  SITE_INFO,
  WHATSAPP_TEMPLATES,
} from '../data/siteData';
import {
  ButtonLink,
  cn,
  DiamondDivider,
  TundukEmblem,
  WhatsAppIcon,
} from './Primitives';

const PRIMARY_NAV: Array<{ to: RouteKey; key: 'home' | 'stay' | 'tours' | 'visit' }> = [
  { to: 'home', key: 'home' },
  { to: 'stay', key: 'stay' },
  { to: 'tours', key: 'tours' },
  { to: 'visit', key: 'visit' },
];

const SECONDARY_MOBILE_NAV: Array<{
  to: RouteKey;
  focus: string;
  key: 'about' | 'experiences' | 'gallery' | 'location';
}> = [
  { to: 'home', focus: 'about', key: 'about' },
  { to: 'tours', focus: 'experiences', key: 'experiences' },
  { to: 'stay', focus: 'gallery', key: 'gallery' },
  { to: 'visit', focus: 'location', key: 'location' },
];

const FOOTER_NAV: Array<{
  to: RouteKey;
  focus?: string;
  key:
    | 'home'
    | 'about'
    | 'stay'
    | 'tours'
    | 'experiences'
    | 'gallery'
    | 'location'
    | 'contact';
}> = [
  { to: 'home', key: 'home' },
  { to: 'home', focus: 'about', key: 'about' },
  { to: 'stay', key: 'stay' },
  { to: 'tours', key: 'tours' },
  { to: 'tours', focus: 'experiences', key: 'experiences' },
  { to: 'stay', focus: 'gallery', key: 'gallery' },
  { to: 'visit', focus: 'location', key: 'location' },
  { to: 'visit', focus: 'contact', key: 'contact' },
];

export function LanguageSwitcher({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn(
        'inline-flex items-center rounded-full border p-0.5',
        light ? 'border-cream-50/35' : 'border-forest-800/25',
      )}
    >
      {LANGUAGES.map((code) => {
        const label = code === 'ky' ? 'Кыргызча' : code === 'en' ? 'English' : 'Русский';
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            aria-label={label}
            title={label}
            className={cn(
              'cursor-pointer rounded-full font-extrabold uppercase tracking-widest transition-all duration-300 whitespace-nowrap shrink-0',
              compact ? 'px-2.5 py-1 text-[0.62rem]' : 'px-3 py-1.5 text-[0.68rem]',
              active
                ? 'bg-gold-400 text-forest-950 shadow-sm'
                : light
                  ? 'text-cream-100/80 hover:text-cream-50'
                  : 'text-forest-800/70 hover:text-forest-900',
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}

export function Header() {
  const { t, lang } = useI18n();
  const { route, navigate } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkScroll = () => setScrolled(window.scrollY > 48);
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [route]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [route]);

  const solidHeader = scrolled || menuOpen;
  const bookHref = '#/visit?focus=contact';

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
      e.preventDefault();
      setMenuOpen(false);
      navigate('visit', 'contact');
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          solidHeader
            ? 'bg-cream-50/92 shadow-[0_1px_0_0_rgba(67,51,31,0.08),0_10px_40px_-18px_rgba(18,34,26,0.35)] backdrop-blur-xl'
            : 'bg-transparent',
        )}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
          <NavLink
            to="home"
            className="group flex items-center gap-3 shrink-0"
            aria-label={`${SITE_INFO.name} — ${t.nav.home}`}
          >
            <TundukEmblem
              className={cn(
                'h-10 w-10 transition-colors duration-500 group-hover:text-gold-400',
                solidHeader ? 'text-forest-800' : 'text-gold-300',
              )}
            />
            <span className="leading-tight">
              <span
                className={cn(
                  'block font-display text-[1.05rem] font-semibold tracking-tight transition-colors duration-500 whitespace-nowrap',
                  solidHeader ? 'text-forest-950' : 'text-cream-50',
                )}
              >
                {SITE_INFO.name}
              </span>
              <span
                className={cn(
                  'block max-w-[11rem] truncate text-[0.55rem] font-bold uppercase tracking-[0.22em] transition-colors duration-500 sm:max-w-none sm:text-[0.6rem] sm:tracking-[0.28em]',
                  solidHeader ? 'text-bronze-600' : 'text-gold-300/90',
                )}
              >
                {pickLang(SITE_INFO.village, lang)} ·{' '}
                {lang === 'en' ? 'Kyrgyzstan' : 'Кыргызстан'}
              </span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {PRIMARY_NAV.map((item) => {
              const active = route === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-[0.8rem] font-bold tracking-wide transition-colors duration-300 whitespace-nowrap shrink-0 xl:px-4',
                    solidHeader
                      ? active
                        ? 'text-forest-950'
                        : 'text-ink-500 hover:text-forest-950'
                      : active
                        ? 'text-cream-50'
                        : 'text-cream-100/75 hover:text-cream-50',
                  )}
                >
                  {t.nav[item.key]}
                  <span
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-[2px] origin-left rounded-full bg-gold-400 transition-transform duration-300',
                      active ? 'scale-x-100' : 'scale-x-0',
                    )}
                    aria-hidden="true"
                  />
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="hidden sm:block">
              <LanguageSwitcher compact light={!solidHeader} />
            </div>
            <ButtonLink
              href={bookHref}
              onClick={handleBookClick}
              variant={solidHeader ? 'forest' : 'gold'}
              size="sm"
              className="hidden whitespace-nowrap md:inline-flex"
            >
              {t.nav.book}
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
              className={cn(
                'inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border transition-colors lg:hidden',
                solidHeader
                  ? 'border-forest-800/25 text-forest-900'
                  : 'border-cream-50/40 text-cream-50',
              )}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-forest-950/98 pattern-tunduk backdrop-blur-sm transition-all duration-500 lg:hidden',
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none',
        )}
        aria-hidden={!menuOpen}
      >
        <div className="wrap flex h-full flex-col overflow-y-auto pt-24 pb-10">
          <nav aria-label="Mobile primary" className="flex flex-col">
            {PRIMARY_NAV.map((item, idx) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                aria-current={route === item.to ? 'page' : undefined}
                className={cn(
                  'group flex items-baseline gap-4 border-b border-cream-50/8 py-4 transition-all duration-500',
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )}
                style={{ transitionDelay: menuOpen ? `${90 + idx * 55}ms` : '0ms' }}
              >
                <span className="font-display text-[0.75rem] text-gold-400/80">0{idx + 1}</span>
                <span
                  className={cn(
                    'font-display text-3xl font-medium transition-colors group-hover:text-gold-300',
                    route === item.to ? 'text-gold-300' : 'text-cream-50',
                  )}
                >
                  {t.nav[item.key]}
                </span>
              </NavLink>
            ))}
          </nav>

          <div
            className={cn(
              'mt-7 transition-all duration-500',
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
            style={{ transitionDelay: menuOpen ? '360ms' : '0ms' }}
          >
            <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.26em] text-gold-300/80">
              {t.foot.explore}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
              {SECONDARY_MOBILE_NAV.map((item) => (
                <NavLink
                  key={item.focus}
                  to={item.to}
                  focus={item.focus}
                  onClick={() => setMenuOpen(false)}
                  className="py-1.5 text-[0.92rem] font-semibold text-cream-100/70 transition-colors hover:text-gold-300"
                >
                  {t.nav[item.key]}
                </NavLink>
              ))}
            </div>
          </div>

          <div
            className={cn(
              'mt-8 flex flex-wrap items-center gap-4 transition-all duration-500',
              menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
            style={{ transitionDelay: menuOpen ? '480ms' : '0ms' }}
          >
            <ButtonLink href={bookHref} variant="gold" onClick={handleBookClick}>
              {t.nav.book}
            </ButtonLink>
            <LanguageSwitcher light />
          </div>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  const { t, lang, setLang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="pattern-tunduk relative overflow-hidden bg-forest-950 py-16 text-cream-100 sm:py-20">
      <div className="wrap">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <NavLink to="home" className="flex items-center gap-3">
              <TundukEmblem className="h-11 w-11 text-gold-400" />
              <span className="leading-tight">
                <span className="block font-display text-xl font-semibold text-cream-50">
                  {SITE_INFO.name}
                </span>
                <span className="block text-[0.6rem] font-bold uppercase tracking-[0.28em] text-gold-300/85">
                  {pickLang(SITE_INFO.village, lang)} ·{' '}
                  {lang === 'en' ? 'Kyrgyzstan' : 'Кыргызстан'}
                </span>
              </span>
            </NavLink>
            <p className="mt-5 max-w-xs text-[0.9rem] leading-relaxed text-cream-100/65">
              {t.foot.tagline}
            </p>
            <DiamondDivider className="mt-6 text-gold-400/50" />
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <h3 className="text-[0.7rem] font-extrabold uppercase tracking-[0.28em] text-gold-300">
              {t.foot.explore}
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-1">
              {FOOTER_NAV.map((item) => (
                <li key={`${item.to}-${item.focus ?? 'top'}`}>
                  <NavLink
                    to={item.to}
                    focus={item.focus}
                    className="text-[0.92rem] font-semibold text-cream-100/75 transition-colors hover:text-gold-300"
                  >
                    {t.nav[item.key]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-[0.7rem] font-extrabold uppercase tracking-[0.28em] text-gold-300">
              {t.foot.contactTitle}
            </h3>
            <ul className="mt-5 space-y-4 text-[0.9rem]">
              <li>
                <a
                  href={buildWhatsAppUrl(WHATSAPP_TEMPLATES.stay(lang))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 transition-colors hover:text-gold-300"
                >
                  <WhatsAppIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-whats-400" />
                  <span>
                    <span className="block font-bold text-cream-50 tabular-nums transition-colors group-hover:text-gold-300">
                      {CONTACT_CONFIG.whatsappDisplay}
                    </span>
                    <span className="text-cream-100/55">{SITE_INFO.name} · WhatsApp Business</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_CONFIG.phoneHref}
                  className="flex items-start gap-3 text-cream-100/75 tabular-nums transition-colors hover:text-gold-300"
                >
                  <Phone
                    className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cream-100/50"
                    aria-hidden="true"
                  />
                  <span>{CONTACT_CONFIG.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={MAP_CONFIG.openUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-cream-100/75 transition-colors hover:text-gold-300"
                >
                  <MapPin
                    className="mt-0.5 h-4.5 w-4.5 shrink-0 text-cream-100/50"
                    aria-hidden="true"
                  />
                  <span>{pickLang(SITE_INFO.address, lang)}</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[0.7rem] font-extrabold uppercase tracking-[0.28em] text-gold-300">
              {t.foot.language}
            </h3>
            <div className="mt-5 flex flex-row flex-wrap gap-2 lg:flex-col">
              {LANGUAGES.map((code) => {
                const active = lang === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLang(code)}
                    aria-pressed={active}
                    className={cn(
                      'w-fit cursor-pointer rounded-full border px-4 py-1.5 text-[0.78rem] font-extrabold uppercase tracking-widest transition-all whitespace-nowrap shrink-0',
                      active
                        ? 'border-gold-400 bg-gold-400 text-forest-950'
                        : 'border-cream-50/25 text-cream-100/70 hover:border-cream-50/60 hover:text-cream-50',
                    )}
                  >
                    {code === 'ky' ? 'Кыргызча' : code === 'en' ? 'English' : 'Русский'}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 border-t border-cream-50/10 pt-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[0.78rem] text-cream-100/50">
            © {year} {SITE_INFO.name}. {t.foot.rights}
          </p>
          <p className="flex items-center gap-2 text-[0.78rem] text-cream-100/50">
            <TundukEmblem className="h-4 w-4 text-gold-400/70" ring={false} />
            {t.foot.madeIn}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsApp() {
  const { t, lang } = useI18n();

  return (
    <a
      href={buildWhatsAppUrl(WHATSAPP_TEMPLATES.stay(lang))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.float.label}
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-0 rounded-full bg-whats-600 text-white shadow-[0_18px_40px_-12px_rgba(21,144,72,0.65)] transition-all duration-400 hover:-translate-y-1 hover:bg-whats-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 sm:bottom-7 sm:right-7"
    >
      <span className="pulse-ring flex h-15 w-15 items-center justify-center rounded-full">
        <WhatsAppIcon className="h-8 w-8" />
      </span>
      <span className="max-w-0 overflow-hidden text-[0.85rem] font-bold whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-56 group-hover:pr-6 group-hover:opacity-100">
        {t.float.label}
      </span>
    </a>
  );
}
