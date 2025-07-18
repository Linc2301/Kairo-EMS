// api/booking-info/[id]/route.js
import { NextResponse } from 'next/server'
import { prisma } from "@/src/lib/prisma";

export async function GET(_, { params }) {
    const { id } = params;

    try {
        const booking = await prisma.booking.findUnique({
            where: { id: Number(id) },
            include: {
                venue: true,
                VenueType: true,
                floralService: true,
                TimePackage: true,
                user: true,
            },
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    const { id } = params;

    try {
        const deleted = await prisma.booking.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: 'Booking deleted successfully', deleted });
    } catch (error) {
        if (error.code === 'P2025') {
            // Prisma error: Record not found
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
    }
}
