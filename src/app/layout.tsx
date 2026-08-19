import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://taxation.vlslawacademy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Taxation Laws & Practice | VLS Law Academy",
  description:
    "Understand Direct Tax, Indirect Tax, GST, tax adjudication, ITAT, CESTAT, appellate proceedings and High Court tax practice with VLS Law Academy.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Taxation Laws & Practice | VLS Law Academy",
    description:
      "Understand Direct Tax, Indirect Tax, GST, tax adjudication, ITAT, CESTAT, appellate proceedings and High Court tax practice with VLS Law Academy.",
    url: siteUrl,
    siteName: "VLS Law Academy",
    type: "website",
    images: ["/assets/vls/brand/vls-logo.png"],
  },
  twitter: {
    card: "summary",
    title: "Taxation Laws & Practice | VLS Law Academy",
    description:
      "Understand Direct Tax, Indirect Tax, GST, tax adjudication, ITAT, CESTAT, appellate proceedings and High Court tax practice with VLS Law Academy.",
    images: ["/assets/vls/brand/vls-logo.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-vls-off-white text-vls-black">
        {children}
      </body>
    </html>
  );
}
