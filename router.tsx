import React from 'react';

// ============================================================================
// Invite Klick — tiny dependency-free hash router.
// Supports static segments and :param segments, e.g. /invite/:slug/rsvp
// ============================================================================

type RouteContextValue = {
  path: string;
  params: Record<string, string>;
  navigate: (to: string) => void;
};

const RouteContext = React.createContext<RouteContextValue>({
  path: '/',
  params: {},
  navigate: () => {},
});

function getHashPath(): string {
  const hash = window.location.hash.replace(/^#/, '');
  return hash || '/';
}

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [path, setPath] = React.useState<string>(getHashPath());

  React.useEffect(() => {
    const onHashChange = () => setPath(getHashPath());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = React.useCallback((to: string) => {
    if (window.location.hash.replace(/^#/, '') === to) {
      // force scroll-to-top even if same path re-clicked
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    window.location.hash = to;
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const value = React.useMemo(() => ({ path, params: {}, navigate }), [path, navigate]);

  return <RouteContext.Provider value={value}>{children}</RouteContext.Provider>;
}

export function useRouter() {
  return React.useContext(RouteContext);
}

export function useNavigate() {
  return React.useContext(RouteContext).navigate;
}

function matchPath(pattern: string, path: string): Record<string, string> | null {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    const rp = pathParts[i];
    if (pp.startsWith(':')) {
      params[pp.slice(1)] = decodeURIComponent(rp);
    } else if (pp !== rp) {
      return null;
    }
  }
  return params;
}

export interface RouteDef {
  path: string;
  render: (params: Record<string, string>) => React.ReactNode;
}

export function RouteSwitch({ routes, notFound }: { routes: RouteDef[]; notFound: React.ReactNode }) {
  const { path } = useRouter();
  const clean = path.split('?')[0];
  for (const route of routes) {
    const params = matchPath(route.path, clean);
    if (params) return <>{route.render(params)}</>;
  }
  return <>{notFound}</>;
}

export function Link({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
}

export function useIsActive(path: string, exact = false) {
  const { path: current } = useRouter();
  const clean = current.split('?')[0];
  return exact ? clean === path : clean === path || clean.startsWith(path + '/');
}
