import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import * as yup from "yup";

const schema = yup.object().shape({
    description: yup.string().required("Description is required"),
    photo: yup
        .string()
        .test(
            "is-valid-photo",
            "Photo must be a valid URL or base64 image",
            (value) =>
                /^https?:\/\/.+/.test(value) || /^data:image\/[a-z]+;base64,/.test(value)
        )
        .required("Photo is required"),
});

// DELETE API
export async function DELETE(req, { params }) {
    const id = parseInt(params.id);

    if (isNaN(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    try {
        await prisma.description.delete({
            where: { id },
        });

        return NextResponse.json({
            message: "Description deleted successfully.",
            id,
        });
    } catch (error) {
        console.error("Delete error:", error);
        return NextResponse.json(
            { message: "Delete failed or record not found.", error: error.message },
            { status: 404 }
        );
    }
}

// UPDATE API 
export async function PUT(req, { params }) {
    try {
        const eventId = parseInt(params.id);
        const body = await req.json();
        const validatedData = await schema.validate(body, {
            abortEarly: false,
            stripUnknown: true,
        });

        await prisma.description.update({
            where: { id: eventId },
            data: validatedData,
        });

        return NextResponse.json({
            message: "Event is successfully updated.",
            eventId,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return NextResponse.json(
                {
                    message: "Validation Failed",
                    errors: error.inner.map((e) => ({
                        path: e.path,
                        message: e.message,
                    })),
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                message: "Unexpected error",
                error: error.message,
            },
            { status: 500 }
        );
    }
}

// GET API (Fetch single description)
export async function GET(req, { params }) {
    const eventId = parseInt(params.id);
    const event = await prisma.description.findUnique({
        where: {
            id: eventId,
        },
    });

    return NextResponse.json(event);
}
