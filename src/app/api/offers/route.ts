import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateOfferNumber, calculateNights } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const requestId = searchParams.get("requestId")
    const limit = parseInt(searchParams.get("limit") || "50")

    let query = supabase
      .from("offers")
      .select(`
        *,
        request:booking_requests(
          *,
          customer:customers(*),
          property:properties(id, name, slug, address)
        )
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    if (requestId) {
      query = query.eq("request_id", requestId)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching offers:", error)
      return NextResponse.json(
        { error: "Failed to fetch offers" },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      requestId,
      pricePerNight,
      cleaningFee = 0,
      additionalFees = [],
      notes,
      expiresInDays = 7,
    } = body

    // Validate required fields
    if (!requestId || !pricePerNight) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Get the booking request details
    const { data: bookingRequest, error: requestError } = await supabase
      .from("booking_requests")
      .select(`
        *,
        customer:customers(*),
        property:properties(*)
      `)
      .eq("id", requestId)
      .single()

    if (requestError || !bookingRequest) {
      return NextResponse.json(
        { error: "Booking request not found" },
        { status: 404 }
      )
    }

    // Calculate pricing
    const checkIn = new Date(bookingRequest.check_in)
    const checkOut = new Date(bookingRequest.check_out)
    const nights = calculateNights(checkIn, checkOut)
    const subtotal = nights * pricePerNight
    const additionalTotal = additionalFees.reduce(
      (sum: number, fee: { amount: number }) => sum + fee.amount,
      0
    )
    const total = subtotal + cleaningFee + additionalTotal

    // Get existing offer count for versioning
    const { count: existingOffers } = await supabase
      .from("offers")
      .select("*", { count: "exact", head: true })
      .eq("request_id", requestId)

    const version = (existingOffers || 0) + 1

    // Generate offer
    const offerNumber = generateOfferNumber()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + expiresInDays)

    const breakdown = {
      nights,
      price_per_night: pricePerNight,
      subtotal,
      cleaning_fee: cleaningFee,
      additional_fees: additionalFees,
      total,
    }

    // Create offer
    const { data: offer, error: offerError } = await supabase
      .from("offers")
      .insert({
        request_id: requestId,
        offer_number: offerNumber,
        total_price: total,
        breakdown,
        version,
        expires_at: expiresAt.toISOString(),
        status: "draft",
        notes,
      })
      .select()
      .single()

    if (offerError) {
      console.error("Error creating offer:", offerError)
      return NextResponse.json(
        { error: "Failed to create offer" },
        { status: 500 }
      )
    }

    // Update booking request status
    await supabase
      .from("booking_requests")
      .update({ status: "under_review" })
      .eq("id", requestId)

    // Log activity
    await supabase.from("activity_log").insert({
      entity_type: "offer",
      entity_id: offer.id,
      action: "created",
      actor_id: user.id,
      details: { 
        offer_number: offerNumber,
        total_price: total,
        version,
      },
    })

    return NextResponse.json(offer)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
