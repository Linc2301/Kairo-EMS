// // api/booking-info/route.js
// import { NextResponse } from 'next/server'
// import { prisma } from "@/src/lib/prisma";



// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get('userId');

//     const bookings = await prisma.booking.findMany({
//       where: userId ? { user_id: userId } : {},
//       include: {
//         venue: true,
//         VenueType: true,
//         floralService: true,
//         TimePackage: true,
//         user: true,
//       },
//     });
//     return NextResponse.json(bookings);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
//   }
// }


// export async function POST(req) {
//     try {
//         const data = await req.json();

//         const booking = await prisma.booking.create({
//             data: {
//                 venue_id: data.venue_id,
//                 venueTypeId: data.venueTypeId,
//                 floral_service_id: data.floral_service_id,
//                 timePackageId: data.timePackageId,
//                 user_id: data.user_id,
//                 booking_date: new Date(data.booking_date),
//                 total_amount: data.total_amount,
//             },
//         });

//         return NextResponse.json(booking, { status: 201 });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server'
import { prisma } from "@/src/lib/prisma";
import { v4 as uuidv4 } from 'uuid';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        // Validate userId if provided
        const filter = userId && !isNaN(Number(userId))
            ? { user_id: Number(userId) }
            : {};

        const bookings = await prisma.booking.findMany({
            where: filter,
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
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(bookings);
    } catch (error) {
        console.error('Bookings fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch bookings', details: error.message },
            { status: 500 }
        );
    }
}
export async function POST(req) {
    try {
        const data = await req.json();

        // Validate required fields
        if (
            !data.venue_id ||
            !data.venueTypeId ||
            !data.timePackageId ||
            !data.user_id ||
            !data.booking_date ||
            !data.total_amount
        ) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Count existing bookings to generate sequential ID
        const totalBookings = await prisma.booking.count();
        const nextNumber = totalBookings + 1;
        const bookingId = `BK${String(nextNumber).padStart(3, '0')}`; // e.g., BK001, BK002

        const booking = await prisma.booking.create({
            data: {
                bookingId,
                venue_id: Number(data.venue_id),
                venueTypeId: Number(data.venueTypeId),
                floral_service_id: Number(data.floral_service_id),
                timePackageId: Number(data.timePackageId),
                user_id: Number(data.user_id),
                eventId: data.eventId ? Number(data.eventId) : null,
                booking_date: new Date(data.booking_date),
                total_amount: Number(data.total_amount),

                // ✅ Fill required enums with defaults
                payment: data.payment ?? "pending",
                status: data.status ?? "pending",
            },
            include: {
                user: { select: { id: true, name: true, email: true } },
                venue: true,
                VenueType: true,
                floralService: true,
                TimePackage: true,
            },
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error('Failed to create booking:', error);
        return NextResponse.json(
            { error: 'Failed to create booking', details: error.message },
            { status: 500 }
        );
    }
}
