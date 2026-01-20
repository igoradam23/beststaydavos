export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type PropertyStatus = "available" | "booked" | "blocked" | "maintenance"
export type BookingStatus = "new" | "under_review" | "offer_sent" | "accepted" | "negotiation" | "confirmed" | "completed" | "expired" | "cancelled"
export type OfferStatus = "draft" | "sent" | "viewed" | "accepted" | "declined" | "expired"
export type MessageChannel = "email" | "whatsapp" | "form"
export type MessageDirection = "inbound" | "outbound"

export interface Property {
  id: string
  name: string
  address: string
  city: string
  rooms: number
  bathrooms: number
  capacity: number
  amenities: string[]
  distance_to_congress: number
  description: string
  short_description: string
  featured: boolean
  active: boolean
  created_at: string
  updated_at: string
}

export interface PropertyImage {
  id: string
  property_id: string
  url: string
  order: number
  alt_text: string
  is_primary: boolean
  created_at: string
}

export interface Availability {
  id: string
  property_id: string
  start_date: string
  end_date: string
  status: PropertyStatus
  price_override: number | null
  notes: string | null
  created_at: string
}

export interface PricingRule {
  id: string
  property_id: string
  name: string
  base_price_per_night: number
  wef_multiplier: number
  min_stay: number
  cleaning_fee: number
  valid_from: string
  valid_to: string
  created_at: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  country: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface BookingRequest {
  id: string
  customer_id: string
  property_id: string
  check_in: string
  check_out: string
  guests: number
  status: BookingStatus
  special_requests: string | null
  source: MessageChannel
  created_at: string
  updated_at: string
  // Joined data
  customer?: Customer
  property?: Property
}

export interface Offer {
  id: string
  request_id: string
  offer_number: string
  total_price: number
  breakdown: OfferBreakdown
  pdf_url: string | null
  version: number
  expires_at: string
  status: OfferStatus
  notes: string | null
  created_at: string
  // Joined data
  request?: BookingRequest
}

export interface OfferBreakdown {
  nights: number
  price_per_night: number
  subtotal: number
  cleaning_fee: number
  additional_fees: { name: string; amount: number }[]
  total: number
}

export interface Message {
  id: string
  customer_id: string
  request_id: string | null
  channel: MessageChannel
  direction: MessageDirection
  subject: string | null
  content: string
  attachments: string[]
  read_at: string | null
  created_at: string
  // Joined data
  customer?: Customer
}

export interface MessageTemplate {
  id: string
  name: string
  subject: string
  body: string
  channel: MessageChannel
  variables: string[]
  created_at: string
}

// Dashboard statistics
export interface DashboardStats {
  pending_requests: number
  offers_sent: number
  confirmed_bookings: number
  revenue_this_month: number
  occupancy_rate: number
  unread_messages: number
}

// Form types
export interface BookingRequestFormData {
  name: string
  email: string
  phone?: string
  company?: string
  country?: string
  property_id: string
  check_in: string
  check_out: string
  guests: number
  special_requests?: string
}
