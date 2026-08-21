import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { UTMTracker } from "@/components/UTMTracker";

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
        <UTMTracker />
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y5ptpu6d1z");
          `}
        </Script>

        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1320569916265124');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1320569916265124&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
