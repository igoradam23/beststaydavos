import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Font,
} from '@react-pdf/renderer'

// Register fonts (using system fonts for simplicity)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 'bold' },
  ],
})

// Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0,
  },
  // Header
  header: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  headerText: {
    color: '#b8860b',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 3,
  },
  headerSubtext: {
    color: '#b8860b',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    letterSpacing: 2,
  },
  // Title Section
  titleSection: {
    padding: 30,
    paddingBottom: 20,
    borderBottom: '1 solid #e5e5e5',
  },
  propertyType: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  propertyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  // Price Section
  priceSection: {
    backgroundColor: '#f9f6f1',
    padding: 20,
    marginHorizontal: 30,
    marginTop: 20,
    borderRadius: 4,
  },
  priceLabel: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  priceMain: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#b8860b',
  },
  priceDetails: {
    fontSize: 10,
    color: '#666666',
    marginTop: 8,
    lineHeight: 1.6,
  },
  // Address Section
  addressSection: {
    padding: 30,
    paddingTop: 20,
  },
  addressRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  addressLabel: {
    fontSize: 10,
    color: '#666666',
    width: 100,
    textTransform: 'uppercase',
  },
  addressValue: {
    fontSize: 11,
    color: '#1a1a1a',
    flex: 1,
  },
  // Info Grid
  infoSection: {
    padding: 30,
    paddingTop: 0,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
    borderBottom: '2 solid #b8860b',
    paddingBottom: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 11,
    color: '#1a1a1a',
  },
  // Services Section
  servicesSection: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginHorizontal: 30,
    marginBottom: 20,
    borderRadius: 4,
  },
  servicesTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  servicesText: {
    fontSize: 10,
    color: '#666666',
    lineHeight: 1.5,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1a1a',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: '#999999',
    fontSize: 8,
  },
  footerBrand: {
    color: '#b8860b',
    fontSize: 8,
    fontWeight: 'bold',
  },
  // Image Pages
  imagePage: {
    padding: 0,
  },
  imageHeader: {
    backgroundColor: '#1a1a1a',
    padding: 15,
  },
  imageHeaderText: {
    color: '#b8860b',
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 2,
  },
  imageContainer: {
    flex: 1,
    padding: 20,
  },
  propertyImage: {
    width: '100%',
    height: 400,
    objectFit: 'cover',
  },
  imageCaption: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginTop: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    fontSize: 9,
    color: '#999999',
  },
})

// Types
export interface OfferData {
  offerNumber: string
  createdAt: string
  expiresAt: string
  property: {
    name: string
    type: string
    address: string
    city: string
    postalCode: string
    bedrooms: number
    bathrooms: number
    maxGuests: number
    distanceToCongress: string
    parking?: string
    amenities: string[]
  }
  pricing: {
    totalPrice: number
    currency: string
    cleaningFee?: number
    securityDeposit?: number
    vat?: number
    duration: string
  }
  images?: Array<{
    url: string
    caption: string
  }>
  customer?: {
    name: string
    email: string
  }
}

// Format currency
function formatCurrency(amount: number, currency: string = 'CHF'): string {
  return `${currency} ${amount.toLocaleString('de-CH', { minimumFractionDigits: 2 })}`
}

// Cover Page Component
function CoverPage({ data }: { data: OfferData }) {
  const { property, pricing, offerNumber } = data
  
  // Build price details string
  const priceDetails = []
  if (pricing.cleaningFee) {
    priceDetails.push(`+ ${formatCurrency(pricing.cleaningFee)} final cleaning`)
  }
  if (pricing.securityDeposit) {
    priceDetails.push(`+ ${formatCurrency(pricing.securityDeposit)} security deposit`)
  }
  if (pricing.vat) {
    priceDetails.push(`+ ${pricing.vat}% VAT`)
  }

  return (
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>INTERNATIONAL CONFERENCE</Text>
        <Text style={styles.headerSubtext}>JANUARY 2026</Text>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.propertyType}>{property.type} for rent</Text>
        <Text style={styles.propertyName}>{property.name}</Text>
      </View>

      {/* Price */}
      <View style={styles.priceSection}>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.priceMain}>
          {formatCurrency(pricing.totalPrice, pricing.currency)}
        </Text>
        {priceDetails.length > 0 && (
          <Text style={styles.priceDetails}>{priceDetails.join('\n')}</Text>
        )}
      </View>

      {/* Address */}
      <View style={styles.addressSection}>
        <View style={styles.addressRow}>
          <Text style={styles.addressLabel}>Street Address</Text>
          <Text style={styles.addressValue}>{property.address}</Text>
        </View>
        <View style={styles.addressRow}>
          <Text style={styles.addressLabel}>City</Text>
          <Text style={styles.addressValue}>{property.city}</Text>
        </View>
        <View style={styles.addressRow}>
          <Text style={styles.addressLabel}>Postal Code</Text>
          <Text style={styles.addressValue}>{property.postalCode}</Text>
        </View>
      </View>

      {/* Property Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Property Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Distance to Congress</Text>
            <Text style={styles.infoValue}>{property.distanceToCongress}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Maximum Occupancy</Text>
            <Text style={styles.infoValue}>{property.maxGuests} guests</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Bedrooms</Text>
            <Text style={styles.infoValue}>{property.bedrooms}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Bathrooms</Text>
            <Text style={styles.infoValue}>{property.bathrooms}</Text>
          </View>
          {property.parking && (
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Parking</Text>
              <Text style={styles.infoValue}>{property.parking}</Text>
            </View>
          )}
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Duration</Text>
            <Text style={styles.infoValue}>{pricing.duration}</Text>
          </View>
        </View>
      </View>

      {/* Services */}
      {property.amenities.length > 0 && (
        <View style={styles.servicesSection}>
          <Text style={styles.servicesTitle}>Services Included</Text>
          <Text style={styles.servicesText}>
            {property.amenities.join(', ')}
          </Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Offer #{offerNumber}</Text>
        <Text style={styles.footerBrand}>BestStayDavos</Text>
        <Text style={styles.footerText}>Page 1</Text>
      </View>
    </Page>
  )
}

// Image Page Component
function ImagePage({ 
  image, 
  pageNumber, 
  totalPages 
}: { 
  image: { url: string; caption: string }
  pageNumber: number
  totalPages: number
}) {
  return (
    <Page size="A4" style={[styles.page, styles.imagePage]}>
      {/* Header */}
      <View style={styles.imageHeader}>
        <Text style={styles.imageHeaderText}>INTERNATIONAL CONFERENCE · JANUARY 2026</Text>
      </View>

      {/* Image */}
      <View style={styles.imageContainer}>
        <Image src={image.url} style={styles.propertyImage} />
        <Text style={styles.imageCaption}>{image.caption}</Text>
      </View>

      {/* Page Number */}
      <Text style={styles.pageNumber}>
        Page {pageNumber} / {totalPages}
      </Text>
    </Page>
  )
}

// Main Document Component
export function OfferDocument({ data }: { data: OfferData }) {
  const totalPages = 1 + (data.images?.length || 0)

  return (
    <Document
      title={`Offer ${data.offerNumber} - ${data.property.name}`}
      author="BestStayDavos"
      subject={`Accommodation Offer for ${data.property.name}`}
      keywords="WEF, Davos, accommodation, luxury, rental"
    >
      {/* Cover Page */}
      <CoverPage data={data} />

      {/* Image Pages */}
      {data.images?.map((image, index) => (
        <ImagePage
          key={index}
          image={image}
          pageNumber={index + 2}
          totalPages={totalPages}
        />
      ))}
    </Document>
  )
}

// Helper function to generate offer data from database records
export function createOfferData(
  property: {
    name: string
    property_type?: string
    address: string
    city: string
    rooms: number
    bathrooms: number
    capacity: number
    distance_to_congress: number
    amenities?: string[]
    cleaning_fee?: number
    security_deposit?: number
  },
  pricing: {
    wef_price: number
    currency?: string
  },
  offerDetails: {
    offerNumber: string
    expiresAt: string
    duration?: string
    vat?: number
  },
  images?: Array<{ url: string; caption: string }>
): OfferData {
  // Extract postal code from address or city
  const postalMatch = property.address.match(/\b(7\d{3})\b/) || property.city.match(/\b(7\d{3})\b/)
  const postalCode = postalMatch ? `CH-${postalMatch[1]}` : 'CH-7270'

  // Clean address (remove postal code and city if included)
  const cleanAddress = property.address
    .replace(/,?\s*7\d{3}\s+\w+.*$/i, '')
    .replace(/\n/g, ', ')
    .trim()

  // Format distance
  const distanceKm = property.distance_to_congress
  const distanceStr = distanceKm < 1 
    ? `${Math.round(distanceKm * 1000)} m` 
    : `${distanceKm.toFixed(1)} km`

  // Default amenities
  const defaultAmenities = [
    'Electricity',
    'Heating', 
    'WiFi',
    'Bedding',
    'Towels'
  ]

  return {
    offerNumber: offerDetails.offerNumber,
    createdAt: new Date().toISOString(),
    expiresAt: offerDetails.expiresAt,
    property: {
      name: property.name,
      type: (property.property_type || 'apartment').replace('_', ' '),
      address: cleanAddress,
      city: property.city,
      postalCode,
      bedrooms: property.rooms,
      bathrooms: property.bathrooms,
      maxGuests: property.capacity,
      distanceToCongress: distanceStr,
      parking: 'Available upon request',
      amenities: property.amenities?.length ? property.amenities : defaultAmenities,
    },
    pricing: {
      totalPrice: pricing.wef_price,
      currency: pricing.currency || 'CHF',
      cleaningFee: property.cleaning_fee || undefined,
      securityDeposit: property.security_deposit || undefined,
      vat: offerDetails.vat,
      duration: offerDetails.duration || 'max. 7 nights',
    },
    images,
  }
}

export default OfferDocument
