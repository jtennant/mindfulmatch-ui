import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MindMatch - Find Your Perfect Therapist",
  description: "Connect with professional therapists that match your needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'var(--header-bg)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)',
          padding: '1rem 0'
        }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-color)', letterSpacing: '-0.5px' }}>
              MindMatch
            </Link>
            <nav>
              {/* Placeholder for future nav items */}
            </nav>
          </div>
        </header>
        <main style={{ minHeight: 'calc(100vh - 80px)' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
