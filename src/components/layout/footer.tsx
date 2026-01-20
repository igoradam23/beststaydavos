import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#080808] py-32 px-8 border-t border-white/5">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
          <div className="md:col-span-2 space-y-12">
            <Link href="/" className="text-xl font-light tracking-[0.4em] uppercase block text-white">
              BestStay<span className="font-bold">Davos</span>
            </Link>
            <p className="text-white/20 text-sm max-w-sm font-light leading-relaxed">
              Curating exclusive, carefree accommodation and comprehensive support services for the World Economic Forum since 2010. Excellence in every Swiss detail.
            </p>
            <div className="flex gap-10">
              <Link href="/contact" className="text-[10px] font-bold tracking-[0.2em] uppercase border border-white/10 px-8 py-3 hover:bg-white hover:text-black transition-all">Contact Us</Link>
              <Link href="/accommodation" className="text-[10px] font-bold tracking-[0.2em] uppercase border border-white/10 px-8 py-3 hover:bg-white hover:text-black transition-all">Book Now</Link>
            </div>
          </div>
          
          <div className="space-y-10">
            <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">The Collection</h4>
            <ul className="space-y-5">
              <li><Link href="/accommodation" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors">Private Chalets</Link></li>
              <li><Link href="/accommodation" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors">Luxury Suites</Link></li>
              <li><Link href="/accommodation" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors">Full Residences</Link></li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40">Services</h4>
            <ul className="space-y-5">
              <li><Link href="/contact" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors">Transport & Chauffeur</Link></li>
              <li><Link href="/contact" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors">VIP Security</Link></li>
              <li><Link href="/contact" className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20 hover:text-white transition-colors">Bespoke Catering</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="text-[10px] font-bold tracking-widest uppercase text-white/10">
            © 2026 BestStayDavos. All Rights Reserved.
          </p>
          <div className="flex gap-12">
            <Link href="/privacy" className="text-[10px] font-bold tracking-widest uppercase text-white/10 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-[10px] font-bold tracking-widest uppercase text-white/10 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
