import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date");
    const venueId = Number(searchParams.get("venueId"));

    if (!dateStr || !venueId) return NextResponse.json([], { status: 400 });

    try {
        const startOfDay = new Date(dateStr + "T00:00:00");
        const endOfDay = new Date(dateStr + "T23:59:59");

        const slots = await prisma.timePackage.findMany({
            where: {
                venue_id: venueId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
                booking: null,
            },
            orderBy: { startTime: 'asc' },
            include: {
                Venue: { select: { name: true } },
            },
        });

        const formatted = slots.map(tp => ({
            id: tp.id,
            startTime: tp.startTime.toISOString(),
            endTime: tp.endTime.toISOString(),
            venue_id: tp.venue_id,
            venueName: tp.Venue?.name || "Unknown",
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Error fetching timeslots:", error);
        return NextResponse.json([], { status: 500 });
    }
}
