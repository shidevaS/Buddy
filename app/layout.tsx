/** @type {import('next').Metadata} */
export const metadata = {
  title: 'OmniLearn India',
  description: "India's Premier Learning Platform for K-12 and Advanced Tech Education",
  keywords: ['omnilearn', 'education', 'india', 'k-12', 'coding', 'ai', 'ml'],
  authors: [{ name: 'OmniLearn Team' }],
};

/** @type {import('next').Viewport} */
export const viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
};

import './globals.css';
import { Navbar } from './components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-gray-50 text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}