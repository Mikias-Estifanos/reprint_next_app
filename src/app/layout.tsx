import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Card Reprint Request',
  description: 'Request a reprint for lost or broken cards',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
