import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get('date');
    const venueId = Number(searchParams.get('venueId'));

    if (!dateStr || !venueId) {
        return NextResponse.json({ message: 'Missing date or venueId' }, { status: 400 });
    }

    try {
        const date = new Date(dateStr);

        const slots = await prisma.timePackage.findMany({
            where: {
                venue_id: venueId,
                date: date,
                booking: null,
            },
            orderBy: { startTime: 'asc' },
            include: {
                Venue: { select: { name: true } },
            },
        });

        const formatted = slots.map(tp => ({
            id: tp.id,
            startTime: tp.startTime,
            endTime: tp.endTime,
            venue_id: tp.venue_id,
            venueName: tp.Venue?.name || 'Unknown',
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error('Error fetching timeslots:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}