import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "BestStayDavos | Luxury Accommodation for WEF",
    template: "%s | BestStayDavos",
  },
  description: "Premium luxury apartments and chalets in Davos, Switzerland. Perfect for the World Economic Forum (WEF) and year-round Alpine experiences.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
