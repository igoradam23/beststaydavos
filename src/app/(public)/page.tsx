import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Shield, Car, CheckCircle2, MapPin, Users, Calendar } from "lucide-react"

export default function HomePage() {
  return (
    <main className="bg-background">
      {/* Hero Section - Immersive Dark */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1548777123-e216912df7d8?q=80&w=2070"
          alt="Luxury accommodation in Davos"
          fill
          className="object-cover scale-105"
          priority
        />
        
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <span className="inline-block text-[10px] font-bold tracking-[0.5em] uppercase mb-8 text-white/60 animate-fade-in">
            The Executive Standard
          </span>
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tight mb-8 leading-[1.1] text-white">
            Absolute Discretion. <br />
            <span className="italic font-serif text-white/80">Swiss Precision.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/40 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Curating high-security, all-inclusive residences for the World Economic Forum. 
            Experience unparalleled hospitality and comprehensive logistical support.
          </p>
          <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
            <Link 
              href="/accommodation"
              className="bg-white text-black px-12 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white/90 transition-all duration-500"
            >
              The 2026 Collection
            </Link>
            <Link 
              href="/contact" 
              className="group text-white text-[10px] font-bold tracking-[0.3em] uppercase flex items-center gap-4 border-b border-white/20 pb-2 hover:border-white transition-all"
            >
              Private Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/0 via-white/20 to-white/0" />
        </div>
      </section>

      {/* Trust/Status Bar */}
      <div className="border-y border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5 py-10">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/20">Security</span>
            <span className="text-xs font-light tracking-wide text-white/60">Fully Coordinated</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/20">Logistics</span>
            <span className="text-xs font-light tracking-wide text-white/60">Airport to Residency</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/20">Concierge</span>
            <span className="text-xs font-light tracking-wide text-white/60">24/7 Dedicated Team</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/20">Capacity</span>
            <span className="text-xs font-light tracking-wide text-white/60">Solo to Full Teams</span>
          </div>
        </div>
      </div>

      {/* USP Section - Carefree Service */}
      <section className="py-32 md:py-64 px-8 md:px-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16">
              <div>
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 mb-6 block">
                  The Carefree Promise
                </span>
                <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-[1.1] text-white">
                  Focus on the Forum. <br />
                  <span className="italic font-serif text-white/60">We handle the rest.</span>
                </h2>
              </div>
              <p className="text-white/40 text-lg leading-relaxed font-light">
                Our service model is designed for absolute peace of mind. Beyond luxury housing, we provide the infrastructure required for a successful Davos presence: from secure transport networks to private chef services and high-security protocols.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <div className="w-12 h-12 glass-card flex items-center justify-center">
                    <Car className="w-5 h-5 stroke-[1px] text-white/60" />
                  </div>
                  <h3 className="text-[10px] font-bold tracking-widest uppercase text-white">Elite Transport</h3>
                  <p className="text-sm text-white/30 font-light leading-relaxed">Secure fleet management and helicopter transfers from ZRH or private fields.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 glass-card flex items-center justify-center">
                    <Shield className="w-5 h-5 stroke-[1px] text-white/60" />
                  </div>
                  <h3 className="text-[10px] font-bold tracking-widest uppercase text-white">Bespoke Security</h3>
                  <p className="text-sm text-white/30 font-light leading-relaxed">Discreet executive protection coordinated with local security zones.</p>
                </div>
              </div>

              <div className="pt-10 flex gap-8">
                <Link 
                  href="/contact"
                  className="bg-white/5 border border-white/10 px-10 py-4 text-[10px] font-bold tracking-widest uppercase hover:bg-white/10 transition-all"
                >
                  Request Brochure
                </Link>
                <Link 
                  href="/accommodation"
                  className="text-[10px] font-bold tracking-widest uppercase border-b border-white/20 pb-2 hover:border-white transition-all flex items-center gap-3 group"
                >
                  Explore Residencies
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden group shadow-2xl shadow-black">
              <Image
                src="https://images.unsplash.com/photo-1551882547-ff43c63be5c2?q=80&w=1000"
                alt="Davos Executive Service"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Collection Grid - Lot of whitespace */}
      <section className="py-32 bg-[#080808]">
        <div className="max-w-[1600px] mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-32 gap-8 border-b border-white/5 pb-16">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 mb-4 block">Selected Works</span>
              <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-white">2026 Residency Collection</h2>
            </div>
            <Link href="/accommodation" className="text-[10px] font-bold tracking-widest uppercase border border-white/10 px-12 py-5 hover:bg-white hover:text-black transition-all duration-500">
              View All 200+ Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-32">
            {[
              {
                name: "The Parsenn Penthouse",
                location: "Davos Dorf",
                specs: "6 Guests · 3 Master Suites",
                dist: "Walking Distance to Congress",
                img: "https://images.unsplash.com/photo-1600607687940-467f4b6020c2?q=80&w=1000",
                price: "From €25k / week"
              },
              {
                name: "Chalet Jakobshorn",
                location: "Davos Platz",
                specs: "12 Guests · 6 Bedroom Residency",
                dist: "3 min Private Shuttle",
                img: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1000",
                price: "From €45k / week"
              },
              {
                name: "The Clavadel Sanctuary",
                location: "Clavadelerstrasse",
                specs: "4 Guests · 2 Luxury Suites",
                dist: "400m to Promenade",
                img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1000",
                price: "From €18k / week"
              }
            ].map((prop, i) => (
              <Link key={i} href="/accommodation" className="group block space-y-10">
                <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                  <Image
                    src={prop.img}
                    alt={prop.name}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[2s]"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-light tracking-tight text-white/80 group-hover:text-white transition-colors">{prop.name}</h3>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-white/20 mt-2">{prop.location}</p>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white/60">{prop.price}</span>
                  </div>
                  <div className="flex gap-8 pt-6 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2">
                      <Users className="w-3 h-3" /> {prop.specs}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-2">
                      <MapPin className="w-3 h-3" /> {prop.dist}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Middle CTA / Stats Section */}
      <section className="py-48 bg-black">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-white leading-tight">
              A Legacy of <br />
              <span className="italic font-serif text-white/60">Executive Hosting.</span>
            </h2>
            <div className="flex gap-8">
              <Link 
                href="/about"
                className="bg-white text-black px-12 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white/90 transition-all"
              >
                Our Reputation
              </Link>
              <Link 
                href="/contact"
                className="text-white text-[10px] font-bold tracking-widest uppercase border-b border-white/20 pb-4 hover:border-white transition-all"
              >
                Inquire for Teams
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-16">
            <div className="space-y-2">
              <span className="text-3xl font-light text-white">15+</span>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/20">Years at WEF</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-light text-white">200+</span>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/20">Elite Properties</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-light text-white">100%</span>
              <p className="text-[10px] font-bold tracking-widest uppercase text-white/20">Secure Handling</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl font-light text-white">65%</span>
              <p className="text-[10px] font-bold tracking-widest uppercase text-amber-200">2026 Booked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Services Section */}
      <section className="py-32 md:py-64">
        <div className="max-w-[1000px] mx-auto px-8 text-center">
          <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20 mb-12 block">The Mandate</span>
          <h2 className="text-4xl md:text-7xl font-extralight tracking-tight text-white mb-24 leading-[1.1]">
            Seamless Integration of <br />
            <span className="italic font-serif text-white/60">Luxury & Logistics.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
            {[
              {
                title: "Logistical Hub",
                desc: "Meet & Greet at Zurich (ZRH) or Samedan, with secure armored transfer directly to residency.",
                icon: <Car className="w-5 h-5 stroke-[1px]" />
              },
              {
                title: "In-Residence Ops",
                desc: "Private chefs, discreet housekeeping, and secure meeting spaces managed by your concierge.",
                icon: <CheckCircle2 className="w-5 h-5 stroke-[1px]" />
              },
              {
                title: "Local Authority",
                desc: "Expert navigation of security perimeters and procurement of last-minute hospitality assets.",
                icon: <Shield className="w-5 h-5 stroke-[1px]" />
              }
            ].map((s, i) => (
              <div key={i} className="space-y-8 p-12 glass-card group hover:border-white/20 transition-all cursor-default">
                <div className="w-10 h-10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all">
                  {s.icon}
                </div>
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-white/80">{s.title}</h4>
                <p className="text-sm text-white/30 leading-relaxed font-light">{s.desc}</p>
                <Link href="/contact" className="inline-block text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors pt-4 border-b border-transparent hover:border-white/20 pb-1">Detail Access</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="pb-32 px-8">
        <div className="max-w-[1600px] mx-auto glass-card p-24 md:p-56 text-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/20 mb-12 block">Final Call for 2026</span>
            <h2 className="text-5xl md:text-8xl font-extralight tracking-tight text-white mb-16 leading-tight">
              Begin Your Davos <br /> <span className="italic font-serif text-white/60">Consultation</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-10 justify-center items-center">
              <Link 
                href="/contact"
                className="bg-white text-black px-16 py-6 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-white/90 transition-all"
              >
                Inquire Now
              </Link>
              <Link 
                href="/accommodation"
                className="text-white text-[10px] font-bold tracking-widest uppercase border-b border-white/20 pb-4 hover:border-white transition-all"
              >
                View Remaining Availability
              </Link>
            </div>
          </div>
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.02] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </section>
    </main>
  )
}
