import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import * as yup from "yup";

const updateSchema = yup.object().shape({
    startTime: yup.string().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time").required(),
    endTime: yup
        .string()
        .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time")
        .test("is-after-start", "End time must be after start time", function (value) {
            const { startTime } = this.parent;
            return value > startTime;
        })
        .required(),
    venue_id: yup.number().integer().required(),
});

export async function GET(req, { params }) {
    const id = Number(params.id);
    if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        const timePackage = await prisma.timePackage.findUnique({
            where: { id },
            include: { Venue: { select: { name: true } } },
        });

        if (!timePackage) return NextResponse.json({ message: "Not found" }, { status: 404 });

        return NextResponse.json({
            id: timePackage.id,
            startTime: timePackage.startTime.toISOString().slice(11, 16),
            endTime: timePackage.endTime.toISOString().slice(11, 16),
            venue_id: timePackage.venue_id,
            venueName: timePackage.Venue?.name || "N/A",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const id = Number(params.id);
    if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        const body = await req.json();
        await updateSchema.validate(body, { abortEarly: false });

        const fixedDate = "1970-01-01";
        const start = new Date(`${fixedDate}T${body.startTime}:00Z`);
        const end = new Date(`${fixedDate}T${body.endTime}:00Z`);

        const venue = await prisma.venue.findUnique({ where: { id: Number(body.venue_id) } });
        if (!venue) {
            return NextResponse.json({ message: `Venue ${body.venue_id} not found` }, { status: 404 });
        }

        const updated = await prisma.timePackage.update({
            where: { id },
            data: {
                startTime: start,
                endTime: end,
                venue_id: Number(body.venue_id),
            },
        });

        return NextResponse.json({ message: "Updated successfully", data: updated });
    } catch (error) {
        if (error.name === "ValidationError") {
            return NextResponse.json(
                {
                    message: "Validation failed",
                    errors: error.inner.map(e => ({ field: e.path, message: e.message })),
                },
                { status: 400 }
            );
        }
        console.error(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const id = Number(params.id);
    if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        await prisma.timePackage.delete({ where: { id } });
        return NextResponse.json({ message: "Deleted successfully", id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Delete failed", error: error.message }, { status: 500 });
    }
}
