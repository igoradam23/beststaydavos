# BestStayDavos - Luxury Accommodation Platform

A modern, full-stack web application for managing luxury accommodation rentals in Davos, Switzerland, specifically tailored for World Economic Forum (WEF) guests.

## Features

### Public Website
- **Property Listings**: SEO-optimized property pages with detailed information
- **Booking Request Form**: Streamlined inquiry process for potential guests
- **Contact Form**: General inquiries and support
- **Responsive Design**: Luxury aesthetic that works on all devices

### Admin Dashboard
- **Dashboard Overview**: Key metrics and pending actions at a glance
- **Property Management**: CRUD operations for all properties
- **Booking Pipeline**: Track requests from inquiry to confirmation
- **Offer Generation**: Create and send professional PDF offers
- **Customer CRM**: Manage customer relationships and history
- **Unified Inbox**: All communication (email, WhatsApp, forms) in one place
- **Analytics**: Business insights and performance metrics

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Email**: Resend API
- **PDF Generation**: @react-pdf/renderer
- **Deployment**: Vercel
- **Version Control**: GitHub with GitFlow

## Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Supabase account
- Resend account (for email)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/beststaydavos.git
cd beststaydavos
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

Edit `.env.local` with your credentials:
\`\`\`
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=bookings@beststaydavos.ch
\`\`\`

4. Set up the database:
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the contents of `supabase/schema.sql`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000)

### Admin Access

To access the admin dashboard:
1. Create a user in Supabase Authentication
2. Navigate to `/login`
3. Sign in with your credentials
4. You'll be redirected to `/admin`

## Project Structure

\`\`\`
src/
├── app/
│   ├── (public)/          # Public-facing pages
│   │   ├── page.tsx       # Home page
│   │   ├── accommodation/ # Property listings
│   │   └── contact/       # Contact page
│   ├── (auth)/            # Authentication pages
│   │   └── login/         # Login page
│   ├── (admin)/           # Admin dashboard
│   │   └── admin/
│   │       ├── page.tsx   # Dashboard
│   │       ├── properties/
│   │       ├── bookings/
│   │       ├── offers/
│   │       ├── customers/
│   │       ├── messages/
│   │       └── analytics/
│   └── api/               # API routes
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   ├── admin/             # Admin-specific components
│   ├── booking/           # Booking-related components
│   └── contact/           # Contact form
├── lib/
│   ├── supabase/          # Supabase client configuration
│   ├── pdf/               # PDF generation templates
│   └── utils.ts           # Utility functions
├── types/
│   └── database.ts        # TypeScript types
└── middleware.ts          # Auth middleware
\`\`\`

## Database Schema

The application uses the following main tables:
- `properties` - Property listings
- `property_images` - Property gallery images
- `availability` - Property availability calendar
- `pricing_rules` - Dynamic pricing configuration
- `customers` - Customer database
- `booking_requests` - Booking inquiries
- `offers` - Generated offers
- `messages` - Communication history
- `message_templates` - Email/WhatsApp templates
- `activity_log` - Audit trail

See `supabase/schema.sql` for the complete schema.

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### GitFlow Workflow

\`\`\`
main (production)
  └── develop (staging)
        ├── feature/xxx
        ├── bugfix/xxx
        └── release/xxx
\`\`\`

## Future Enhancements

- [ ] WhatsApp Business API integration
- [ ] AI-powered chatbot for initial inquiries
- [ ] Dynamic pricing engine
- [ ] Calendar sync (iCal export)
- [ ] Guest portal for booking management
- [ ] Multi-language support
- [ ] Payment integration (Stripe)
- [ ] Automated follow-up sequences

## Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Submit a pull request to `develop`
4. After review, changes will be merged

## License

Private - All rights reserved

## Support

For questions or support, contact: info@beststaydavos.ch
