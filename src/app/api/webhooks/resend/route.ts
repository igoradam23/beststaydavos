import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Resend webhook for tracking email events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    const supabase = await createClient()

    // Log the webhook event
    console.log("Resend webhook received:", type, data)

    switch (type) {
      case "email.delivered":
        // Email was successfully delivered
        await supabase.from("activity_log").insert({
          entity_type: "email",
          entity_id: data.email_id,
          action: "delivered",
          details: {
            to: data.to,
            subject: data.subject,
          },
        })
        break

      case "email.opened":
        // Email was opened - could update offer status to "viewed"
        if (data.tags?.offer_id) {
          await supabase
            .from("offers")
            .update({
              status: "viewed",
              viewed_at: new Date().toISOString(),
            })
            .eq("id", data.tags.offer_id)
            .eq("status", "sent") // Only update if currently "sent"
        }
        break

      case "email.clicked":
        // Link in email was clicked
        await supabase.from("activity_log").insert({
          entity_type: "email",
          entity_id: data.email_id,
          action: "link_clicked",
          details: {
            link: data.link,
          },
        })
        break

      case "email.bounced":
        // Email bounced - log for follow-up
        await supabase.from("activity_log").insert({
          entity_type: "email",
          entity_id: data.email_id,
          action: "bounced",
          details: {
            to: data.to,
            reason: data.bounce?.message,
          },
        })
        break

      case "email.complained":
        // Spam complaint
        await supabase.from("activity_log").insert({
          entity_type: "email",
          entity_id: data.email_id,
          action: "spam_complaint",
          details: {
            to: data.to,
          },
        })
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Resend webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
