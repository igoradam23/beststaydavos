import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// WhatsApp Cloud API webhook verification
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  // Verify the webhook
  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("WhatsApp webhook verified")
    return new NextResponse(challenge, { status: 200 })
  }

  return NextResponse.json({ error: "Verification failed" }, { status: 403 })
}

// Handle incoming WhatsApp messages
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // WhatsApp sends a specific structure
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const value = changes?.value

    if (!value) {
      return NextResponse.json({ received: true })
    }

    const supabase = await createClient()

    // Handle incoming messages
    if (value.messages) {
      for (const message of value.messages) {
        const from = message.from // Phone number
        const messageId = message.id
        const timestamp = message.timestamp
        const type = message.type
        let content = ""

        switch (type) {
          case "text":
            content = message.text?.body || ""
            break
          case "image":
          case "document":
          case "video":
            content = `[${type.toUpperCase()}] ${message[type]?.caption || "Media attachment"}`
            break
          default:
            content = `[${type.toUpperCase()}] Unsupported message type`
        }

        // Find customer by phone number
        const { data: customer } = await supabase
          .from("customers")
          .select("id")
          .eq("phone", from)
          .single()

        if (customer) {
          // Store the message
          await supabase.from("messages").insert({
            customer_id: customer.id,
            channel: "whatsapp",
            direction: "inbound",
            content,
            external_id: messageId,
          })

          // Log activity
          await supabase.from("activity_log").insert({
            entity_type: "message",
            entity_id: messageId,
            action: "whatsapp_received",
            details: {
              from,
              type,
            },
          })
        } else {
          // Unknown sender - create a new customer
          const { data: newCustomer } = await supabase
            .from("customers")
            .insert({
              name: "WhatsApp User",
              email: `whatsapp_${from}@placeholder.com`,
              phone: from,
            })
            .select("id")
            .single()

          if (newCustomer) {
            await supabase.from("messages").insert({
              customer_id: newCustomer.id,
              channel: "whatsapp",
              direction: "inbound",
              content,
              external_id: messageId,
            })
          }
        }
      }
    }

    // Handle message status updates
    if (value.statuses) {
      for (const status of value.statuses) {
        const messageId = status.id
        const statusType = status.status // sent, delivered, read, failed

        await supabase.from("activity_log").insert({
          entity_type: "whatsapp_message",
          entity_id: messageId,
          action: `status_${statusType}`,
          details: {
            recipient: status.recipient_id,
            timestamp: status.timestamp,
          },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("WhatsApp webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
