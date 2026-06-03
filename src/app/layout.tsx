import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio of John Emerson Delos Reyes (Emer). Highly technical Head of Operations at Stashlify. Designing the internal technical systems, event workflows, and automation pipelines that scale global e-commerce and event technologies.",
  keywords: [
    "John Emerson Delos Reyes",
    "Emer",
    "Head of Operations",
    "Product Operations",
    "E-commerce Operations",
    "n8n automation",
    "Google Apps Script",
    "Supabase",
    "Systems Builder",
    "Operations Architect",
    "Philippines"
  ],
  authors: [{ name: "John Emerson Delos Reyes" }],
  openGraph: {
    title: "Emer // Operations Leader & Systems Builder",
    description: "I build the internal systems, tools, and automation pipelines behind execution. Based in the Philippines, working globally.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme');
                  var theme = stored || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-background text-foreground min-h-full flex flex-col font-sans selection:bg-teal-950 selection:text-teal-400">
        {children}
      </body>
    </html>
  );
}
