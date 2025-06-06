import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const robotoSans = Roboto({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mouts IT App",
  description: "App for Mouts IT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${robotoSans.variable} ${robotoMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
