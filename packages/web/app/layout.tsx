/** @type {import('next').Metadata} */
export const metadata = {
  title: 'Tuiton — School Tuition + AI & Innovation Track',
  description:
    'School subjects taught well and a real innovation track — coding, prompt engineering, AI tools, app-building, security basics — with live classes and on-demand content.',
  authors: [{ name: 'Tuiton Team' }],
  openGraph: {
    siteName: 'Tuiton',
    title: 'Tuiton — Tuition meets the AI studio',
    description: 'One batch, two admins, live classes + on-demand content.',
  },
};

import './globals.css';
import { Navbar } from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-ink-50 text-ink-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
