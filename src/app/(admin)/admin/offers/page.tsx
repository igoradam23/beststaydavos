import { Metadata } from "next"
import Link from "next/link"
import { Search, Filter, FileText, Send, Eye, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Offers | Admin",
}

// Mock data
const offers = [
  {
    id: "1",
    offerNumber: "BSD-2026-A1B2C3",
    customerName: "James Wilson",
    company: "Tech Corp",
    property: "Alpine Luxury Chalet",
    checkIn: "2026-01-17",
    checkOut: "2026-01-25",
    totalPrice: 18500,
    status: "sent",
    version: 1,
    expiresAt: "2026-01-22",
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    offerNumber: "BSD-2026-D4E5F6",
    customerName: "Sarah Chen",
    company: "Investment Partners",
    property: "Congress Center Suite",
    checkIn: "2026-01-18",
    checkOut: "2026-01-24",
    totalPrice: 9200,
    status: "viewed",
    version: 1,
    expiresAt: "2026-01-21",
    createdAt: "2026-01-14",
  },
  {
    id: "3",
    offerNumber: "BSD-2026-G7H8I9",
    customerName: "Michael Brown",
    company: "Global Finance",
    property: "Executive Penthouse",
    checkIn: "2026-01-19",
    checkOut: "2026-01-23",
    totalPrice: 24000,
    status: "accepted",
    version: 2,
    expiresAt: "2026-01-20",
    createdAt: "2026-01-13",
  },
  {
    id: "4",
    offerNumber: "BSD-2026-J1K2L3",
    customerName: "Elena Rodriguez",
    company: "Swiss Consulting AG",
    property: "Mountain View Residence",
    checkIn: "2026-01-17",
    checkOut: "2026-01-24",
    totalPrice: 12800,
    status: "draft",
    version: 1,
    expiresAt: "2026-01-25",
    createdAt: "2026-01-18",
  },
]

const statusColors: Record<string, "default" | "secondary" | "warning" | "success" | "gold" | "destructive"> = {
  draft: "secondary",
  sent: "gold",
  viewed: "warning",
  accepted: "success",
  declined: "destructive",
  expired: "destructive",
}

const statusLabels: Record<string, string> = {
  draft: "Draft",
  sent: "Sent",
  viewed: "Viewed",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function OffersPage() {
  const totalValue = offers.reduce((sum, o) => sum + o.totalPrice, 0)
  const acceptedValue = offers
    .filter((o) => o.status === "accepted")
    .reduce((sum, o) => sum + o.totalPrice, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Offers</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track all generated offers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Offers</span>
            </div>
            <div className="text-2xl font-bold mt-2">{offers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Pending Response</span>
            </div>
            <div className="text-2xl font-bold mt-2">
              {offers.filter((o) => ["sent", "viewed"].includes(o.status)).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Value</span>
            </div>
            <div className="text-2xl font-bold mt-2">{formatCurrency(totalValue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-sm text-muted-foreground">Accepted Value</span>
            </div>
            <div className="text-2xl font-bold mt-2 text-green-600">
              {formatCurrency(acceptedValue)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by offer number or customer..." className="pl-9" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Offers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Offer</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>
                  <div>
                    <p className="font-mono text-sm">{offer.offerNumber}</p>
                    <p className="text-xs text-muted-foreground">v{offer.version}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{offer.customerName}</p>
                    <p className="text-sm text-muted-foreground">{offer.company}</p>
                  </div>
                </TableCell>
                <TableCell>{offer.property}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <p>{formatDate(offer.checkIn)}</p>
                    <p className="text-muted-foreground">to {formatDate(offer.checkOut)}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-semibold">{formatCurrency(offer.totalPrice)}</span>
                </TableCell>
                <TableCell>
                  <Badge variant={statusColors[offer.status]}>
                    {statusLabels[offer.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(offer.expiresAt)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/offers/${offer.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    {offer.status === "draft" && (
                      <Button variant="ghost" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
