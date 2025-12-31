// Minimal root layout - locale-specific layout handles everything
// This exists only because Next.js requires a root layout

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
