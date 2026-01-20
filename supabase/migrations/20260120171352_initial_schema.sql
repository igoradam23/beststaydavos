-- BestStayDavos Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROPERTIES
-- ============================================

CREATE TABLE properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    address VARCHAR(500) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Davos',
    rooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    amenities JSONB DEFAULT '[]',
    distance_to_congress DECIMAL(5, 2) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_properties_active ON properties(active);
CREATE INDEX idx_properties_featured ON properties(featured);

-- Property Images
CREATE TABLE property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    url VARCHAR(1000) NOT NULL,
    storage_path VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_property_images_property ON property_images(property_id);

-- Availability
CREATE TABLE availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'blocked', 'maintenance')),
    price_override DECIMAL(12, 2),
    notes TEXT,
    booking_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_availability_property ON availability(property_id);
CREATE INDEX idx_availability_dates ON availability(start_date, end_date);

-- Pricing Rules
CREATE TABLE pricing_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    base_price_per_night DECIMAL(12, 2) NOT NULL,
    wef_multiplier DECIMAL(5, 2) DEFAULT 1.0,
    min_stay INTEGER DEFAULT 1,
    cleaning_fee DECIMAL(12, 2) DEFAULT 0,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_pricing_rules_property ON pricing_rules(property_id);
CREATE INDEX idx_pricing_rules_dates ON pricing_rules(valid_from, valid_to);

-- ============================================
-- CUSTOMERS
-- ============================================

CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    country VARCHAR(100),
    notes TEXT,
    total_bookings INTEGER DEFAULT 0,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE UNIQUE INDEX idx_customers_email ON customers(LOWER(email));

-- ============================================
-- BOOKING REQUESTS
-- ============================================

CREATE TABLE booking_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE RESTRICT,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    guests INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'under_review', 'offer_sent', 'accepted', 'negotiation', 'confirmed', 'completed', 'expired', 'cancelled')),
    special_requests TEXT,
    source VARCHAR(50) DEFAULT 'form' CHECK (source IN ('form', 'email', 'whatsapp', 'phone')),
    assigned_to UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_booking_requests_customer ON booking_requests(customer_id);
CREATE INDEX idx_booking_requests_property ON booking_requests(property_id);
CREATE INDEX idx_booking_requests_status ON booking_requests(status);
CREATE INDEX idx_booking_requests_dates ON booking_requests(check_in, check_out);

-- ============================================
-- OFFERS
-- ============================================

CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL REFERENCES booking_requests(id) ON DELETE CASCADE,
    offer_number VARCHAR(50) NOT NULL UNIQUE,
    total_price DECIMAL(12, 2) NOT NULL,
    breakdown JSONB NOT NULL,
    pdf_url VARCHAR(1000),
    pdf_storage_path VARCHAR(500),
    version INTEGER DEFAULT 1,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'declined', 'expired')),
    notes TEXT,
    sent_at TIMESTAMP WITH TIME ZONE,
    viewed_at TIMESTAMP WITH TIME ZONE,
    responded_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_offers_request ON offers(request_id);
CREATE INDEX idx_offers_status ON offers(status);
CREATE INDEX idx_offers_number ON offers(offer_number);

-- ============================================
-- MESSAGES / COMMUNICATION
-- ============================================

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    request_id UUID REFERENCES booking_requests(id) ON DELETE SET NULL,
    channel VARCHAR(50) NOT NULL CHECK (channel IN ('email', 'whatsapp', 'form')),
    direction VARCHAR(50) NOT NULL CHECK (direction IN ('inbound', 'outbound')),
    subject VARCHAR(500),
    content TEXT NOT NULL,
    attachments JSONB DEFAULT '[]',
    external_id VARCHAR(255),
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_messages_customer ON messages(customer_id);
CREATE INDEX idx_messages_request ON messages(request_id);
CREATE INDEX idx_messages_channel ON messages(channel);
CREATE INDEX idx_messages_unread ON messages(read_at) WHERE read_at IS NULL;

-- Message Templates
CREATE TABLE message_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    body TEXT NOT NULL,
    channel VARCHAR(50) NOT NULL CHECK (channel IN ('email', 'whatsapp')),
    variables JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- ============================================
-- ACTIVITY LOG
-- ============================================

CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    action VARCHAR(100) NOT NULL,
    actor_id UUID,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_activity_log_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at DESC);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to relevant tables
CREATE TRIGGER update_properties_updated_at
    BEFORE UPDATE ON properties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
    BEFORE UPDATE ON customers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_booking_requests_updated_at
    BEFORE UPDATE ON booking_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_message_templates_updated_at
    BEFORE UPDATE ON message_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Public read access for properties (for the website)
CREATE POLICY "Public can view active properties"
    ON properties FOR SELECT
    USING (active = true);

CREATE POLICY "Public can view property images"
    ON property_images FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM properties 
        WHERE properties.id = property_images.property_id 
        AND properties.active = true
    ));

-- Authenticated users (admin) have full access
CREATE POLICY "Authenticated users have full access to properties"
    ON properties FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to property_images"
    ON property_images FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to availability"
    ON availability FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to pricing_rules"
    ON pricing_rules FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to customers"
    ON customers FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to booking_requests"
    ON booking_requests FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to offers"
    ON offers FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to messages"
    ON messages FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to message_templates"
    ON message_templates FOR ALL
    USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to activity_log"
    ON activity_log FOR ALL
    USING (auth.role() = 'authenticated');

-- ============================================
-- SAMPLE DATA (for development)
-- ============================================

-- Insert sample message templates
INSERT INTO message_templates (name, subject, body, channel, variables) VALUES
('Booking Confirmation', 'Your Booking Request Received - {{property_name}}', 
'Dear {{customer_name}},

Thank you for your interest in {{property_name}} for your stay during WEF 2026.

We have received your booking request for:
- Check-in: {{check_in}}
- Check-out: {{check_out}}
- Guests: {{guests}}

Our team is reviewing your request and will send you a personalized offer within 24 hours.

Best regards,
BestStayDavos Team', 'email', '["customer_name", "property_name", "check_in", "check_out", "guests"]'),

('Offer Sent', 'Your Personalized Offer - {{property_name}}', 
'Dear {{customer_name}},

Please find attached your personalized offer for {{property_name}}.

Offer Details:
- Property: {{property_name}}
- Check-in: {{check_in}}
- Check-out: {{check_out}}
- Total Price: {{total_price}}
- Valid Until: {{expires_at}}

To accept this offer, please reply to this email or contact us directly.

Best regards,
BestStayDavos Team', 'email', '["customer_name", "property_name", "check_in", "check_out", "total_price", "expires_at"]'),

('WhatsApp Welcome', NULL, 
'Hello {{customer_name}}! 👋

Thank you for contacting BestStayDavos. We specialize in luxury accommodation for WEF.

How can we help you today?', 'whatsapp', '["customer_name"]');
