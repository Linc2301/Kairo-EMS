// api/booking-info/route.js
import { NextResponse } from 'next/server'
import { prisma } from "@/src/lib/prisma";


export async function GET() {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                venue: true,
                VenueType: true,
                floralService: true,
                TimePackage: true,
                user: true,
            },
        });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

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
//         return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
//     }
// }

export async function POST(req) {
    try {
        const data = await req.json();

        const booking = await prisma.booking.create({
            data: {
                venue_id: data.venue_id,
                venueTypeId: data.venueTypeId,
                floral_service_id: data.floral_service_id,
                timePackageId: data.timePackageId,
                user_id: data.user_id,
                booking_date: new Date(data.booking_date),
                total_amount: data.total_amount,
            },
        });

        return NextResponse.json(booking, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
    }
}