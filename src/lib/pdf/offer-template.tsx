import React from "react"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer"
import { formatCurrency, formatDate } from "@/lib/utils"

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#333",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: "#B8860B",
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  logoAccent: {
    color: "#B8860B",
  },
  offerInfo: {
    textAlign: "right",
  },
  offerNumber: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#B8860B",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
  },
  label: {
    width: 120,
    color: "#666",
  },
  value: {
    flex: 1,
    fontWeight: "bold",
  },
  propertySection: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginBottom: 20,
    borderRadius: 4,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  propertyAddress: {
    color: "#666",
    marginBottom: 15,
  },
  amenitiesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  amenity: {
    backgroundColor: "#e5e5e5",
    padding: "4 8",
    borderRadius: 4,
    fontSize: 9,
  },
  pricingSection: {
    borderWidth: 1,
    borderColor: "#B8860B",
    padding: 20,
    marginBottom: 20,
  },
  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pricingTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: "#B8860B",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#B8860B",
  },
  terms: {
    fontSize: 8,
    color: "#666",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: "#999",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  expiryNotice: {
    backgroundColor: "#FFF3CD",
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  expiryText: {
    color: "#856404",
    fontSize: 9,
    textAlign: "center",
  },
})

export interface OfferPDFData {
  offerNumber: string
  createdAt: string
  expiresAt: string
  customer: {
    name: string
    email: string
    company?: string
  }
  property: {
    name: string
    address: string
    rooms: number
    bathrooms: number
    capacity: number
    amenities: string[]
    distanceToCongress: number
  }
  booking: {
    checkIn: string
    checkOut: string
    guests: number
  }
  pricing: {
    nights: number
    pricePerNight: number
    subtotal: number
    cleaningFee: number
    additionalFees: { name: string; amount: number }[]
    total: number
  }
}

export function OfferPDF({ data }: { data: OfferPDFData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>
              BestStay<Text style={styles.logoAccent}>Davos</Text>
            </Text>
            <Text style={{ color: "#666", marginTop: 4 }}>
              Luxury Accommodation for WEF
            </Text>
          </View>
          <View style={styles.offerInfo}>
            <Text style={styles.offerNumber}>Offer #{data.offerNumber}</Text>
            <Text>Date: {formatDate(data.createdAt)}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Accommodation Offer</Text>

        {/* Expiry Notice */}
        <View style={styles.expiryNotice}>
          <Text style={styles.expiryText}>
            This offer is valid until {formatDate(data.expiresAt)}. Please respond before the expiry date to secure your booking.
          </Text>
        </View>

        {/* Customer Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guest Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{data.customer.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{data.customer.email}</Text>
          </View>
          {data.customer.company && (
            <View style={styles.row}>
              <Text style={styles.label}>Company:</Text>
              <Text style={styles.value}>{data.customer.company}</Text>
            </View>
          )}
        </View>

        {/* Property Details */}
        <View style={styles.propertySection}>
          <Text style={styles.propertyName}>{data.property.name}</Text>
          <Text style={styles.propertyAddress}>{data.property.address}</Text>
          
          <View style={{ flexDirection: "row", marginBottom: 15 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#666" }}>Bedrooms</Text>
              <Text style={{ fontWeight: "bold" }}>{data.property.rooms}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#666" }}>Bathrooms</Text>
              <Text style={{ fontWeight: "bold" }}>{data.property.bathrooms}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#666" }}>Capacity</Text>
              <Text style={{ fontWeight: "bold" }}>Up to {data.property.capacity}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#666" }}>To Congress</Text>
              <Text style={{ fontWeight: "bold" }}>{data.property.distanceToCongress}km</Text>
            </View>
          </View>

          <Text style={{ color: "#666", marginBottom: 8 }}>Amenities:</Text>
          <View style={styles.amenitiesList}>
            {data.property.amenities.slice(0, 8).map((amenity, index) => (
              <Text key={index} style={styles.amenity}>
                {amenity}
              </Text>
            ))}
          </View>
        </View>

        {/* Booking Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Check-in:</Text>
            <Text style={styles.value}>{formatDate(data.booking.checkIn)} (from 15:00)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Check-out:</Text>
            <Text style={styles.value}>{formatDate(data.booking.checkOut)} (by 11:00)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Duration:</Text>
            <Text style={styles.value}>{data.pricing.nights} nights</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Guests:</Text>
            <Text style={styles.value}>{data.booking.guests}</Text>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.pricingSection}>
          <Text style={styles.sectionTitle}>Price Summary</Text>
          
          <View style={styles.pricingRow}>
            <Text>Accommodation ({data.pricing.nights} nights x {formatCurrency(data.pricing.pricePerNight)})</Text>
            <Text>{formatCurrency(data.pricing.subtotal)}</Text>
          </View>
          
          <View style={styles.pricingRow}>
            <Text>Cleaning fee</Text>
            <Text>{formatCurrency(data.pricing.cleaningFee)}</Text>
          </View>

          {data.pricing.additionalFees.map((fee, index) => (
            <View key={index} style={styles.pricingRow}>
              <Text>{fee.name}</Text>
              <Text>{formatCurrency(fee.amount)}</Text>
            </View>
          ))}

          <View style={styles.pricingTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(data.pricing.total)}</Text>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.terms}>
          <Text style={{ fontWeight: "bold", marginBottom: 6 }}>Terms & Conditions:</Text>
          <Text>• A 50% deposit is required to confirm the booking.</Text>
          <Text>• The remaining balance is due 30 days before check-in.</Text>
          <Text>• Cancellation within 60 days of check-in: 50% refund.</Text>
          <Text>• Cancellation within 30 days of check-in: No refund.</Text>
          <Text>• Prices are in EUR and include all taxes.</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>BestStayDavos | Davos, Switzerland</Text>
          <Text>info@beststaydavos.ch | +41 00 000 00 00</Text>
          <Text>www.beststaydavos.ch</Text>
        </View>
      </Page>
    </Document>
  )
}
