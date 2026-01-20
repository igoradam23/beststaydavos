import { NextRequest, NextResponse } from 'next/server'

// Types
interface PropertyData {
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
}

interface PricingData {
  wef_price: number
  currency?: string
}

interface OfferDetails {
  offerNumber: string
  expiresAt: string
  duration?: string
  vat?: number
}

// Generate unique offer number
function generateOfferNumber(): string {
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `BSD-${year}${month}-${random}`
}

// Format currency
function formatCurrency(amount: number, currency: string = 'CHF'): string {
  return `${currency} ${amount.toLocaleString('de-CH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

// Format distance
function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`
  }
  return `${distanceKm.toFixed(1)} km`
}

// Extract postal code from address
function extractPostalCode(address: string, city: string): string {
  const match = address.match(/\b(7\d{3})\b/) || city.match(/\b(7\d{3})\b/)
  return match ? `CH-${match[1]}` : 'CH-7270'
}

// Clean address
function cleanAddress(address: string): string {
  return address
    .replace(/,?\s*7\d{3}\s+\w+.*$/i, '')
    .replace(/\n/g, ', ')
    .trim()
}

// Generate PDF buffer using PDFKit with proper font handling
async function generatePDF(
  property: PropertyData,
  pricing: PricingData,
  offerDetails: OfferDetails
): Promise<Buffer> {
  // Dynamic import to avoid issues with Next.js bundling
  const PDFDocument = (await import('pdfkit')).default
  
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 0,
        autoFirstPage: true,
        bufferPages: true,
        info: {
          Title: `Offer ${offerDetails.offerNumber} - ${property.name}`,
          Author: 'BestStayDavos',
          Subject: `Accommodation Offer for ${property.name}`,
        },
      })

      const chunks: Buffer[] = []
      doc.on('data', (chunk: Buffer) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      // Colors
      const gold = '#b8860b'
      const charcoal = '#1a1a1a'
      const gray = '#666666'
      const lightBg = '#f9f6f1'

      // Page dimensions
      const pageWidth = 595.28
      const pageHeight = 841.89
      const margin = 40

      // ========== HEADER ==========
      doc.rect(0, 0, pageWidth, 80).fill(charcoal)
      
      doc.fillColor(gold)
        .fontSize(14)
        .text('INTERNATIONAL CONFERENCE', 0, 28, { align: 'center', width: pageWidth })
      
      doc.fontSize(12)
        .text('JANUARY 2026', 0, 48, { align: 'center', width: pageWidth })

      // ========== PROPERTY TITLE ==========
      let y = 100

      doc.fillColor(gray)
        .fontSize(11)
        .text(`${(property.property_type || 'Apartment').replace('_', ' ').toUpperCase()} FOR RENT`, margin, y)

      y += 25
      doc.fillColor(charcoal)
        .fontSize(24)
        .text(property.name, margin, y)

      // ========== PRICE BOX ==========
      y += 50
      const priceBoxHeight = 90
      doc.rect(margin, y, pageWidth - margin * 2, priceBoxHeight).fill(lightBg)

      doc.fillColor(gray)
        .fontSize(10)
        .text('PRICE', margin + 20, y + 15)

      doc.fillColor(gold)
        .fontSize(28)
        .text(formatCurrency(pricing.wef_price, pricing.currency || 'CHF'), margin + 20, y + 32)

      // Price details
      const priceDetails: string[] = []
      if (property.cleaning_fee) {
        priceDetails.push(`+ ${formatCurrency(property.cleaning_fee)} final cleaning`)
      }
      if (property.security_deposit) {
        priceDetails.push(`+ ${formatCurrency(property.security_deposit)} security deposit`)
      }
      if (offerDetails.vat) {
        priceDetails.push(`+ ${offerDetails.vat}% VAT`)
      }

      if (priceDetails.length > 0) {
        doc.fillColor(gray)
          .fontSize(10)
          .text(priceDetails.join('  |  '), margin + 20, y + 65)
      }

      // ========== ADDRESS SECTION ==========
      y += priceBoxHeight + 30

      const addressData = [
        ['Street Address', cleanAddress(property.address)],
        ['City', property.city],
        ['Postal Code', extractPostalCode(property.address, property.city)],
      ]

      addressData.forEach(([label, value]) => {
        doc.fillColor(gray)
          .fontSize(9)
          .text(label.toUpperCase(), margin, y, { width: 100 })
        
        doc.fillColor(charcoal)
          .fontSize(11)
          .text(value, margin + 110, y)
        
        y += 22
      })

      // ========== PROPERTY INFO ==========
      y += 20
      
      // Section title with gold underline
      doc.fillColor(charcoal)
        .fontSize(14)
        .text('Property Information', margin, y)
      
      y += 20
      doc.strokeColor(gold).lineWidth(2).moveTo(margin, y).lineTo(margin + 180, y).stroke()
      
      y += 20

      // Info grid (2 columns)
      const infoData = [
        ['Distance to Congress', formatDistance(property.distance_to_congress)],
        ['Maximum Occupancy', `${property.capacity} guests`],
        ['Bedrooms', property.rooms.toString()],
        ['Bathrooms', property.bathrooms.toString()],
        ['Duration', offerDetails.duration || 'max. 7 nights'],
        ['Parking', 'Available upon request'],
      ]

      const colWidth = (pageWidth - margin * 2) / 2
      infoData.forEach(([label, value], index) => {
        const col = index % 2
        const row = Math.floor(index / 2)
        const xPos = margin + col * colWidth
        const yPos = y + row * 40

        doc.fillColor(gray)
          .fontSize(9)
          .text(label.toUpperCase(), xPos, yPos)
        
        doc.fillColor(charcoal)
          .fontSize(11)
          .text(value, xPos, yPos + 14)
      })

      y += Math.ceil(infoData.length / 2) * 40 + 20

      // ========== SERVICES SECTION ==========
      const defaultAmenities = ['Electricity', 'Heating', 'WiFi', 'Bedding', 'Towels']
      const amenities = property.amenities?.length ? property.amenities : defaultAmenities

      doc.rect(margin, y, pageWidth - margin * 2, 60).fill('#f5f5f5')

      doc.fillColor(charcoal)
        .fontSize(10)
        .text('SERVICES INCLUDED', margin + 15, y + 15)

      doc.fillColor(gray)
        .fontSize(10)
        .text(amenities.join(', '), margin + 15, y + 32, { width: pageWidth - margin * 2 - 30 })

      // ========== FOOTER ==========
      doc.rect(0, pageHeight - 40, pageWidth, 40).fill(charcoal)

      doc.fillColor(gray)
        .fontSize(8)
        .text(`Offer #${offerDetails.offerNumber}`, margin, pageHeight - 26)

      doc.fillColor(gold)
        .fontSize(8)
        .text('BestStayDavos', 0, pageHeight - 26, { align: 'center', width: pageWidth })

      doc.fillColor(gray)
        .fontSize(8)
        .text('Page 1', pageWidth - margin - 40, pageHeight - 26)

      // Finalize
      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

// POST /api/offers/generate-pdf
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { property, pricing, offerNumber, expiresAt, duration, vat } = body

    if (!property || !pricing) {
      return NextResponse.json(
        { error: 'Property and pricing data are required' },
        { status: 400 }
      )
    }

    const offerDetails: OfferDetails = {
      offerNumber: offerNumber || generateOfferNumber(),
      expiresAt: expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      duration: duration || 'max. 7 nights',
      vat: vat,
    }

    const pdfBuffer = await generatePDF(property, pricing, offerDetails)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Offer-${offerDetails.offerNumber}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF offer', details: String(error) },
      { status: 500 }
    )
  }
}

// GET /api/offers/generate-pdf - Preview endpoint
export async function GET() {
  try {
    const sampleProperty: PropertyData = {
      name: '3-Bedroom Apartment Talstrasse',
      property_type: 'apartment',
      address: 'Talstrasse 66',
      city: 'Davos Platz',
      rooms: 3,
      bathrooms: 1,
      capacity: 4,
      distance_to_congress: 0.65,
      amenities: ['Electricity', 'Heating', 'WiFi', 'Bedding', 'Towels', 'Kitchen'],
      cleaning_fee: 650,
      security_deposit: 2000,
    }

    const samplePricing: PricingData = {
      wef_price: 38000,
      currency: 'CHF',
    }

    const offerDetails: OfferDetails = {
      offerNumber: generateOfferNumber(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 'max. 7 nights',
    }

    const pdfBuffer = await generatePDF(sampleProperty, samplePricing, offerDetails)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="Preview-${offerDetails.offerNumber}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating preview PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate preview PDF', details: String(error) },
      { status: 500 }
    )
  }
}

// Configure for edge runtime which handles fonts better
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
