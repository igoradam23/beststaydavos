import Link from "next/link"
import Image from "next/image"

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
    distance: "0.3 km",
    description: "Stunning 5-bedroom chalet with panoramic mountain views and private spa.",
    amenities: ["WiFi", "Parking", "Spa", "Fireplace", "Mountain View"],
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800",
    featured: true,
    price: "€15,000",
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
    distance: "0.1 km",
    description: "Modern 2-bedroom apartment steps from the Congress Center.",
    amenities: ["WiFi", "Kitchen", "City View", "24h Concierge"],
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800",
    featured: true,
    price: "€8,000",
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
    distance: "0.5 km",
    description: "Elegant 3-bedroom residence with stunning Alpine panorama.",
    amenities: ["WiFi", "Parking", "Balcony", "Mountain View", "Kitchen"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    featured: false,
    price: "€10,000",
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
    distance: "0.4 km",
    description: "Luxurious penthouse with rooftop terrace and 360° views.",
    amenities: ["WiFi", "Terrace", "Hot Tub", "Mountain View", "Parking"],
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800",
    featured: true,
    price: "€20,000",
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
    distance: "8 km",
    description: "Magnificent 7-bedroom chalet perfect for large delegations.",
    amenities: ["WiFi", "Parking", "Pool", "Spa", "Cinema", "Gym"],
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800",
    featured: false,
    price: "€45,000",
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
    distance: "0.1 km",
    description: "Compact but luxurious studio ideal for solo travelers or couples.",
    amenities: ["WiFi", "Kitchen", "City View"],
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
    featured: false,
    price: "€4,000",
  },
]

export default function AccommodationPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-amber-600">Accommodation</span>
          </h1>
          <p className="text-gray-600 max-w-2xl text-lg">
            Discover our curated collection of luxury properties in Davos and surrounding areas. 
            Each property is carefully selected to meet the highest standards.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-gray-200 bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-gray-500">Filter by:</span>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>All Locations</option>
              <option>Davos Platz</option>
              <option>Davos Dorf</option>
              <option>Klosters</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>Any Guests</option>
              <option>1-2 guests</option>
              <option>3-6 guests</option>
              <option>7-12 guests</option>
              <option>12+ guests</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>Any Bedrooms</option>
              <option>1 bedroom</option>
              <option>2 bedrooms</option>
              <option>3+ bedrooms</option>
              <option>5+ bedrooms</option>
            </select>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{properties.length}</span> properties
            </p>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Distance to Congress</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <Link 
                key={property.id}
                href={`/accommodation/${property.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {property.featured && (
                    <div className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-900 text-xs font-medium px-3 py-1 rounded-full">
                    {property.distance} to Congress
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                    {property.name}
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {property.location} · {property.address}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {property.capacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.rooms}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                      {property.bathrooms}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {amenity}
                      </span>
                    ))}
                    {property.amenities.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{property.amenities.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-xl font-bold text-amber-600">{property.price}</span>
                      <span className="text-sm text-gray-500"> /week</span>
                    </div>
                    <span className="text-amber-600 font-medium text-sm group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Contact us directly and we&apos;ll help you find the perfect accommodation for your needs.
          </p>
          <Link 
            href="/contact"
            className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}
