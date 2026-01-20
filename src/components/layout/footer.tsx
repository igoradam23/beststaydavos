import Link from "next/link"
import { Mountain, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  accommodation: [
    { name: "All Properties", href: "/accommodation" },
    { name: "Luxury Chalets", href: "/accommodation?type=chalet" },
    { name: "Apartments", href: "/accommodation?type=apartment" },
    { name: "WEF Packages", href: "/accommodation?wef=true" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Mountain className="h-8 w-8 text-gold" />
              <span className="text-xl font-semibold">
                BestStay<span className="text-gold">Davos</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              Premium accommodation in Davos for the World Economic Forum and year-round Alpine experiences.
            </p>
          </div>

          {/* Accommodation Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Accommodation
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.accommodation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 text-gold" />
                Davos, Switzerland
              </li>
              <li>
                <a
                  href="mailto:info@beststaydavos.ch"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-gold" />
                  info@beststaydavos.ch
                </a>
              </li>
              <li>
                <a
                  href="tel:+41000000000"
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-gold" />
                  +41 00 000 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} BestStayDavos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
