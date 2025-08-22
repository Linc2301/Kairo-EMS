import { NextResponse } from 'next/server'
import { prisma } from "@/src/lib/prisma";

// GET booking by ID
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
                user: { select: { id: true, name: true, email: true } },
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

// DELETE booking
export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json(
                { error: 'Booking ID is required' },
                { status: 400 }
            );
        }
        // ✅ Use transaction to handle cascading deletions
        const result = await prisma.$transaction(async (tx) => {
            // First, delete any related Review (if exists)
            await tx.review.deleteMany({
                where: { bookingId: Number(id) }
            });
            // Then delete the booking
            const deletedBooking = await tx.booking.delete({
                where: { id: Number(id) }
            });
            return deletedBooking;
        });
        return NextResponse.json({
            message: 'Booking deleted successfully',
            booking: result
        });
    } catch (error) {
        console.error('Failed to delete booking:', error);
        return NextResponse.json(
            { error: 'Failed to delete booking', details: error.message },
            { status: 500 }
        );
    }
}
export async function PATCH(req, context) {
    const { params } = context;

    // await params if it's a Promise
    const resolvedParams = await Promise.resolve(params);

    const bookingId = Number(resolvedParams.id);
    if (isNaN(bookingId)) {
        return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
    }

    try {
        const body = await req.json().catch(() => ({}));

        const updateData = {};
        if (body.status) updateData.status = body.status;
        if (body.payment) updateData.payment = body.payment;

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
        }

        const updated = await prisma.booking.update({
            where: { id: bookingId },
            data: updateData,
        });

        return NextResponse.json(updated, { status: 200 });
    } catch (error) {
        console.error("Failed to update booking:", error);
        return NextResponse.json({ error: "Failed to update booking", details: error.message }, { status: 500 });
    }
}
