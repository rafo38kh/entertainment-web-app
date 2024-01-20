import { ReactNode } from "react";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import Search from "@/components/Search";
import Providers from "@/components/Providers";
import Navigation from "@/components/Navigation";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "500", "700"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={` bg-movieDarkBlue text-white ${outfit.className}`}>
        <Providers>
          <Navigation />
          <Search />
          {children}
        </Providers>
      </body>
    </html>
  );
}
