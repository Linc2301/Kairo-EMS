import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// export async function GET() {
//     try {
//         const timePackages = await prisma.timePackage.findMany({
//             include: { Venue: { select: { name: true } } },
//             orderBy: { id: "asc" },
//         });

//         const formatted = timePackages.map(tp => ({
//             id: tp.id,
//             startTime: tp.startTime.toISOString().slice(11, 16), // HH:mm
//             endTime: tp.endTime.toISOString().slice(11, 16),
//             venue_id: tp.venue_id,
//             venueName: tp.Venue?.name || "N/A",
//         }));

//         return NextResponse.json(formatted);
//     } catch (error) {
//         console.error("Error fetching time packages:", error);
//         return NextResponse.json({ message: "Failed to fetch time packages" }, { status: 500 });
//     }
// }

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get("venueId");

    try {
        const timePackages = await prisma.timePackage.findMany({
            where: venueId
                ? {
                    venue_id: parseInt(venueId),
                }
                : {},

            include: {
                Venue: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                id: "asc",
            },
        });

        const formatted = timePackages.map(tp => ({
            id: tp.id,
            startTime: tp.startTime.toISOString().slice(11, 16), // "HH:mm"
            endTime: tp.endTime.toISOString().slice(11, 16),
            venue_id: tp.venue_id,
            venueName: tp.Venue?.name || "N/A",
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Error fetching time packages:", error);
        return NextResponse.json({ message: "Failed to fetch time packages" }, { status: 500 });
    }
}




export async function POST(request) {
    try {
        const { startTime, endTime, venue_id } = await request.json();

        if (!startTime || !endTime || !venue_id) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            return NextResponse.json({ message: "Invalid time format, expected HH:mm" }, { status: 400 });
        }

        if (endTime <= startTime) {
            return NextResponse.json({ message: "End time must be after start time" }, { status: 400 });
        }

        const venue = await prisma.venue.findUnique({ where: { id: Number(venue_id) } });
        if (!venue) {
            return NextResponse.json({ message: `Venue ${venue_id} not found` }, { status: 404 });
        }

        // Use fixed date for time-only
        const fixedDate = "1970-01-01";
        const start = new Date(`${fixedDate}T${startTime}:00Z`);
        const end = new Date(`${fixedDate}T${endTime}:00Z`);

        const created = await prisma.timePackage.create({
            data: {
                startTime: start,
                endTime: end,
                venue_id: Number(venue_id),
            },
        });

        return NextResponse.json({ success: true, data: created }, { status: 201 });
    } catch (error) {
        console.error("Error creating time package:", error);
        return NextResponse.json({ message: "Failed to create time package" }, { status: 500 });
    }
}
