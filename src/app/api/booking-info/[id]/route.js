import { NextResponse } from 'next/server'
import { prisma } from "@/src/lib/prisma";

export async function GET(_, { params }) {
    const { id } = params;

    try {
        if (isNaN(Number(id))) {
            return NextResponse.json({ error: 'Invalid booking ID' }, { status: 400 });
        }

        const booking = await prisma.booking.findUnique({
            where: { id: Number(id) },
            include: {
                venue: true,
                VenueType: true,
                floralService: true,
                TimePackage: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
            },
        });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch booking', details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(_, { params }) {
    try {
        const bookingId = Number(params.id);

        if (isNaN(bookingId)) {
            return NextResponse.json({ error: 'Invalid booking ID' }, { status: 400 });
        }

        await prisma.booking.delete({
            where: { id: bookingId },
        });

        return NextResponse.json(
            { message: 'Booking deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Failed to delete booking:', error);
        return NextResponse.json(
            { error: 'Failed to delete booking', details: error.message },
            { status: 500 }
        );
    }
}