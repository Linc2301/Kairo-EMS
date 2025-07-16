import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import * as yup from "yup";

const updateSchema = yup.object().shape({
    startTime: yup.date().required("Start time is required"),
    endTime: yup
        .date()
        .min(yup.ref("startTime"), "End time must be after start time")
        .required("End time is required"),
    venue_id: yup.number().integer().required("Venue ID is required"),
});

export async function GET(req, { params }) {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        const timePackage = await prisma.timePackage.findUnique({ where: { id } });
        if (!timePackage) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json(timePackage);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        const body = await req.json();
        const validated = await updateSchema.validate(body, { abortEarly: false });

        const updated = await prisma.timePackage.update({
            where: { id },
            data: {
                startTime: new Date(validated.startTime),
                endTime: new Date(validated.endTime),
                venue_id: validated.venue_id,
            },
        });

        return NextResponse.json({ message: "Updated successfully", data: updated });
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
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        await prisma.timePackage.delete({ where: { id } });
        return NextResponse.json({ message: "Deleted", id });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Delete failed", error: error.message }, { status: 500 });
    }
}
