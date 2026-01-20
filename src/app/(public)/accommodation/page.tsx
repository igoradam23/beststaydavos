import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Users, Bed, Bath, Wifi, Car, Coffee, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Accommodation",
  description: "Browse our collection of luxury apartments and chalets in Davos, Switzerland. Perfect for the World Economic Forum.",
}

// Mock data - in production this would come from Supabase
const properties = [
  {
    id: "1",
    name: "Alpine Luxury Chalet",
    slug: "alpine-luxury-chalet",
    location: "Davos Dorf",
    address: "Talstrasse 46",
    capacity: 12,
    rooms: 5,
    bathrooms: 4,
    distance: 0.3,
    description: "Stunning 5-bedroom chalet with panoramic mountain views and private spa.",
    amenities: ["WiFi", "Parking", "Spa", "Fireplace", "Mountain View"],
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800",
    featured: true,
    priceRange: "€15,000 - €25,000 / week",
  },
  {
    id: "2",
    name: "Congress Center Suite",
    slug: "congress-center-suite",
    location: "Davos Platz",
    address: "Promenade 24",
    capacity: 4,
    rooms: 2,
    bathrooms: 2,
    distance: 0.1,
    description: "Modern 2-bedroom apartment steps from the Congress Center.",
    amenities: ["WiFi", "Kitchen", "City View", "24h Concierge"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
    featured: true,
    priceRange: "€8,000 - €12,000 / week",
  },
  {
    id: "3",
    name: "Mountain View Residence",
    slug: "mountain-view-residence",
    location: "Davos Platz",
    address: "Bahnhofstrasse 15",
    capacity: 6,
    rooms: 3,
    bathrooms: 2,
    distance: 0.5,
    description: "Elegant 3-bedroom residence with stunning Alpine panorama.",
    amenities: ["WiFi", "Parking", "Balcony", "Mountain View", "Kitchen"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    featured: false,
    priceRange: "€10,000 - €18,000 / week",
  },
  {
    id: "4",
    name: "Executive Penthouse",
    slug: "executive-penthouse",
    location: "Davos Platz",
    address: "Tobelmühlestrasse 8",
    capacity: 8,
    rooms: 4,
    bathrooms: 3,
    distance: 0.4,
    description: "Luxurious penthouse with rooftop terrace and 360° views.",
    amenities: ["WiFi", "Terrace", "Hot Tub", "Mountain View", "Parking"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
    featured: true,
    priceRange: "€20,000 - €35,000 / week",
  },
  {
    id: "5",
    name: "Klosters Grand Chalet",
    slug: "klosters-grand-chalet",
    location: "Klosters",
    address: "Ried-Laretstrasse 5",
    capacity: 22,
    rooms: 7,
    bathrooms: 7,
    distance: 8,
    description: "Magnificent 7-bedroom chalet perfect for large delegations.",
    amenities: ["WiFi", "Parking", "Pool", "Spa", "Cinema", "Gym"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
    featured: false,
    priceRange: "€45,000 - €75,000 / week",
  },
  {
    id: "6",
    name: "Studio Promenade",
    slug: "studio-promenade",
    location: "Davos Platz",
    address: "Promenade 24",
    capacity: 2,
    rooms: 1,
    bathrooms: 1,
    distance: 0.1,
    description: "Compact but luxurious studio ideal for solo travelers or couples.",
    amenities: ["WiFi", "Kitchen", "City View"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
    featured: false,
    priceRange: "€4,000 - €6,000 / week",
  },
]

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Parking: Car,
  Kitchen: Coffee,
  "Mountain View": Mountain,
}

export default function AccommodationPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <section className="bg-champagne py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Our <span className="text-gold">Accommodation</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Discover our curated collection of luxury properties in Davos and surrounding areas. 
            Each property is carefully selected to meet the highest standards.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Select
                id="location"
                options={[
                  { value: "all", label: "All Locations" },
                  { value: "davos-platz", label: "Davos Platz" },
                  { value: "davos-dorf", label: "Davos Dorf" },
                  { value: "klosters", label: "Klosters" },
                ]}
                defaultValue="all"
              />
            </div>
            <div>
              <Label htmlFor="guests">Guests</Label>
              <Select
                id="guests"
                options={[
                  { value: "any", label: "Any" },
                  { value: "2", label: "1-2 guests" },
                  { value: "6", label: "3-6 guests" },
                  { value: "12", label: "7-12 guests" },
                  { value: "20", label: "12+ guests" },
                ]}
                defaultValue="any"
              />
            </div>
            <div>
              <Label htmlFor="rooms">Bedrooms</Label>
              <Select
                id="rooms"
                options={[
                  { value: "any", label: "Any" },
                  { value: "1", label: "1 bedroom" },
                  { value: "2", label: "2 bedrooms" },
                  { value: "3", label: "3+ bedrooms" },
                  { value: "5", label: "5+ bedrooms" },
                ]}
                defaultValue="any"
              />
            </div>
            <div>
              <Label htmlFor="distance">Distance to Congress</Label>
              <Select
                id="distance"
                options={[
                  { value: "any", label: "Any" },
                  { value: "0.5", label: "Within 500m" },
                  { value: "1", label: "Within 1km" },
                  { value: "5", label: "Within 5km" },
                ]}
                defaultValue="any"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-medium text-foreground">{properties.length}</span> properties
            </p>
            <Select
              options={[
                { value: "featured", label: "Featured" },
                { value: "price-low", label: "Price: Low to High" },
                { value: "price-high", label: "Price: High to Low" },
                { value: "distance", label: "Distance to Congress" },
              ]}
              defaultValue="featured"
              className="w-48"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden group">
                <Link href={`/accommodation/${property.slug}`}>
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={property.image}
                      alt={property.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {property.featured && (
                      <Badge variant="gold" className="absolute top-4 left-4">
                        Featured
                      </Badge>
                    )}
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary" className="bg-white/90">
                        {property.distance < 1 
                          ? `${(property.distance * 1000).toFixed(0)}m to Congress`
                          : `${property.distance}km to Congress`
                        }
                      </Badge>
                    </div>
                  </div>
                </Link>
                
                <CardContent className="pt-4">
                  <Link href={`/accommodation/${property.slug}`}>
                    <h3 className="text-xl font-semibold group-hover:text-gold transition-colors">
                      {property.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location} &middot; {property.address}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {property.capacity}
                    </span>
                    <span className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.rooms}
                    </span>
                    <span className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {property.amenities.slice(0, 4).map((amenity) => {
                      const Icon = amenityIcons[amenity]
                      return (
                        <Badge key={amenity} variant="outline" className="text-xs">
                          {Icon && <Icon className="h-3 w-3 mr-1" />}
                          {amenity}
                        </Badge>
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div>
                      <span className="text-lg font-semibold text-gold">
                        {property.priceRange.split(" - ")[0]}
                      </span>
                      <span className="text-sm text-muted-foreground"> / week</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/accommodation/${property.slug}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Contact us directly and we&apos;ll help you find the perfect accommodation for your needs.
          </p>
          <Button variant="gold" size="lg" className="mt-8" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
