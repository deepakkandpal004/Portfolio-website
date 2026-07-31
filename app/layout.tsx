import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../src/index.css";
import { ThemeProviderWrapper } from "@/src/components/ThemeProviderWrapper";
import Navbar from "@/src/components/Navbar";
import SocialSidebar from "@/src/components/SocialSidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-next",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

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
        url: "/og-image.png",
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

    images: ["/og-image.png"],
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
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem("theme");
                if (t === "light" || t === "dark") {
                  document.documentElement.setAttribute("data-theme", t);
                }
              } catch {}
            `,
          }}
        />

        {/* DNS Prefetch */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://ghchart.rshah.org" />
      </head>

      <body className={inter.variable}>
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
