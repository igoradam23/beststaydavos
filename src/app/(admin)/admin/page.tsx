import { Metadata } from "next"
import Link from "next/link"
import { 
  CalendarDays, 
  FileText, 
  Users, 
  DollarSign, 
  TrendingUp, 
  MessageSquare,
  ArrowRight,
  Clock
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Dashboard | Admin",
}

// Mock data - would come from Supabase in production
const stats = {
  pendingRequests: 8,
  offersSent: 12,
  confirmedBookings: 5,
  revenueThisMonth: 125000,
  occupancyRate: 78,
  unreadMessages: 3,
}

const recentRequests = [
  {
    id: "1",
    customerName: "James Wilson",
    company: "Tech Corp",
    property: "Alpine Luxury Chalet",
    checkIn: "2026-01-17",
    checkOut: "2026-01-25",
    guests: 8,
    status: "new",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    customerName: "Sarah Chen",
    company: "Investment Partners",
    property: "Congress Center Suite",
    checkIn: "2026-01-18",
    checkOut: "2026-01-24",
    guests: 4,
    status: "under_review",
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    customerName: "Michael Brown",
    company: "Global Finance",
    property: "Executive Penthouse",
    checkIn: "2026-01-19",
    checkOut: "2026-01-23",
    guests: 6,
    status: "offer_sent",
    createdAt: "1 day ago",
  },
]

const statusColors: Record<string, "default" | "secondary" | "warning" | "success" | "gold"> = {
  new: "gold",
  under_review: "warning",
  offer_sent: "secondary",
  accepted: "success",
  confirmed: "success",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your booking requests and business metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requests
            </CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Offers Sent
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offersSent}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Confirmed
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.confirmedBookings}</div>
            <p className="text-xs text-muted-foreground">Bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.revenueThisMonth)}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Occupancy
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">WEF week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">Unread</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Booking Requests</CardTitle>
            <CardDescription>Latest inquiries from potential guests</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/bookings">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{request.customerName}</p>
                      <p className="text-sm text-muted-foreground">{request.company}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 hidden md:block">
                  <p className="font-medium">{request.property}</p>
                  <p className="text-sm text-muted-foreground">
                    {request.checkIn} → {request.checkOut} · {request.guests} guests
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <Badge variant={statusColors[request.status]}>
                      {request.status.replace("_", " ")}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center justify-end">
                      <Clock className="h-3 w-3 mr-1" />
                      {request.createdAt}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/bookings/${request.id}`}>
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <Link href="/admin/properties/new">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <CalendarDays className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold">Add Property</h3>
                  <p className="text-sm text-muted-foreground">
                    Add a new property to your portfolio
                  </p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <Link href="/admin/offers/new">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold">Create Offer</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate a new PDF offer
                  </p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <Link href="/admin/messages">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold">View Messages</h3>
                  <p className="text-sm text-muted-foreground">
                    Check your inbox and respond
                  </p>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}
