type PageShellProps = {
  children: React.ReactNode;
};

/** Minimal layout wrapper; landing page includes its own chrome (Header/Footer). */
export function PageShell({ children }: PageShellProps) {
  return children;
}
