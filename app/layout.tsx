import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arimafinance.xyz"),
  title: "Arima Finance — Quantitative Intelligence",
  description: "Quantitative research, algorithm development, portfolio intelligence and financial technology.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Arima Finance — Quantitative Intelligence",
    description: "Building intelligent systems for modern financial markets.",
    url: "/",
    siteName: "Arima Finance",
    images: [{ url: "/assets/images/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Arima Finance", images: ["/assets/images/og-image.png"] },
  icons: { icon: "/assets/icons/favicon.svg" },
  other: {
    "industry-landscape-disclaimer": "Institution names shown in the experience represent the financial ecosystem only and do not imply affiliation, endorsement, or partnership.",
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#000000" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-black"><body>{children}</body></html>;
}
