"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Accommodation", href: "/accommodation" },
  { name: "About Davos", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 glass">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between p-6 lg:px-12">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
            <span className="text-xl font-light tracking-[0.4em] uppercase text-white">
              BestStay<span className="font-bold">Davos</span>
            </span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6 stroke-[1px]" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hover:text-white transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-10 items-center">
          <Link 
            href="/contact" 
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hover:text-white transition-all"
          >
            Private Consultation
          </Link>
          <Link 
            href="/accommodation" 
            className="text-[10px] font-bold tracking-[0.3em] uppercase border border-white/20 px-10 py-4 hover:bg-white hover:text-black transition-all duration-700"
          >
            Book Now
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn("lg:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-xl font-light tracking-widest uppercase text-white">BestStayDavos</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6 stroke-[1px]" />
            </button>
          </div>
          <div className="mt-16 flow-root">
            <div className="space-y-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-3xl font-light tracking-widest uppercase text-white hover:text-white/40 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-12 space-y-6">
                <Link 
                  href="/accommodation"
                  className="block text-center text-[10px] font-bold tracking-widest uppercase border border-white/20 py-5 hover:bg-white hover:text-black transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Now
                </Link>
                <Link 
                  href="/contact"
                  className="block text-center text-[10px] font-bold tracking-widest uppercase text-white/40"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Private Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
