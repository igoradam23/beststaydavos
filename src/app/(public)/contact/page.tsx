import { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/contact/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with BestStayDavos for inquiries about luxury accommodation in Davos for the World Economic Forum.",
}

export default function ContactPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <section className="bg-champagne py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Get in <span className="text-gold">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Have questions about our properties or need help planning your stay? 
            Our team is here to assist you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-gold" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href="mailto:info@beststaydavos.ch"
                    className="text-lg hover:text-gold transition-colors"
                  >
                    info@beststaydavos.ch
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    We typically respond within 24 hours
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-gold" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a 
                    href="tel:+41000000000"
                    className="text-lg hover:text-gold transition-colors"
                  >
                    +41 00 000 00 00
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    WhatsApp available
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gold" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Davos, Switzerland</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Properties throughout Davos Platz, Davos Dorf, and Klosters
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gold" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg">Mon - Fri: 9:00 - 18:00 CET</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Extended hours during WEF week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
