import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Users, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "About Davos",
  description: "Learn about Davos, Switzerland - home to the World Economic Forum and world-class skiing.",
}

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We only list properties that meet our rigorous quality standards.",
  },
  {
    icon: Users,
    title: "Personal Service",
    description: "Dedicated support throughout your booking journey and stay.",
  },
  {
    icon: Clock,
    title: "Responsiveness",
    description: "Quick responses to inquiries - typically within hours, not days.",
  },
  {
    icon: Shield,
    title: "Trust",
    description: "Transparent pricing with no hidden fees. What you see is what you pay.",
  },
]

export default function AboutPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2070')",
          }}
        />
        <div className="relative z-20 text-center text-white px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            About <span className="text-gold">Davos</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Where world leaders meet and Alpine beauty inspires
          </p>
        </div>
      </section>

      {/* About Davos */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                The Heart of the <span className="text-gold">Swiss Alps</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Nestled at 1,560 meters in the Swiss canton of Graubünden, Davos is one of the highest 
                  towns in Europe and a world-renowned destination for both winter sports enthusiasts 
                  and global leaders.
                </p>
                <p>
                  Since 1971, Davos has hosted the World Economic Forum&apos;s annual meeting, transforming 
                  this Alpine town into a global stage where heads of state, business leaders, and 
                  thought leaders gather to shape the world&apos;s agenda.
                </p>
                <p>
                  Beyond WEF, Davos offers exceptional skiing across six distinct mountains, 
                  world-class medical facilities, and a rich cultural heritage dating back to the 
                  late 19th century when it became famous as a health resort.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1548777123-e216912df7d8?q=80&w=1200"
                alt="Davos panorama"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* World Economic Forum */}
      <section className="py-24 bg-champagne">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1200"
                alt="Congress Center Davos"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                The World Economic <span className="text-gold">Forum</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Every January, Davos becomes the center of the global conversation as the World 
                  Economic Forum brings together approximately 3,000 participants from around the world.
                </p>
                <p>
                  The Congress Center, located in the heart of Davos Platz, serves as the main venue 
                  for this prestigious gathering. With its central location, attendees have easy access 
                  to meetings, sessions, and networking events.
                </p>
                <p>
                  Accommodation during WEF week is highly sought after, with properties booking up 
                  months in advance. At BestStayDavos, we specialize in providing premium accommodations 
                  that meet the expectations of discerning WEF attendees.
                </p>
              </div>
              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">WEF 2026</h3>
                <p className="text-muted-foreground">
                  <strong>Dates:</strong> January 19-23, 2026<br />
                  <strong>Location:</strong> Congress Center, Davos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              About <span className="text-gold">BestStayDavos</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner for luxury accommodation in Davos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide exceptional accommodation experiences for discerning guests visiting 
                  Davos for the World Economic Forum and beyond. We believe that where you stay 
                  should match the significance of why you&apos;re here.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Our Expertise</h3>
                <p className="text-muted-foreground">
                  With over 15 years of experience in Davos hospitality, we understand the unique 
                  needs of WEF attendees. From proximity to the Congress Center to privacy and 
                  security requirements, we&apos;ve curated our portfolio with your needs in mind.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to Experience Davos?
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Browse our collection of premium properties and find your perfect stay for WEF 2026.
          </p>
          <Button variant="gold" size="xl" className="mt-8" asChild>
            <Link href="/accommodation">
              View Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
