import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Plus, Search, MoreVertical, MapPin, Users, Bed, Bath, Edit, Eye, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Properties | Admin",
}

// Mock data
const properties = [
  {
    id: "1",
    name: "Alpine Luxury Chalet",
    slug: "alpine-luxury-chalet",
    address: "Talstrasse 46, Davos Dorf",
    city: "Davos Dorf",
    capacity: 12,
    rooms: 5,
    bathrooms: 4,
    distance: 0.3,
    featured: true,
    active: true,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=400",
    bookings: 3,
  },
  {
    id: "2",
    name: "Congress Center Suite",
    slug: "congress-center-suite",
    address: "Promenade 24, Davos Platz",
    city: "Davos Platz",
    capacity: 4,
    rooms: 2,
    bathrooms: 2,
    distance: 0.1,
    featured: true,
    active: true,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=400",
    bookings: 5,
  },
  {
    id: "3",
    name: "Mountain View Residence",
    slug: "mountain-view-residence",
    address: "Bahnhofstrasse 15, Davos Platz",
    city: "Davos Platz",
    capacity: 6,
    rooms: 3,
    bathrooms: 2,
    distance: 0.5,
    featured: false,
    active: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=400",
    bookings: 2,
  },
  {
    id: "4",
    name: "Executive Penthouse",
    slug: "executive-penthouse",
    address: "Tobelmühlestrasse 8, Davos Platz",
    city: "Davos Platz",
    capacity: 8,
    rooms: 4,
    bathrooms: 3,
    distance: 0.4,
    featured: true,
    active: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400",
    bookings: 0,
  },
]

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-muted-foreground mt-1">
            Manage your property portfolio
          </p>
        </div>
        <Button variant="gold" asChild>
          <Link href="/admin/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="cursor-pointer">All ({properties.length})</Badge>
          <Badge variant="outline" className="cursor-pointer">Active ({properties.filter(p => p.active).length})</Badge>
          <Badge variant="outline" className="cursor-pointer">Featured ({properties.filter(p => p.featured).length})</Badge>
          <Badge variant="outline" className="cursor-pointer">Inactive ({properties.filter(p => !p.active).length})</Badge>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden group">
            <div className="relative h-48">
              <Image
                src={property.image}
                alt={property.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                {property.featured && (
                  <Badge variant="gold">Featured</Badge>
                )}
                <Badge variant={property.active ? "success" : "secondary"}>
                  {property.active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{property.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.address}
                  </p>
                </div>
              </div>

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
                <span className="ml-auto text-gold font-medium">
                  {property.distance}km
                </span>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <span className="text-sm text-muted-foreground">
                  {property.bookings} bookings
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/accommodation/${property.slug}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/admin/properties/${property.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
