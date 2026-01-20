import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      company, 
      checkIn, 
      checkOut, 
      guests, 
      specialRequests,
      propertyId,
      propertyName 
    } = body

    // Validate required fields
    if (!name || !email || !checkIn || !checkOut || !guests || !propertyId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if customer exists or create new one
    let customerId: string

    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email.toLowerCase())
      .single()

    if (existingCustomer) {
      customerId = existingCustomer.id
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({
          name,
          email: email.toLowerCase(),
          phone,
          company,
        })
        .select("id")
        .single()

      if (customerError) {
        console.error("Error creating customer:", customerError)
        return NextResponse.json(
          { error: "Failed to create customer" },
          { status: 500 }
        )
      }

      customerId = newCustomer.id
    }

    // Create booking request
    const { data: bookingRequest, error: bookingError } = await supabase
      .from("booking_requests")
      .insert({
        customer_id: customerId,
        property_id: propertyId,
        check_in: checkIn,
        check_out: checkOut,
        guests,
        special_requests: specialRequests,
        status: "new",
        source: "form",
      })
      .select("id")
      .single()

    if (bookingError) {
      console.error("Error creating booking request:", bookingError)
      return NextResponse.json(
        { error: "Failed to create booking request" },
        { status: 500 }
      )
    }

    // Log activity
    await supabase.from("activity_log").insert({
      entity_type: "booking_request",
      entity_id: bookingRequest.id,
      action: "created",
      details: { source: "form", property_name: propertyName },
    })

    // Store message
    await supabase.from("messages").insert({
      customer_id: customerId,
      request_id: bookingRequest.id,
      channel: "form",
      direction: "inbound",
      subject: `Booking Request: ${propertyName}`,
      content: `New booking request from ${name} (${email})

Property: ${propertyName}
Check-in: ${checkIn}
Check-out: ${checkOut}
Guests: ${guests}
${company ? `Company: ${company}` : ""}
${phone ? `Phone: ${phone}` : ""}
${specialRequests ? `Special Requests: ${specialRequests}` : ""}`,
    })

    // Send confirmation email to customer
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "noreply@beststaydavos.ch",
          to: email,
          subject: `Your Booking Request Received - ${propertyName}`,
          html: `
            <h2>Thank you for your interest in ${propertyName}</h2>
            <p>Dear ${name},</p>
            <p>We have received your booking request for:</p>
            <ul>
              <li><strong>Property:</strong> ${propertyName}</li>
              <li><strong>Check-in:</strong> ${checkIn}</li>
              <li><strong>Check-out:</strong> ${checkOut}</li>
              <li><strong>Guests:</strong> ${guests}</li>
            </ul>
            <p>Our team is reviewing your request and will send you a personalized offer within 24 hours.</p>
            <p>Best regards,<br>BestStayDavos Team</p>
          `,
        })
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json({
      success: true,
      requestId: bookingRequest.id,
    })
  } catch (error) {
    console.error("Booking request error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

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
    const limit = parseInt(searchParams.get("limit") || "50")

    let query = supabase
      .from("booking_requests")
      .select(`
        *,
        customer:customers(*),
        property:properties(id, name, slug)
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (status && status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching booking requests:", error)
      return NextResponse.json(
        { error: "Failed to fetch booking requests" },
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
