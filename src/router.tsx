import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export const ROUTES = {
  home: '/',
  stay: '/stay',
  tours: '/tours',
  visit: '/visit',
} as const;

export type RouteKey = keyof typeof ROUTES;

const matchRoute = (pathname: string): RouteKey => {
  const found = (Object.keys(ROUTES) as RouteKey[]).find((key) => ROUTES[key] === pathname);
  return found ?? 'home';
};

interface RouterState {
  route: RouteKey;
  focus: string | null;
}

interface RouterContextValue extends RouterState {
  navigate: (to: RouteKey, focus?: string | null) => void;
}

const RouterContext = createContext<RouterContextValue>({
  route: 'home',
  focus: null,
  navigate: () => {},
});

function parseHash(): RouterState {
  if (typeof window === 'undefined') return { route: 'home', focus: null };
  const raw = window.location.hash.replace(/^#/, '');
  const [pathPart, queryPart] = raw.split('?');
  const normalizedPath = pathPart.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(queryPart ?? '');
  return {
    route: matchRoute(normalizedPath),
    focus: params.get('focus'),
  };
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RouterState>(parseHash);

  useEffect(() => {
    const onHashChange = () => setState(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: RouteKey, focus: string | null = null) => {
    const targetHash = `#${ROUTES[to]}${focus ? `?focus=${encodeURIComponent(focus)}` : ''}`;
    if (window.location.hash === targetHash) {
      setState({ route: to, focus });
    } else {
      window.location.hash = targetHash;
    }
  }, []);

  const prevRouteRef = useRef<RouteKey>(state.route);

  useEffect(() => {
    const routeChanged = prevRouteRef.current !== state.route;
    prevRouteRef.current = state.route;

    const timer = window.setTimeout(() => {
      if (state.focus) {
        const el = document.getElementById(state.focus);
        if (el) {
          el.scrollIntoView({
            behavior: routeChanged ? 'auto' : 'smooth',
            block: 'start',
          });
          return;
        }
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 90);

    return () => window.clearTimeout(timer);
  }, [state]);

  return (
    <RouterContext.Provider value={{ ...state, navigate }}>{children}</RouterContext.Provider>
  );
}

export const useRouter = () => useContext(RouterContext);

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: RouteKey;
  focus?: string;
}

export function NavLink({ to, focus, onClick, children, ...rest }: NavLinkProps) {
  const { navigate } = useRouter();
  const href = `#${ROUTES[to]}${focus ? `?focus=${encodeURIComponent(focus)}` : ''}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (
      !e.defaultPrevented &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      e.button === 0
    ) {
      e.preventDefault();
      navigate(to, focus ?? null);
    }
  };

  return (
    <a {...rest} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}
