import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "../src/index.css";
import { ThemeProviderWrapper } from "@/src/components/ThemeProviderWrapper";
import Navbar from "@/src/components/Navbar";
import SocialSidebar from "@/src/components/SocialSidebar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-head-next",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-next",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://deepakkandpal.me";

export const metadata: Metadata = {
  title: {
    default: "Deepak Kandpal — Full Stack Developer",
    template: "%s — Deepak Kandpal",
  },
  description:
    "Full Stack Developer specialising in React, Next.js, Node.js and TypeScript. I build scalable, production-ready web applications — from idea to deployed.",
  keywords: [
    "Deepak Kandpal", "Full Stack Developer", "React Developer",
    "Next.js", "Node.js", "TypeScript", "PostgreSQL", "MongoDB",
    "MERN Stack", "Web Developer India", "Software Engineer", "Portfolio",
  ],
  authors: [{ name: "Deepak Kandpal", url: siteUrl }],
  creator: "Deepak Kandpal",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Deepak Kandpal",
    title: "Deepak Kandpal — Full Stack Developer",
    description:
      "Full Stack Developer specialising in React, Next.js, Node.js and TypeScript.",
    images: [
      {
        url: "/images/deepak.png",
        width: 800,
        height: 1000,
        alt: "Deepak Kandpal — Full Stack Developer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@rsdeepakg1",
    creator: "@rsdeepakg1",
    title: "Deepak Kandpal — Full Stack Developer",
    description:
      "Full Stack Developer specialising in React, Next.js, Node.js and TypeScript.",
    images: ["/images/deepak.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
    shortcut: "/icon.png",
  },
  other: {
    "theme-color": "#06070a",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Deepak Kandpal",
    url: siteUrl,
    image: `${siteUrl}/images/deepak.png`,
    jobTitle: "Full Stack Developer",
    description:
      "Full Stack Developer specialising in React, Next.js, Node.js, and TypeScript.",
    sameAs: [
      "https://github.com/deepakkandpal004",
      "https://www.linkedin.com/in/deepakkandpal",
      "https://x.com/rsdeepakg1",
    ],
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Theme flash prevention — must run before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
        {/* Preconnect for devicons CDN */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://ghchart.rshah.org" />
      </head>
      <body className={`${outfit.variable} ${inter.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProviderWrapper>
          <Navbar />
          <SocialSidebar />
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
