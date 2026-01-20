import { Metadata } from "next"
import { Save, Mail, MessageSquare, Bell, Shield, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Settings | Admin",
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure your application settings and integrations
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">
            <Globe className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </TabsTrigger>
          <TabsTrigger value="whatsapp">
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Basic information about your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" defaultValue="BestStayDavos" />
                </div>
                <div>
                  <Label htmlFor="website">Website URL</Label>
                  <Input id="website" defaultValue="https://beststaydavos.ch" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+41 00 000 00 00" />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" defaultValue="info@beststaydavos.ch" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue="Davos, Switzerland" rows={2} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Offer Settings</CardTitle>
              <CardDescription>
                Default settings for generated offers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="offerValidity">Offer Validity (days)</Label>
                  <Input id="offerValidity" type="number" defaultValue="7" />
                </div>
                <div>
                  <Label htmlFor="depositPercentage">Deposit Percentage</Label>
                  <Input id="depositPercentage" type="number" defaultValue="50" />
                </div>
              </div>
              <div>
                <Label htmlFor="terms">Default Terms & Conditions</Label>
                <Textarea 
                  id="terms" 
                  rows={4}
                  defaultValue="• A 50% deposit is required to confirm the booking.
• The remaining balance is due 30 days before check-in.
• Cancellation within 60 days of check-in: 50% refund.
• Cancellation within 30 days of check-in: No refund."
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="gold">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure your email sending settings (Resend)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="resendApiKey">Resend API Key</Label>
                <Input id="resendApiKey" type="password" placeholder="re_xxxxxxxxxx" />
                <p className="text-sm text-muted-foreground mt-1">
                  Get your API key from <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">resend.com</a>
                </p>
              </div>
              <div>
                <Label htmlFor="fromEmail">From Email Address</Label>
                <Input id="fromEmail" defaultValue="bookings@beststaydavos.ch" />
              </div>
              <div>
                <Label htmlFor="replyTo">Reply-To Email Address</Label>
                <Input id="replyTo" defaultValue="info@beststaydavos.ch" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize your automated email templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Booking Confirmation</p>
                    <p className="text-sm text-muted-foreground">Sent when a new booking request is received</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Offer Sent</p>
                    <p className="text-sm text-muted-foreground">Sent with the personalized offer PDF</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Payment Reminder</p>
                    <p className="text-sm text-muted-foreground">Reminder for pending payments</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="gold">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* WhatsApp Settings */}
        <TabsContent value="whatsapp" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Business API</CardTitle>
              <CardDescription>
                Connect your WhatsApp Business account for automated messaging
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  WhatsApp Business API integration requires a verified Meta Business account. 
                  <a href="https://business.whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline ml-1">
                    Learn more
                  </a>
                </p>
              </div>
              <div>
                <Label htmlFor="whatsappPhoneId">Phone Number ID</Label>
                <Input id="whatsappPhoneId" placeholder="Enter your WhatsApp Phone Number ID" />
              </div>
              <div>
                <Label htmlFor="whatsappToken">Access Token</Label>
                <Input id="whatsappToken" type="password" placeholder="Enter your access token" />
              </div>
              <div>
                <Label htmlFor="whatsappVerifyToken">Verify Token</Label>
                <Input id="whatsappVerifyToken" placeholder="Enter your webhook verify token" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Templates</CardTitle>
              <CardDescription>
                Pre-approved message templates for WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Welcome Message</p>
                    <p className="text-sm text-muted-foreground">Initial greeting for new contacts</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Offer Notification</p>
                    <p className="text-sm text-muted-foreground">Notify about new offer via WhatsApp</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="gold">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Notifications</CardTitle>
              <CardDescription>
                Configure when and how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Booking Request</p>
                  <p className="text-sm text-muted-foreground">Get notified when a new booking request arrives</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Offer Accepted</p>
                  <p className="text-sm text-muted-foreground">Get notified when a guest accepts an offer</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Message</p>
                  <p className="text-sm text-muted-foreground">Get notified for new customer messages</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Offer Expiring</p>
                  <p className="text-sm text-muted-foreground">Get reminded before an offer expires</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button variant="gold">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
