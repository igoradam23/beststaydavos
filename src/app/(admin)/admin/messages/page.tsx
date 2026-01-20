import { Metadata } from "next"
import { Search, Mail, MessageSquare, Phone, Circle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Messages | Admin",
}

// Mock data
const conversations = [
  {
    id: "1",
    customerName: "James Wilson",
    email: "james@techcorp.com",
    company: "Tech Corp",
    lastMessage: "Thank you for the offer. We would like to proceed with the booking.",
    lastMessageTime: "10 minutes ago",
    channel: "email",
    unread: true,
    messages: [
      {
        id: "m1",
        direction: "inbound",
        content: "Hi, I'm interested in the Alpine Luxury Chalet for WEF week.",
        timestamp: "2 days ago",
        channel: "form",
      },
      {
        id: "m2",
        direction: "outbound",
        content: "Thank you for your interest! I've attached our offer for the Alpine Luxury Chalet.",
        timestamp: "1 day ago",
        channel: "email",
      },
      {
        id: "m3",
        direction: "inbound",
        content: "Thank you for the offer. We would like to proceed with the booking.",
        timestamp: "10 minutes ago",
        channel: "email",
      },
    ],
  },
  {
    id: "2",
    customerName: "Sarah Chen",
    email: "sarah@investment.com",
    company: "Investment Partners",
    lastMessage: "Can you provide more information about the parking facilities?",
    lastMessageTime: "2 hours ago",
    channel: "whatsapp",
    unread: true,
    messages: [],
  },
  {
    id: "3",
    customerName: "Michael Brown",
    email: "michael@globalfin.com",
    company: "Global Finance",
    lastMessage: "Perfect, we'll review the offer and get back to you soon.",
    lastMessageTime: "Yesterday",
    channel: "email",
    unread: false,
    messages: [],
  },
  {
    id: "4",
    customerName: "Elena Rodriguez",
    email: "elena@consulting.ch",
    company: "Swiss Consulting AG",
    lastMessage: "Confirmed! Looking forward to our stay.",
    lastMessageTime: "3 days ago",
    channel: "email",
    unread: false,
    messages: [],
  },
]

const channelIcons = {
  email: Mail,
  whatsapp: MessageSquare,
  form: Phone,
}

export default function MessagesPage() {
  const selectedConversation = conversations[0]
  const unreadCount = conversations.filter((c) => c.unread).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">
          Unified inbox for all customer communications
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="border-b py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Inbox</CardTitle>
              {unreadCount > 0 && (
                <Badge variant="gold">{unreadCount} unread</Badge>
              )}
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </CardHeader>
          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <TabsList className="w-full justify-start border-b rounded-none px-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="flex-1 overflow-auto m-0 p-0">
              <div className="divide-y">
                {conversations.map((conversation) => {
                  const ChannelIcon = channelIcons[conversation.channel as keyof typeof channelIcons]
                  const isSelected = conversation.id === selectedConversation.id

                  return (
                    <div
                      key={conversation.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        isSelected ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gold/10 text-gold">
                            {conversation.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">
                              {conversation.customerName}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {conversation.lastMessageTime}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.company}
                          </p>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <ChannelIcon className="h-4 w-4 text-muted-foreground" />
                          {conversation.unread && (
                            <Circle className="h-2 w-2 fill-gold text-gold" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Conversation View */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          {/* Conversation Header */}
          <CardHeader className="border-b py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gold/10 text-gold">
                    {selectedConversation.customerName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedConversation.customerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.email} · {selectedConversation.company}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-auto py-4">
            <div className="space-y-4">
              {selectedConversation.messages.map((message) => {
                const isOutbound = message.direction === "outbound"
                const ChannelIcon = channelIcons[message.channel as keyof typeof channelIcons]

                return (
                  <div
                    key={message.id}
                    className={`flex ${isOutbound ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        isOutbound
                          ? "bg-gold text-white"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div
                        className={`flex items-center gap-2 mt-2 text-xs ${
                          isOutbound ? "text-white/70" : "text-muted-foreground"
                        }`}
                      >
                        <ChannelIcon className="h-3 w-3" />
                        <span>{message.timestamp}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>

          {/* Reply Box */}
          <div className="border-t p-4">
            <div className="flex gap-3">
              <Textarea
                placeholder="Type your message..."
                className="min-h-[80px]"
              />
              <div className="flex flex-col gap-2">
                <Button variant="gold">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
