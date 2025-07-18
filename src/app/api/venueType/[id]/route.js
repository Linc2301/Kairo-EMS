import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await prisma.venueType.delete({
            where: { id: parseInt(id) },
        });

        return NextResponse.json({ message: "VenueType deleted" });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json({ message: "Failed to delete VenueType" }, { status: 500 });
    }
}


export async function GET(_req, { params }) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const venueType = await prisma.venueType.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                photo: true,
                price: true,
                venue_id: true,
                Venue: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        if (!venueType) {
            return NextResponse.json({ message: "VenueType not found" }, { status: 404 });
        }

        return NextResponse.json({
            ...venueType,
            venueName: venueType.Venue?.name || null,
        });
    } catch (error) {
        console.error("GET /venue-type/[id] error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { name, description, photo, price, venue_id } = body;

        if (!name || !description || !price || !venue_id) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const updatedVenueType = await prisma.venueType.update({
            where: { id },
            data: {
                name,
                description,
                photo,
                price: parseFloat(price),
                venue_id: parseInt(venue_id),
            },
        });

        return NextResponse.json({ message: "VenueType updated", venueType: updatedVenueType });
    } catch (error) {
        console.error("PUT /venue-type/[id] error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
