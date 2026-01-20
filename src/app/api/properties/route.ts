import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    
    const featured = searchParams.get("featured")
    const active = searchParams.get("active")
    const limit = parseInt(searchParams.get("limit") || "50")
    const city = searchParams.get("city")

    let query = supabase
      .from("properties")
      .select(`
        *,
        images:property_images(id, url, alt_text, is_primary, display_order),
        pricing:pricing_rules(id, base_price_per_night, wef_multiplier, min_stay, cleaning_fee, valid_from, valid_to)
      `)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(limit)

    if (featured === "true") {
      query = query.eq("featured", true)
    }

    if (active !== "false") {
      query = query.eq("active", true)
    }

    if (city) {
      query = query.eq("city", city)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching properties:", error)
      return NextResponse.json(
        { error: "Failed to fetch properties" },
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
      name,
      slug,
      address,
      city,
      rooms,
      bathrooms,
      capacity,
      amenities,
      distance_to_congress,
      description,
      short_description,
      featured,
      active,
    } = body

    // Validate required fields
    if (!name || !slug || !address || !rooms || !bathrooms || !capacity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if slug is unique
    const { data: existingProperty } = await supabase
      .from("properties")
      .select("id")
      .eq("slug", slug)
      .single()

    if (existingProperty) {
      return NextResponse.json(
        { error: "A property with this slug already exists" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("properties")
      .insert({
        name,
        slug,
        address,
        city: city || "Davos",
        rooms,
        bathrooms,
        capacity,
        amenities: amenities || [],
        distance_to_congress: distance_to_congress || 0,
        description,
        short_description,
        featured: featured || false,
        active: active !== false,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating property:", error)
      return NextResponse.json(
        { error: "Failed to create property" },
        { status: 500 }
      )
    }

    // Log activity
    await supabase.from("activity_log").insert({
      entity_type: "property",
      entity_id: data.id,
      action: "created",
      actor_id: user.id,
      details: { name },
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
