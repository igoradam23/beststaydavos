import { Metadata } from "next"
import Link from "next/link"
import { Search, Filter, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"

export const metadata: Metadata = {
  title: "Bookings | Admin",
}

// Mock data
const bookingRequests = [
  {
    id: "1",
    customerName: "James Wilson",
    email: "james@techcorp.com",
    company: "Tech Corp",
    property: "Alpine Luxury Chalet",
    propertySlug: "alpine-luxury-chalet",
    checkIn: "2026-01-17",
    checkOut: "2026-01-25",
    guests: 8,
    status: "new",
    source: "form",
    createdAt: "2026-01-15T10:30:00Z",
  },
  {
    id: "2",
    customerName: "Sarah Chen",
    email: "sarah@investment.com",
    company: "Investment Partners",
    property: "Congress Center Suite",
    propertySlug: "congress-center-suite",
    checkIn: "2026-01-18",
    checkOut: "2026-01-24",
    guests: 4,
    status: "under_review",
    source: "email",
    createdAt: "2026-01-14T15:00:00Z",
  },
  {
    id: "3",
    customerName: "Michael Brown",
    email: "michael@globalfin.com",
    company: "Global Finance",
    property: "Executive Penthouse",
    propertySlug: "executive-penthouse",
    checkIn: "2026-01-19",
    checkOut: "2026-01-23",
    guests: 6,
    status: "offer_sent",
    source: "whatsapp",
    createdAt: "2026-01-13T09:00:00Z",
  },
  {
    id: "4",
    customerName: "Elena Rodriguez",
    email: "elena@consulting.ch",
    company: "Swiss Consulting AG",
    property: "Mountain View Residence",
    propertySlug: "mountain-view-residence",
    checkIn: "2026-01-17",
    checkOut: "2026-01-24",
    guests: 5,
    status: "accepted",
    source: "form",
    createdAt: "2026-01-10T14:00:00Z",
  },
  {
    id: "5",
    customerName: "David Kim",
    email: "david@ventures.kr",
    company: "Korean Ventures",
    property: "Alpine Luxury Chalet",
    propertySlug: "alpine-luxury-chalet",
    checkIn: "2026-01-18",
    checkOut: "2026-01-23",
    guests: 10,
    status: "confirmed",
    source: "email",
    createdAt: "2026-01-08T11:00:00Z",
  },
]

const statusColors: Record<string, "default" | "secondary" | "warning" | "success" | "gold" | "destructive"> = {
  new: "gold",
  under_review: "warning",
  offer_sent: "secondary",
  accepted: "success",
  negotiation: "warning",
  confirmed: "success",
  completed: "default",
  expired: "destructive",
  cancelled: "destructive",
}

const statusLabels: Record<string, string> = {
  new: "New",
  under_review: "Under Review",
  offer_sent: "Offer Sent",
  accepted: "Accepted",
  negotiation: "Negotiation",
  confirmed: "Confirmed",
  completed: "Completed",
  expired: "Expired",
  cancelled: "Cancelled",
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  return formatDate(dateString)
}

export default function BookingsPage() {
  const statusCounts = {
    all: bookingRequests.length,
    new: bookingRequests.filter((b) => b.status === "new").length,
    pending: bookingRequests.filter((b) => ["under_review", "offer_sent", "negotiation"].includes(b.status)).length,
    confirmed: bookingRequests.filter((b) => ["accepted", "confirmed"].includes(b.status)).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Booking Requests</h1>
        <p className="text-muted-foreground mt-1">
          Manage incoming booking requests and create offers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gold">{statusCounts.new}</div>
            <p className="text-sm text-muted-foreground">New Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{statusCounts.confirmed}</div>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{statusCounts.all}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, email, or company..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="new">New ({statusCounts.new})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({statusCounts.confirmed})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.customerName}</p>
                        <p className="text-sm text-muted-foreground">{request.company}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link 
                        href={`/accommodation/${request.propertySlug}`}
                        className="hover:text-gold transition-colors"
                        target="_blank"
                      >
                        {request.property}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{formatDate(request.checkIn)}</p>
                        <p className="text-muted-foreground">to {formatDate(request.checkOut)}</p>
                      </div>
                    </TableCell>
                    <TableCell>{request.guests}</TableCell>
                    <TableCell>
                      <Badge variant={statusColors[request.status]}>
                        {statusLabels[request.status]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {getTimeAgo(request.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/bookings/${request.id}`}>
                          View
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="new" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Showing {statusCounts.new} new requests
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Showing {statusCounts.pending} pending requests
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                Showing {statusCounts.confirmed} confirmed requests
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
