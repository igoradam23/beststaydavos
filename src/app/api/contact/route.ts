import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
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

    // Store message
    const { error: messageError } = await supabase.from("messages").insert({
      customer_id: customerId,
      channel: "form",
      direction: "inbound",
      subject: `Contact Form: ${subject}`,
      content: message,
    })

    if (messageError) {
      console.error("Error storing message:", messageError)
      return NextResponse.json(
        { error: "Failed to store message" },
        { status: 500 }
      )
    }

    // Send notification email to admin
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "noreply@beststaydavos.ch",
          to: process.env.RESEND_FROM_EMAIL || "info@beststaydavos.ch",
          subject: `New Contact Form: ${subject}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p><strong>Subject:</strong> ${subject}</p>
            <hr>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        })
      } catch (emailError) {
        console.error("Error sending notification email:", emailError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
