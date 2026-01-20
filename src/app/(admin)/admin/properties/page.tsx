"use client"

import { Plus, Search, MapPin, Users, Bed, Bath, Eye, Edit, MoreHorizontal, Star, ArrowUpRight, Building2, TrendingUp, Sparkles } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const properties = [
  {
    id: "1",
    name: "The Parsenn Penthouse",
    location: "Davos Dorf",
    address: "Talstrasse 46, Davos",
    capacity: 6,
    rooms: 3,
    bathrooms: 3,
    distance: "0.2 km",
    status: "Active",
    featured: true,
    img: "https://images.unsplash.com/photo-1600607687940-467f4b6020c2?q=80&w=800",
    wef_price: "€25,000",
    occupancy: 85,
    bookings: 12,
    rating: 4.9,
    amenities: ["Private Spa", "Chef Kitchen", "Mountain View"]
  },
  {
    id: "2",
    name: "Chalet Jakobshorn",
    location: "Davos Platz",
    address: "Promenade 122, Davos",
    capacity: 12,
    rooms: 6,
    bathrooms: 5,
    distance: "5 min shuttle",
    status: "Maintenance",
    featured: true,
    img: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=800",
    wef_price: "€45,000",
    occupancy: 100,
    bookings: 8,
    rating: 5.0,
    amenities: ["Helipad", "Wine Cellar", "Security Suite"]
  },
  {
    id: "3",
    name: "The Clavadel Sanctuary",
    location: "Clavadelerstrasse",
    address: "Clavadelerstrasse 8, Davos",
    capacity: 4,
    rooms: 2,
    bathrooms: 2,
    distance: "0.4 km",
    status: "Active",
    featured: false,
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800",
    wef_price: "€18,000",
    occupancy: 40,
    bookings: 5,
    rating: 4.7,
    amenities: ["Fireplace", "Ski-in/out", "Hot Tub"]
  },
  {
    id: "4",
    name: "Belvedere Executive Suite",
    location: "Davos Dorf",
    address: "Promenade 24, Davos",
    capacity: 2,
    rooms: 1,
    bathrooms: 1,
    distance: "0.1 km",
    status: "Active",
    featured: false,
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
    wef_price: "€12,000",
    occupancy: 90,
    bookings: 18,
    rating: 4.8,
    amenities: ["Concierge", "Meeting Room", "Terrace"]
  },
  {
    id: "5",
    name: "Alpine Grand Residence",
    location: "Davos Platz",
    address: "Bergstrasse 15, Davos",
    capacity: 8,
    rooms: 4,
    bathrooms: 4,
    distance: "0.3 km",
    status: "Active",
    featured: true,
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800",
    wef_price: "€35,000",
    occupancy: 72,
    bookings: 9,
    rating: 4.9,
    amenities: ["Pool", "Cinema", "Gym"]
  }
]

const categories = ["All Properties", "Luxury Chalets", "Executive Suites", "Penthouses", "Villas"]

export default function PropertiesPage() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProperties = properties.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-12 animate-fade-in">

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8">
        <div>
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--subtle-foreground)] mb-3 block">
            Portfolio Management
          </span>
          <h1 className="text-4xl font-light tracking-tight text-[var(--foreground)]">The Collection</h1>
          <p className="text-[var(--subtle-foreground)] text-sm mt-2">Curated luxury residences for WEF 2026</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--subtle-foreground)] group-focus-within:text-[var(--foreground)] transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties..."
              className="w-full bg-[var(--subtle)] border border-[var(--border)] py-3.5 pl-12 pr-4 text-[11px] font-medium tracking-wider placeholder:text-[var(--subtle-foreground)] focus:outline-none focus:border-[var(--foreground)] focus:border-opacity-30 transition-all text-[var(--foreground)]"
            />
          </div>
          <button className="bg-[var(--foreground)] text-[var(--background)] px-8 py-3.5 text-[11px] font-bold tracking-widest uppercase hover:opacity-90 transition-all flex items-center justify-center gap-3 whitespace-nowrap">
            <Plus className="w-4 h-4" /> Add Property
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Properties", value: "280", icon: Building2, change: "+12" },
          { label: "WEF Occupancy", value: "68%", icon: TrendingUp, change: "+8%" },
          { label: "Avg. Rate", value: "€14.2k", icon: Sparkles, change: "+15%" },
          { label: "Active Listings", value: "245", icon: Star, change: "+24" },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 group hover:border-[var(--foreground)] hover:border-opacity-20">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-[var(--subtle)] border border-[var(--border)] group-hover:border-[var(--foreground)] group-hover:border-opacity-10 transition-colors">
                <stat.icon className="w-4 h-4 text-[var(--subtle-foreground)] group-hover:text-[var(--foreground)] transition-colors" />
              </div>
              <span className="text-[10px] font-bold tracking-wider text-emerald-500 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[var(--subtle-foreground)] block mb-1">{stat.label}</span>
            <span className="text-2xl font-light text-[var(--foreground)] tracking-tight">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--border)] pb-4">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(i)}
            className={`px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all ${
              activeCategory === i
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--subtle)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="glass-card group overflow-hidden flex flex-col"
          >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden bg-[var(--subtle)]">
              <Image
                src={property.img}
                alt={property.name}
                fill
                className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                {property.featured && (
                  <span className="bg-gold text-black px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </span>
                )}
                <span className={`px-3 py-1.5 text-[9px] font-bold tracking-widest uppercase backdrop-blur-sm ${
                  property.status === "Active"
                    ? "bg-emerald-500/90 text-white"
                    : "bg-amber-500/90 text-white"
                }`}>
                  {property.status}
                </span>
              </div>

              {/* Quick Stats Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-white/90">
                  <span className="flex items-center gap-1.5 text-[11px] font-medium">
                    <Users className="w-3.5 h-3.5" /> {property.capacity}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium">
                    <Bed className="w-3.5 h-3.5" /> {property.rooms}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium">
                    <Bath className="w-3.5 h-3.5" /> {property.bathrooms}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 text-white">
                  <Star className="w-3 h-3 fill-gold text-gold" />
                  <span className="text-[11px] font-bold">{property.rating}</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-light tracking-tight text-[var(--foreground)] mb-1">{property.name}</h3>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--subtle-foreground)]">
                    <MapPin className="w-3 h-3" />
                    <span>{property.location}</span>
                    <span className="text-[var(--border)]">·</span>
                    <span>{property.distance} to Congress</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] mb-0.5">WEF Rate</div>
                  <div className="text-lg font-light text-[var(--foreground)]">{property.wef_price}<span className="text-[10px] text-[var(--subtle-foreground)]">/wk</span></div>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-5">
                {property.amenities.map((amenity, i) => (
                  <span key={i} className="px-3 py-1 bg-[var(--subtle)] text-[10px] font-medium tracking-wider text-[var(--subtle-foreground)]">
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[var(--border)] mt-auto">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)]">Occupancy</span>
                    <span className="text-[11px] font-bold text-[var(--foreground)]">{property.occupancy}%</span>
                  </div>
                  <div className="h-1.5 bg-[var(--subtle)] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        property.occupancy >= 80 ? "bg-emerald-500" :
                        property.occupancy >= 50 ? "bg-gold" : "bg-[var(--subtle-foreground)]"
                      }`}
                      style={{ width: `${property.occupancy}%` }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] block mb-1">Bookings</span>
                  <span className="text-lg font-light text-[var(--foreground)]">{property.bookings}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <button className="p-2.5 text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--subtle)] transition-all" title="View">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--subtle)] transition-all" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--subtle)] transition-all" title="More">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
                <button className="text-[10px] font-bold tracking-widest uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-all flex items-center gap-2 group/btn">
                  View Details <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-8">
        <button className="text-[11px] font-bold tracking-[0.3em] uppercase text-[var(--subtle-foreground)] hover:text-[var(--foreground)] transition-all border border-[var(--border)] hover:border-[var(--foreground)] hover:border-opacity-30 px-10 py-4">
          Load More Properties
        </button>
      </div>

    </div>
  )
}
