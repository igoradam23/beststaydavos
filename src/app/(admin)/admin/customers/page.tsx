import { Metadata } from "next"
import Link from "next/link"
import { Search, Filter, Users, Mail, Phone, Building, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Customers | Admin",
}

// Mock data
const customers = [
  {
    id: "1",
    name: "James Wilson",
    email: "james@techcorp.com",
    phone: "+1 555 123 4567",
    company: "Tech Corp",
    country: "USA",
    totalBookings: 2,
    totalRevenue: 37000,
    lastContact: "2026-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah@investment.com",
    phone: "+852 9876 5432",
    company: "Investment Partners",
    country: "Hong Kong",
    totalBookings: 1,
    totalRevenue: 9200,
    lastContact: "2026-01-14",
    status: "active",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@globalfin.com",
    phone: "+44 20 7946 0958",
    company: "Global Finance",
    country: "UK",
    totalBookings: 3,
    totalRevenue: 72000,
    lastContact: "2026-01-13",
    status: "vip",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    email: "elena@consulting.ch",
    phone: "+41 44 123 4567",
    company: "Swiss Consulting AG",
    country: "Switzerland",
    totalBookings: 1,
    totalRevenue: 12800,
    lastContact: "2026-01-10",
    status: "active",
  },
  {
    id: "5",
    name: "David Kim",
    email: "david@ventures.kr",
    phone: "+82 2 1234 5678",
    company: "Korean Ventures",
    country: "South Korea",
    totalBookings: 4,
    totalRevenue: 98000,
    lastContact: "2026-01-08",
    status: "vip",
  },
]

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function CustomersPage() {
  const totalCustomers = customers.length
  const vipCustomers = customers.filter((c) => c.status === "vip").length
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalRevenue, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground mt-1">
          Manage your customer database and relationships
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Total Customers</span>
            </div>
            <div className="text-2xl font-bold mt-2">{totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Badge variant="gold" className="h-4">VIP</Badge>
              <span className="text-sm text-muted-foreground">VIP Customers</span>
            </div>
            <div className="text-2xl font-bold mt-2">{vipCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Total Bookings</div>
            <div className="text-2xl font-bold mt-2">
              {customers.reduce((sum, c) => sum + c.totalBookings, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Lifetime Revenue</div>
            <div className="text-2xl font-bold mt-2">{formatCurrency(totalRevenue)}</div>
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

      {/* Customers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Last Contact</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-gold/10 text-gold">
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{customer.name}</p>
                        {customer.status === "vip" && (
                          <Badge variant="gold" className="text-xs">VIP</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{customer.country}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                      <a href={`mailto:${customer.email}`} className="hover:text-gold">
                        {customer.email}
                      </a>
                    </div>
                    {customer.phone && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="h-3 w-3 mr-2" />
                        {customer.phone}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                    {customer.company}
                  </div>
                </TableCell>
                <TableCell>{customer.totalBookings}</TableCell>
                <TableCell>
                  <span className="font-semibold">{formatCurrency(customer.totalRevenue)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(customer.lastContact)}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/customers/${customer.id}`}>
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
    </div>
  )
}
