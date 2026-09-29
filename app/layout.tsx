import type { Metadata } from "next";
import "../src/index.css";
import Navbar from "@/src/components/Navbar";
import SocialSidebar from "@/src/components/SocialSidebar";
import AskDeepak from "@/src/components/AskDeepak";
import Footer from "@/src/components/Footer";
import BackToTop from "@/src/components/BackToTop";

const siteUrl = "https://deepakkandpal.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Deepak Kandpal | Full Stack Developer",
    template: "%s | Deepak Kandpal",
  },

  description:
    "Deepak Kandpal is a Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, PostgreSQL, Prisma, and modern web technologies. Explore my projects, skills, and experience.",

  applicationName: "Deepak Kandpal Portfolio",

  keywords: [
    "Deepak Kandpal",
    "Deepak Kandpal Portfolio",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "Express.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Prisma",
    "MongoDB",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
  ],

  authors: [
    {
      name: "Deepak Kandpal",
      url: siteUrl,
    },
  ],

  creator: "Deepak Kandpal",
  publisher: "Deepak Kandpal",

  category: "technology",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "Deepak Kandpal | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, PostgreSQL and scalable web applications.",
    url: siteUrl,
    siteName: "Deepak Kandpal",
    locale: "en_US",
    type: "website",

    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Deepak Kandpal Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Deepak Kandpal | Full Stack Developer",
    description:
      "Full Stack Developer specializing in React, Next.js, Node.js and TypeScript.",

    creator: "@codedbydeepak",
    site: "@codedbydeepak",

    images: ["/opengraph-image"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },

  manifest: "/manifest.webmanifest",

  other: {
    "theme-color": "#06070a",
  },

  // Add after verifying Google Search Console
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },
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
      "https://x.com/codedbydeepak",
      "https://instagram.com/codedbydeepak",
    ],
  };

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://ghchart.rshah.org" />
        {/* Fonts — Space Grotesk (headings), Inter (body), JetBrains Mono (terminal/code) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        <SocialSidebar />
        {children}
        <Footer />
        <BackToTop />
        <AskDeepak />
      </body>
    </html>
  );
}
