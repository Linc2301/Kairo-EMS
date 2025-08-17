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
        Event: {   // Make sure this matches your Prisma schema relation name
          select: {
            id: true,
            name: true,
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

    const { user_id, eventId, rating, review_date, description } = data;
    if (!user_id || !eventId || typeof rating !== "number" || !review_date || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newReview = await prisma.review.create({
      data: {
        user_id,
        eventId,
        rating,
        review_date: new Date(review_date),
        description,
      },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("POST /api/review error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
