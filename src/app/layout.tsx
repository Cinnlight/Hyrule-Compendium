// app/layout.tsx

import type { Metadata } from "next";
import { Roboto, Roboto_Slab, Smooch_Sans, Fira_Code } from 'next/font/google';
import 'material-icons/iconfont/material-icons.css';
import "./ui/globals.css";
import Nav from "./ui/components/nav";
import { PageProvider } from "./lib/pageContext";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
});

const smoochSans = Smooch_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hyrule Compendium",
  description: "A Legend of Zelda Wiki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <PageProvider>
          <Nav />
          {children}
        </PageProvider>
      </body>
    </html>
  );
}