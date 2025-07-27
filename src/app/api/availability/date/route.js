import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const venueId = Number(searchParams.get("venueId"));

//     if (!venueId) return NextResponse.json([], { status: 400 });

//     try {
//         const rawDates = await prisma.timePackage.findMany({
//             where: { venue_id: venueId },
//             select: { date: true },
//         });

//         const uniqueDateStrings = Array.from(
//             new Set(rawDates.map(d => new Date(d.date).toISOString().split("T")[0]))
//         );

//         const formattedDates = uniqueDateStrings.map(dateStr => ({ date: dateStr }));

//         return NextResponse.json(formattedDates);
//     } catch (error) {
//         console.error("Error fetching availability dates:", error);
//         return NextResponse.json([], { status: 500 });
//     }
// }



// GET /api/availability/date

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get('venueId');

    if (!venueId) {
        return NextResponse.json({ message: 'venueId query parameter is required' }, { status: 400 });
    }

    const parsedVenueId = parseInt(venueId);
    if (isNaN(parsedVenueId)) {
        return NextResponse.json({ message: 'venueId must be a valid number' }, { status: 400 });
    }

    try {
        const dates = await prisma.timePackage.findMany({
            where: { venue_id: parsedVenueId },
            select: { date: true },
            distinct: ['date'],
            orderBy: { date: 'asc' },
        });

        const formatted = dates.map(d => ({
            date: d.date.toISOString().split('T')[0],
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}