import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
          },
        },
        Booking: {
          include: {
            venue: {
              include: {
                Event: {   // ✅ Get Event via Venue
                  select: { id: true, name: true },
                },
              },
            },
          },
        },
      },
      orderBy: {
        review_date: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("GET /api/review error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const data = await req.json();
    const { user_id, eventId, rating, review_date, description, bookingId } = data;

    // Basic validation
    if (
      !user_id ||
      !eventId ||
      typeof rating !== "number" ||
      !review_date ||
      !description ||
      !bookingId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Check if booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // ✅ Check booking belongs to this user
    if (booking.user_id !== user_id) {
      return NextResponse.json(
        { error: "You can only review your own bookings" },
        { status: 403 }
      );
    }

    // ✅ Check booking belongs to this event
    if (booking.eventId !== eventId) {
      return NextResponse.json(
        { error: "This booking is not linked to the selected event" },
        { status: 400 }
      );
    }

    // ✅ Prevent duplicate reviews for same booking
    const existingReview = await prisma.review.findUnique({
      where: { bookingId },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this booking" },
        { status: 400 }
      );
    }

    // ✅ Create review
    const newReview = await prisma.review.create({
      data: {
        user_id,
        eventId,
        bookingId,
        rating,
        review_date: new Date(review_date),
        description,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { error: "Failed to create review", details: error.message },
      { status: 500 }
    );
  }
}
