import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "BestStayDavos | Luxury Accommodation for WEF",
    template: "%s | BestStayDavos",
  },
  description: "Premium luxury apartments and chalets in Davos, Switzerland. Perfect for the World Economic Forum (WEF) and year-round Alpine experiences.",
  keywords: ["Davos", "WEF", "World Economic Forum", "luxury accommodation", "apartments", "chalets", "Switzerland", "Alpine"],
  authors: [{ name: "BestStayDavos" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://beststaydavos.ch",
    siteName: "BestStayDavos",
    title: "BestStayDavos | Luxury Accommodation for WEF",
    description: "Premium luxury apartments and chalets in Davos, Switzerland.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BestStayDavos | Luxury Accommodation for WEF",
    description: "Premium luxury apartments and chalets in Davos, Switzerland.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
