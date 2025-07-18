import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;

    const venue = await prisma.venue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!venue) {
        return NextResponse.json({ message: "Venue not found" }, { status: 404 });
    }

    return NextResponse.json(venue);
}

export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();

    const { name, photo1, photo2, photo3, eventId } = body;

    try {
        const updated = await prisma.venue.update({
            where: { id: parseInt(id) },
            data: {
                name,
                photo1,
                photo2,
                photo3,
                eventId: parseInt(eventId),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
}

// DELETE venue
export async function DELETE(req, { params }) {
    try {
        await prisma.venue.delete({
            where: { id: parseInt(params.id) },
        });

        return NextResponse.json({ message: 'Venue deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete venue' }, { status: 500 });
    }
}
