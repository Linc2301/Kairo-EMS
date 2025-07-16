import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, description, photo, price, venue_id } = body;

        if (!name || !description || !photo || !price || !venue_id) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newVenueType = await prisma.venueType.create({
            data: {
                name,
                description,
                photo, // photo in base64
                price: parseFloat(price),
                venue_id: parseInt(venue_id),
            },
        });

        return NextResponse.json({ message: "VenueType created", venueType: newVenueType }, { status: 201 });
    } catch (error) {
        console.error("VenueType creation error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const venueTypes = await prisma.venueType.findMany({
            select: {
                id: true,
                name: true,
                photo: true,
                description: true,
                price: true,
                venue_id: true,
                Venue: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const formatted = venueTypes.map((type) => ({
            ...type,
            venueName: type.Venue?.name || null,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("GET venueType error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
