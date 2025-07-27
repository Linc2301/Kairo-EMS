import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";


// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const venueId = searchParams.get("venueId");

//     try {
//         const timePackages = await prisma.timePackage.findMany({
//             where: venueId
//                 ? {
//                     venue_id: parseInt(venueId),
//                 }
//                 : {},

//             include: {
//                 Venue: {
//                     select: {
//                         name: true,
//                     },
//                 },
//             },
//             orderBy: {
//                 id: "asc",
//             },
//         });

//         const formatted = timePackages.map(tp => ({
//             id: tp.id,
//             startTime: tp.startTime.toISOString().slice(11, 16), // "HH:mm"
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

//

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const venueId = searchParams.get("venueId");

//     try {
//         const timePackages = await prisma.timePackage.findMany({
//             where: venueId ? { venue_id: parseInt(venueId) } : {},
//             include: {
//                 Venue: { select: { name: true } },
//             },
//             orderBy: { id: "asc" },
//         });

//         const formatted = timePackages.map(tp => ({
//             id: tp.id,
//             startTime: tp.startTime.toISOString(),
//             endTime: tp.endTime.toISOString(),
//             venue_id: tp.venue_id,
//             venueName: tp.Venue?.name || "N/A",
//         }));

//         return NextResponse.json(formatted);
//     } catch (error) {
//         console.error("Error fetching time packages:", error);
//         return NextResponse.json({ message: "Failed to fetch time packages" }, { status: 500 });
//     }
// }



//
// export async function POST(request) {
//     try {
//         const { startTime, endTime, venue_id } = await request.json();

//         if (!startTime || !endTime || !venue_id) {
//             return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//         }

//         const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//         if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
//             return NextResponse.json({ message: "Invalid time format, expected HH:mm" }, { status: 400 });
//         }

//         if (endTime <= startTime) {
//             return NextResponse.json({ message: "End time must be after start time" }, { status: 400 });
//         }

//         const venue = await prisma.venue.findUnique({ where: { id: Number(venue_id) } });
//         if (!venue) {
//             return NextResponse.json({ message: `Venue ${venue_id} not found` }, { status: 404 });
//         }

//         // Use fixed date for time-only
//         const fixedDate = "1970-01-01";
//         const start = new Date(`${fixedDate}T${startTime}:00Z`);
//         const end = new Date(`${fixedDate}T${endTime}:00Z`);
//         const date = new Date();

//         const created = await prisma.timePackage.create({
//             data: {
//                 date,
//                 startTime: start,
//                 endTime: end,
//                 venue_id: Number(venue_id),
//             },
//         });

//         return NextResponse.json({ success: true, data: created }, { status: 201 });
//     } catch (error) {
//         console.error("Error creating time package:", error);
//         return NextResponse.json({ message: "Failed to create time package" }, { status: 500 });
//     }
// }


// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const venueId = searchParams.get("venueId");

//     try {
//         const timePackages = await prisma.timePackage.findMany({
//             where: venueId ? { venue_id: parseInt(venueId) } : {},
//             include: {
//                 Venue: { select: { name: true } },
//             },
//             orderBy: { id: "asc" },
//         });

//         const formatted = timePackages.map((tp) => ({
//             id: tp.id,
//             startTime: tp.startTime.toISOString(),
//             endTime: tp.endTime.toISOString(),
//             venue_id: tp.venue_id,
//             venueName: tp.Venue?.name || "Unknown",
//         }));

//         return NextResponse.json(formatted);
//     } catch (error) {
//         console.error("Error fetching time packages:", error);
//         return NextResponse.json({ message: "Failed to fetch time packages" }, { status: 500 });
//     }
// }

// export async function POST(request) {
//     try {
//         const { startTime, endTime, venue_id } = await request.json();

//         if (!startTime || !endTime || !venue_id) {
//             return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//         }

//         const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//         if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
//             return NextResponse.json({ message: "Invalid time format, expected HH:mm" }, { status: 400 });
//         }

//         if (endTime <= startTime) {
//             return NextResponse.json({ message: "End time must be after start time" }, { status: 400 });
//         }

//         const venueId = Number(venue_id);
//         const venue = await prisma.venue.findUnique({ where: { id: venueId } });

//         if (!venue) {
//             return NextResponse.json({ message: `Venue ${venue_id} not found` }, { status: 404 });
//         }

//         // Do NOT use "Z" here (it would turn it into UTC)
//         const fixedDate = "1970-01-01";
//         const start = new Date(`${startTime}`);
//         const end = new Date(`${endTime}`);
//         const date = new Date();

//         const created = await prisma.timePackage.create({
//             data: {
//                 date,
//                 startTime: start,
//                 endTime: end,
//                 venue_id: venueId,
//             },
//         });

//         return NextResponse.json({ success: true, data: created }, { status: 201 });
//     } catch (error) {
//         console.error("Error creating time package:", error);
//         return NextResponse.json({ message: "Failed to create time package" }, { status: 500 });
//     }
// }

//

// export async function POST(request) {
//     try {
//         const { date, startTime, endTime, venue_id } = await request.json();

//         if (!date || !startTime || !endTime || !venue_id) {
//             return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//         }

//         const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//         if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
//             return NextResponse.json({ message: "Invalid time format, expected HH:mm" }, { status: 400 });
//         }

//         if (endTime <= startTime) {
//             return NextResponse.json({ message: "End time must be after start time" }, { status: 400 });
//         }

//         const venueId = Number(venue_id);
//         const venue = await prisma.venue.findUnique({ where: { id: venueId } });
//         if (!venue) {
//             return NextResponse.json({ message: `Venue ${venue_id} not found` }, { status: 404 });
//         }

//         // Combine date + time into full DateTime objects (in local time)
//         const start = new Date(`${date}T${startTime}`);
//         const end = new Date(`${date}T${endTime}`);
//         const dateOnly = new Date(date); // Just the date part for the `date` column

//         const created = await prisma.timePackage.create({
//             data: {
//                 date: dateOnly,
//                 startTime: start,
//                 endTime: end,
//                 venue_id: venueId,
//             },
//         });

//         return NextResponse.json({ success: true, data: created }, { status: 201 });
//     } catch (error) {
//         console.error("Error creating time package:", error);
//         return NextResponse.json({ message: "Failed to create time package" }, { status: 500 });
//     }
// }

import dayjs from 'dayjs';


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get("venueId");

    try {
        const timePackages = await prisma.timePackage.findMany({
            where: venueId ? { venue_id: parseInt(venueId) } : {},
            include: {
                Venue: { select: { name: true } },
            },
            orderBy: { id: "asc" },
        });

        const formatted = timePackages.map((tp) => ({
            id: tp.id,
            startTime: tp.startTime.toISOString(),
            endTime: tp.endTime.toISOString(),
            venue_id: tp.venue_id,
            venueName: tp.Venue?.name || "Unknown",
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Error fetching time packages:", error);
        return NextResponse.json(
            { message: "Failed to fetch time packages" },
            { status: 500 }
        );
    }
}

// export async function POST(request) {
//     try {
//         const { date, startTime, endTime, venue_id } = await request.json();

//         if (!date || !startTime || !endTime || !venue_id) {
//             return NextResponse.json(
//                 { message: "Missing required fields" },
//                 { status: 400 }
//             );
//         }

//         const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//         if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
//             return NextResponse.json(
//                 { message: "Invalid time format, expected HH:mm" },
//                 { status: 400 }
//             );
//         }

//         if (endTime <= startTime) {
//             return NextResponse.json(
//                 { message: "End time must be after start time" },
//                 { status: 400 }
//             );
//         }

//         const venueId = Number(venue_id);
//         const venue = await prisma.venue.findUnique({ where: { id: venueId } });
//         if (!venue) {
//             return NextResponse.json(
//                 { message: `Venue ${venue_id} not found` },
//                 { status: 404 }
//             );
//         }

//         // Split the date string into year, month, and day.
//         const [year, month, day] = date.split("-").map(Number);
//         // Split the time strings.
//         const [startHour, startMinute] = startTime.split(":").map(Number);
//         const [endHour, endMinute] = endTime.split(":").map(Number);

//         // Create Date objects using the multi-argument Date constructor (months are 0-indexed).
//         // Create UTC-based Date objects
//         const start = new Date(Date.UTC(year, month - 1, day, startHour, startMinute));
//         const end = new Date(Date.UTC(year, month - 1, day, endHour, endMinute));
//         const dateOnly = new Date(Date.UTC(year, month - 1, day));


//         const created = await prisma.timePackage.create({
//             data: {
//                 date: dateOnly,
//                 startTime: start,
//                 endTime: end,
//                 venue_id: venueId,
//             },
//         });

//         return NextResponse.json({ success: true, data: created }, { status: 201 });
//     } catch (error) {
//         console.error("Error creating time package:", error);
//         return NextResponse.json(
//             { message: "Failed to create time package" },
//             { status: 500 }
//         );
//     }
// }

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const dateStr = searchParams.get("date");
//     const venueId = Number(searchParams.get("venueId"));

//     if (!dateStr || !venueId) return NextResponse.json([], { status: 400 });

//     try {
//         const startOfDay = new Date(dateStr + "T00:00:00");
//         const endOfDay = new Date(dateStr + "T23:59:59");

//         const slots = await prisma.timePackage.findMany({
//             where: {
//                 venue_id: venueId,
//                 date: {
//                     gte: startOfDay,
//                     lte: endOfDay,
//                 },
//                 booking: null,
//             },
//             orderBy: { startTime: 'asc' },
//             include: {
//                 Venue: { select: { name: true } },
//             },
//         });

//         const formatted = slots.map(tp => ({
//             id: tp.id,
//             startTime: tp.startTime,
//             endTime: tp.endTime,
//             venue_id: tp.venue_id,
//             venueName: tp.Venue?.name || "Unknown",
//         }));

//         return NextResponse.json(formatted);
//     } catch (error) {
//         console.error("Error fetching timeslots:", error);
//         return NextResponse.json([], { status: 500 });
//     }
// }


export async function POST(request) {
    try {
        const { date, startTime, endTime, venue_id } = await request.json();

        if (!date || !startTime || !endTime || !venue_id) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            return NextResponse.json(
                { message: "Invalid time format, expected HH:mm" },
                { status: 400 }
            );
        }

        const [year, month, day] = date.split("-").map(Number);
        const [startHour, startMinute] = startTime.split(":").map(Number);
        const [endHour, endMinute] = endTime.split(":").map(Number);

        const start = new Date(year, month - 1, day, startHour, startMinute);
        const end = new Date(year, month - 1, day, endHour, endMinute);

        if (end <= start) {
            // if end time is next day
            end.setDate(end.getDate() + 1);
        }

        const dateOnly = new Date(Date.UTC(year, month - 1, day)); // force midnight UTC


        const created = await prisma.timePackage.create({
            data: {
                date: dateOnly,
                startTime: start,
                endTime: end,
                venue_id: Number(venue_id),
            },
        });

        return NextResponse.json({ success: true, data: created }, { status: 201 });
    } catch (error) {
        console.error("Error creating time package:", error);
        return NextResponse.json(
            { message: "Failed to create time package" },
            { status: 500 }
        );
    }
}