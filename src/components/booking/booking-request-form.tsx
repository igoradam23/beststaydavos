"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarDays, Users, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  checkIn: z.string().min(1, "Check-in date is required"),
  checkOut: z.string().min(1, "Check-out date is required"),
  guests: z.coerce.number().min(1, "At least 1 guest required"),
  specialRequests: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingRequestFormProps {
  propertyId: string
  propertyName: string
}

export function BookingRequestForm({ propertyId, propertyName }: BookingRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      checkIn: "2026-01-17",
      checkOut: "2026-01-25",
      guests: 2,
    },
  })

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/booking-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          propertyId,
          propertyName,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setIsSuccess(true)
      reset()
    } catch (error) {
      console.error("Booking request error:", error)
      alert("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Request Submitted!</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Thank you for your interest. We&apos;ll review your request and send you a personalized offer within 24 hours.
        </p>
        <Button 
          variant="outline" 
          onClick={() => setIsSuccess(false)}
        >
          Submit Another Request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="checkIn">Check-in</Label>
          <div className="relative">
            <Input
              id="checkIn"
              type="date"
              {...register("checkIn")}
              className={errors.checkIn ? "border-destructive" : ""}
            />
          </div>
          {errors.checkIn && (
            <p className="text-xs text-destructive mt-1">{errors.checkIn.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="checkOut">Check-out</Label>
          <Input
            id="checkOut"
            type="date"
            {...register("checkOut")}
            className={errors.checkOut ? "border-destructive" : ""}
          />
          {errors.checkOut && (
            <p className="text-xs text-destructive mt-1">{errors.checkOut.message}</p>
          )}
        </div>
      </div>

      {/* Guests */}
      <div>
        <Label htmlFor="guests">Number of Guests</Label>
        <Input
          id="guests"
          type="number"
          min={1}
          {...register("guests")}
          className={errors.guests ? "border-destructive" : ""}
        />
        {errors.guests && (
          <p className="text-xs text-destructive mt-1">{errors.guests.message}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Contact Info */}
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="John Smith"
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && (
          <p className="text-xs text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="john@company.com"
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          placeholder="+41 00 000 00 00"
        />
      </div>

      <div>
        <Label htmlFor="company">Company (optional)</Label>
        <Input
          id="company"
          {...register("company")}
          placeholder="Company name"
        />
      </div>

      <div>
        <Label htmlFor="specialRequests">Special Requests (optional)</Label>
        <Textarea
          id="specialRequests"
          {...register("specialRequests")}
          placeholder="Any special requirements or questions..."
          rows={3}
        />
      </div>

      <Button 
        type="submit" 
        variant="gold" 
        className="w-full" 
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request Quote"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        You won&apos;t be charged yet. We&apos;ll send you a personalized offer.
      </p>
    </form>
  )
}
