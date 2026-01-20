import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Users, Bed, Bath, Wifi, Car, Coffee, Mountain, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookingRequestForm } from "@/components/booking/booking-request-form"

// Mock data - in production would fetch from Supabase
const properties: Record<string, {
  id: string
  name: string
  location: string
  address: string
  capacity: number
  rooms: number
  bathrooms: number
  distance: number
  description: string
  longDescription: string
  amenities: string[]
  images: string[]
  priceRange: string
  features: string[]
}> = {
  "alpine-luxury-chalet": {
    id: "1",
    name: "Alpine Luxury Chalet",
    location: "Davos Dorf",
    address: "Talstrasse 46, 7260 Davos Dorf",
    capacity: 12,
    rooms: 5,
    bathrooms: 4,
    distance: 0.3,
    description: "Stunning 5-bedroom chalet with panoramic mountain views and private spa.",
    longDescription: `Experience the pinnacle of Alpine luxury in this magnificent 5-bedroom chalet, perfectly positioned in the heart of Davos Dorf. This exceptional property offers an unparalleled combination of traditional Swiss charm and modern amenities.

The chalet features spacious living areas with floor-to-ceiling windows that showcase breathtaking panoramic views of the surrounding mountains. The gourmet kitchen is fully equipped for entertaining, while the private spa area includes a sauna, steam room, and hot tub.

Each of the five bedrooms is elegantly appointed with premium bedding and en-suite facilities. The master suite offers a private balcony with mountain views.

Located just 300 meters from the Congress Center, this property is ideal for WEF delegates who value both convenience and privacy.`,
    amenities: ["WiFi", "Parking", "Spa", "Fireplace", "Mountain View", "Sauna", "Hot Tub", "Fully Equipped Kitchen", "Balcony", "Ski Storage", "Heated Floors", "Concierge Service"],
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",
    ],
    priceRange: "€15,000 - €25,000",
    features: [
      "300m to Congress Center",
      "Private spa with sauna & hot tub",
      "Panoramic mountain views",
      "Secure parking for 3 vehicles",
      "24/7 concierge service",
      "Daily housekeeping available",
    ],
  },
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = properties[slug]
  
  if (!property) {
    return {
      title: "Property Not Found",
    }
  }

  return {
    title: property.name,
    description: property.description,
    openGraph: {
      title: `${property.name} | BestStayDavos`,
      description: property.description,
      images: [property.images[0]],
    },
  }
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params
  const property = properties[slug]

  if (!property) {
    notFound()
  }

  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/accommodation" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all properties
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative h-[190px] md:h-[242px] rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${property.name} - Image ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{property.name}</h1>
                  <p className="text-lg text-muted-foreground flex items-center mt-2">
                    <MapPin className="h-5 w-5 mr-2 text-gold" />
                    {property.address}
                  </p>
                </div>
                <Badge variant="gold" className="text-lg px-4 py-2">
                  {property.distance < 1 
                    ? `${(property.distance * 1000).toFixed(0)}m to Congress`
                    : `${property.distance}km to Congress`
                  }
                </Badge>
              </div>

              <div className="flex items-center gap-6 mt-6 text-muted-foreground">
                <span className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Up to {property.capacity} guests
                </span>
                <span className="flex items-center">
                  <Bed className="h-5 w-5 mr-2" />
                  {property.rooms} bedrooms
                </span>
                <span className="flex items-center">
                  <Bath className="h-5 w-5 mr-2" />
                  {property.bathrooms} bathrooms
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">About this property</h2>
              <div className="prose prose-gray max-w-none">
                {property.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-gold mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-sm px-3 py-1">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <div className="bg-muted rounded-lg h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">
                  Interactive map would be displayed here
                </p>
              </div>
              <p className="mt-4 text-muted-foreground">
                {property.address} - {property.distance < 1 
                  ? `${(property.distance * 1000).toFixed(0)} meters`
                  : `${property.distance} kilometers`
                } from the Congress Center
              </p>
            </div>
          </div>

          {/* Sidebar - Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-gold">
                      {property.priceRange.split(" - ")[0]}
                    </span>
                    <span className="text-sm font-normal text-muted-foreground">/ week</span>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    WEF 2026: January 19-23
                  </p>
                </CardHeader>
                <CardContent>
                  <BookingRequestForm propertyId={property.id} propertyName={property.name} />
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Need help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our team is available to answer your questions and help you find the perfect property.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
