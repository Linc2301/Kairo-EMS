import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import * as yup from "yup";

const fixedDate = "1970-01-01";

const withFixedDate = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const date = new Date(fixedDate);
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    return date;
};

const createSchema = yup.object({
    startTime: yup.date().required(),
    endTime: yup.date().min(yup.ref("startTime")).required(),

    venue_id: yup.number().integer().required("Venue ID is required"),
});

export async function POST(request) {
    try {
        const body = await request.json();
        const validated = await createSchema.validate(body, { abortEarly: false });

        const start = withFixedDate(validated.startTime);
        const end = withFixedDate(validated.endTime);

        if (end <= start) {
            return NextResponse.json(
                { message: "End time must be after start time" },
                { status: 400 }
            );
        }

        const venueExists = await prisma.venue.findUnique({
            where: { id: validated.venue_id },
        });

        if (!venueExists) {
            return NextResponse.json(
                { message: `Venue with id ${validated.venue_id} not found` },
                { status: 400 }
            );
        }

        const created = await prisma.timePackage.create({
            data: {
                startTime: start,
                endTime: end,
                venue_id: validated.venue_id,
            },
        });

        return NextResponse.json(
            { message: "Created successfully", data: created },
            { status: 201 }
        );
    } catch (error) {
        if (error.name === "ValidationError") {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors: error.inner.map((e) => ({ field: e.path, message: e.message })),
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                message: "Internal Server Error",
                errorMessage: error.message || "Unknown error",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const timePackages = await prisma.timePackage.findMany({
            include: { Venue: { select: { name: true } } },
        });

        const formatted = timePackages.map((tp) => ({
            id: tp.id,
            startTime: tp.startTime.toTimeString().slice(0, 5),
            endTime: tp.endTime.toTimeString().slice(0, 5),
            venue_id: tp.venue_id,
            venueName: tp.Venue?.name || "N/A",
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
