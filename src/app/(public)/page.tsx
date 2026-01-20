import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, MapPin, Users, Calendar, Shield, Clock, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Properties within walking distance to the Congress Center and key WEF venues.",
  },
  {
    icon: Shield,
    title: "Verified Quality",
    description: "Every property is personally inspected to meet our luxury standards.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated concierge service throughout your stay in Davos.",
  },
  {
    icon: Award,
    title: "WEF Expertise",
    description: "Years of experience hosting delegates, executives, and their teams.",
  },
]

const testimonials = [
  {
    quote: "Exceptional service and a stunning property. Made our WEF week truly memorable.",
    author: "Sarah M.",
    role: "CEO, Tech Company",
    rating: 5,
  },
  {
    quote: "The location couldn't be better. Walking distance to everything we needed.",
    author: "James K.",
    role: "Investment Director",
    rating: 5,
  },
  {
    quote: "Professional team, beautiful chalet, and seamless booking process.",
    author: "Dr. Elena R.",
    role: "Board Member",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 to-charcoal/40 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070')",
          }}
        />
        
        <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-slide-up">
            Luxury Stays in{" "}
            <span className="text-gradient-gold">Davos</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto animate-slide-up">
            Premium apartments and chalets for the World Economic Forum. 
            Experience unparalleled comfort in the heart of the Swiss Alps.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="xl" variant="gold" asChild>
              <Link href="/accommodation">
                View Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: "50+", label: "Properties" },
              { value: "15+", label: "Years Experience" },
              { value: "500+", label: "Happy Guests" },
              { value: "4.9", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold">{stat.value}</div>
                <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-champagne">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Why Choose <span className="text-gold">BestStayDavos</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in providing exceptional accommodation experiences for discerning guests during the World Economic Forum.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Featured Properties
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Hand-picked luxury accommodations for WEF 2026
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/accommodation">
                View All Properties
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Alpine Luxury Chalet",
                location: "Davos Dorf",
                capacity: 12,
                rooms: 5,
                distance: "0.3 km to Congress",
                image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800",
              },
              {
                name: "Promenade Residence",
                location: "Davos Platz",
                capacity: 6,
                rooms: 3,
                distance: "0.1 km to Congress",
                image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
              },
              {
                name: "Mountain View Suite",
                location: "Davos Platz",
                capacity: 4,
                rooms: 2,
                distance: "0.5 km to Congress",
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
              },
            ].map((property) => (
              <Card key={property.name} className="overflow-hidden group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-semibold">{property.name}</h3>
                    <p className="text-sm text-gray-300 flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.location}
                    </p>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Up to {property.capacity} guests
                    </span>
                    <span>{property.rooms} bedrooms</span>
                  </div>
                  <div className="mt-2 text-sm font-medium text-gold">
                    {property.distance}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-charcoal text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What Our Guests Say
            </h2>
            <p className="mt-4 text-lg text-gray-400">
              Trusted by executives and delegates from around the world
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-4">
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-gold to-gold-light">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Ready to Book Your Stay?
          </h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
            Secure your accommodation for WEF 2026 now. Properties book quickly - don&apos;t miss out on the best locations.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" className="bg-white text-gold hover:bg-gray-100" asChild>
              <Link href="/accommodation">
                Browse Properties
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">Request Custom Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
