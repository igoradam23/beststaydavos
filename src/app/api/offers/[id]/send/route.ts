import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    // Check authentication
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get offer with related data
    const { data: offer, error: offerError } = await supabase
      .from("offers")
      .select(`
        *,
        request:booking_requests(
          *,
          customer:customers(*),
          property:properties(*)
        )
      `)
      .eq("id", id)
      .single()

    if (offerError || !offer) {
      return NextResponse.json(
        { error: "Offer not found" },
        { status: 404 }
      )
    }

    const customer = offer.request.customer
    const property = offer.request.property
    const breakdown = offer.breakdown as {
      nights: number
      price_per_night: number
      subtotal: number
      cleaning_fee: number
      total: number
    }

    // Send email
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "noreply@beststaydavos.ch",
          to: customer.email,
          subject: `Your Personalized Offer - ${property.name}`,
          html: `
            <h2>Your Personalized Offer for ${property.name}</h2>
            <p>Dear ${customer.name},</p>
            <p>Thank you for your interest in ${property.name}. Please find below your personalized offer:</p>
            
            <h3>Offer Details</h3>
            <ul>
              <li><strong>Offer Number:</strong> ${offer.offer_number}</li>
              <li><strong>Property:</strong> ${property.name}</li>
              <li><strong>Check-in:</strong> ${offer.request.check_in}</li>
              <li><strong>Check-out:</strong> ${offer.request.check_out}</li>
              <li><strong>Guests:</strong> ${offer.request.guests}</li>
            </ul>
            
            <h3>Price Summary</h3>
            <ul>
              <li>Accommodation (${breakdown.nights} nights): €${breakdown.subtotal.toLocaleString()}</li>
              <li>Cleaning fee: €${breakdown.cleaning_fee.toLocaleString()}</li>
              <li><strong>Total: €${breakdown.total.toLocaleString()}</strong></li>
            </ul>
            
            <p><strong>This offer is valid until ${new Date(offer.expires_at).toLocaleDateString()}.</strong></p>
            
            <p>To accept this offer or if you have any questions, please reply to this email or contact us directly.</p>
            
            <p>Best regards,<br>BestStayDavos Team</p>
          `,
        })
      } catch (emailError) {
        console.error("Error sending email:", emailError)
        return NextResponse.json(
          { error: "Failed to send email" },
          { status: 500 }
        )
      }
    }

    // Update offer status
    await supabase
      .from("offers")
      .update({
        status: "sent",
        sent_at: new Date().toISOString(),
      })
      .eq("id", id)

    // Update booking request status
    await supabase
      .from("booking_requests")
      .update({ status: "offer_sent" })
      .eq("id", offer.request_id)

    // Store message
    await supabase.from("messages").insert({
      customer_id: customer.id,
      request_id: offer.request_id,
      channel: "email",
      direction: "outbound",
      subject: `Offer Sent: ${property.name}`,
      content: `Sent offer ${offer.offer_number} for ${property.name}. Total: €${breakdown.total.toLocaleString()}`,
    })

    // Log activity
    await supabase.from("activity_log").insert({
      entity_type: "offer",
      entity_id: id,
      action: "sent",
      actor_id: user.id,
      details: { 
        offer_number: offer.offer_number,
        sent_to: customer.email,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
