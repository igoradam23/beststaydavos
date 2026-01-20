import { Metadata } from "next"
import { TrendingUp, TrendingDown, DollarSign, Users, Home, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Analytics | Admin",
}

// Mock data
const stats = {
  revenue: {
    current: 245000,
    previous: 198000,
    change: 23.7,
  },
  bookings: {
    current: 18,
    previous: 14,
    change: 28.6,
  },
  occupancy: {
    current: 78,
    previous: 65,
    change: 20,
  },
  avgBookingValue: {
    current: 13611,
    previous: 14143,
    change: -3.8,
  },
}

const monthlyRevenue = [
  { month: "Sep", revenue: 45000 },
  { month: "Oct", revenue: 62000 },
  { month: "Nov", revenue: 78000 },
  { month: "Dec", revenue: 95000 },
  { month: "Jan", revenue: 245000 },
]

const topProperties = [
  { name: "Alpine Luxury Chalet", bookings: 5, revenue: 92500 },
  { name: "Executive Penthouse", bookings: 4, revenue: 96000 },
  { name: "Congress Center Suite", bookings: 6, revenue: 55200 },
  { name: "Mountain View Residence", bookings: 3, revenue: 38400 },
]

const bookingsBySource = [
  { source: "Website Form", count: 12, percentage: 48 },
  { source: "Email", count: 8, percentage: 32 },
  { source: "WhatsApp", count: 4, percentage: 16 },
  { source: "Phone", count: 1, percentage: 4 },
]

const conversionFunnel = [
  { stage: "Requests Received", count: 45, percentage: 100 },
  { stage: "Offers Sent", count: 32, percentage: 71 },
  { stage: "Offers Viewed", count: 28, percentage: 62 },
  { stage: "Offers Accepted", count: 18, percentage: 40 },
  { stage: "Bookings Confirmed", count: 15, percentage: 33 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Business insights and performance metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(stats.revenue.current)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-gold" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              {stats.revenue.change > 0 ? (
                <>
                  <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+{stats.revenue.change}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
                  <span className="text-red-600 font-medium">{stats.revenue.change}%</span>
                </>
              )}
              <span className="text-muted-foreground ml-2">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bookings</p>
                <p className="text-2xl font-bold mt-1">{stats.bookings.current}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{stats.bookings.change}%</span>
              <span className="text-muted-foreground ml-2">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                <p className="text-2xl font-bold mt-1">{stats.occupancy.current}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Home className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-green-600 font-medium">+{stats.occupancy.change}%</span>
              <span className="text-muted-foreground ml-2">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Booking Value</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(stats.avgBookingValue.current)}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <ArrowDownRight className="h-4 w-4 text-red-600 mr-1" />
              <span className="text-red-600 font-medium">{stats.avgBookingValue.change}%</span>
              <span className="text-muted-foreground ml-2">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Monthly revenue for WEF season</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-4">
              {monthlyRevenue.map((item, index) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gold/20 hover:bg-gold/30 transition-colors rounded-t"
                    style={{ 
                      height: `${(item.revenue / Math.max(...monthlyRevenue.map(m => m.revenue))) * 200}px` 
                    }}
                  >
                    <div 
                      className="w-full bg-gold rounded-t"
                      style={{ 
                        height: index === monthlyRevenue.length - 1 ? "100%" : "0%" 
                      }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>From request to confirmed booking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{stage.stage}</span>
                    <span className="text-sm font-medium">{stage.count}</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{stage.percentage}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Properties */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Properties</CardTitle>
            <CardDescription>By revenue this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProperties.map((property, index) => (
                <div key={property.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{property.name}</p>
                      <p className="text-sm text-muted-foreground">{property.bookings} bookings</p>
                    </div>
                  </div>
                  <span className="font-semibold text-gold">{formatCurrency(property.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bookings by Source */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings by Source</CardTitle>
            <CardDescription>Where your bookings come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookingsBySource.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{source.source}</span>
                    <span className="text-sm">
                      <span className="font-medium">{source.count}</span>
                      <span className="text-muted-foreground ml-1">({source.percentage}%)</span>
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
