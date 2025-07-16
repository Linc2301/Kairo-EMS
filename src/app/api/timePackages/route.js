import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
    try {
        const timePackages = await prisma.timePackage.findMany({
            include: { Venue: { select: { name: true } } },
        });

        // Format times as HH:MM without date
        const formatted = timePackages.map((tp) => ({
            id: tp.id,
            startTime: tp.startTime.toTimeString().slice(0, 5),
            endTime: tp.endTime.toTimeString().slice(0, 5),
            venue_id: tp.venue_id,
            venueName: tp.Venue?.name || "N/A",
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Error fetching time packages:", error);
        return NextResponse.json(
            { message: "Failed to fetch time packages", error: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.startTime || !body.endTime || !body.venue_id) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate time format (HH:mm)
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(body.startTime) || !timeRegex.test(body.endTime)) {
            return NextResponse.json(
                { message: "Invalid time format (expected HH:mm)" },
                { status: 400 }
            );
        }

        // Check if end time is after start time
        if (body.endTime <= body.startTime) {
            return NextResponse.json(
                { message: "End time must be after start time" },
                { status: 400 }
            );
        }

        // Check if venue exists
        const venueExists = await prisma.venue.findUnique({
            where: { id: Number(body.venue_id) },
        });

        if (!venueExists) {
            return NextResponse.json(
                { message: `Venue with id ${body.venue_id} not found` },
                { status: 404 }
            );
        }

        // Use a fixed date (1970-01-01) since we only care about time
        const fixedDate = "1970-01-01";
        const startTime = new Date(`${fixedDate}T${body.startTime}:00`);
        const endTime = new Date(`${fixedDate}T${body.endTime}:00`);

        // Create the time package
        const created = await prisma.timePackage.create({
            data: {
                startTime,
                endTime,
                venue_id: Number(body.venue_id),
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Time package created successfully",
                data: {
                    id: created.id,
                    startTime: body.startTime,
                    endTime: body.endTime,
                    venue_id: created.venue_id
                }
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating time package:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to create time package",
                error: error.message
            },
            { status: 500 }
        );
    }
}