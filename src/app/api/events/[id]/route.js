import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import * as yup from "yup";


const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    photo: yup.string()
        .test("is-valid-photo", "Photo must be a valid URL or base64 image", value =>
            /^https?:\/\/.+/.test(value) || /^data:image\/[a-z]+;base64,/.test(value)
        )
        .required("Photo is required"),
});


// DELETE API
export async function DELETE(req, { params }) {
    const eventId = parseInt(params.id);
    try {
        await prisma.event.delete({
            where: { id: eventId },
        });
        return NextResponse.json({
            message: "Event is successfully deleted.",
            eventId,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Event not found or event deletion failed!"
        }, { status: 404 });
    }
}

// PUT API (Update event)
// export async function PUT(req, { params }) {
//     try {
//         const eventId = parseInt(params.id);
//         const body = await req.json();
//         const validatedData = await schema.validate(body, {
//             abortEarly: false,
//             stripUnknown: true,
//         });

//         await prisma.event.update({
//             where: { id: eventId },
//             data: validatedData,
//         });

//         return NextResponse.json({
//             message: "Event is successfully updated.",
//             eventId,
//         });
//     } catch (error) {
//         if (error.name === "ValidationError") {
//             return NextResponse.json({
//                 message: "Validation Failed",
//                 errors: error.inner.map((e) => ({
//                     path: e.path,
//                     message: e.message,
//                 })),
//             }, { status: 400 });
//         }

//         return NextResponse.json({
//             message: "Unexpected error",
//             error: error.message,
//         }, { status: 500 });
//     }
// }

// // GET API (Fetch single event)
// export async function GET(req, { params }) {
//     const eventId = parseInt(params.id);
//     const event = await prisma.event.findUnique({
//         where: {
//             id: eventId,
//         },
//     });

//     return NextResponse.json(event);
// }

export async function POST(req) {
    try {
        const formData = await req.formData();

        const name = formData.get("name");
        const description = formData.get("description");
        const file = formData.get("photo");

        if (!name || !description || !file) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), {
                status: 400,
            });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const base64Image = `data:${file.type};base64,${base64}`;

        // ✅ 1. Create the event first
        const event = await prisma.event.create({
            data: {
                name,
                description,
                photo: base64Image,
            },
        });

        // ✅ 2. Fetch all users
        const users = await prisma.user.findMany({
            select: { id: true },
        });

        if (!users.length) {
            console.warn("⚠ No users found to notify.");
        }

        // ✅ 3. Create notifications
        const notifications = users.map((user) => ({
            userId: user.id,
            message: `🎉 New event "${event.name}" has been added!`,
            eventId: event.id, // optional if schema supports it
        }));

        const result = await prisma.notification.createMany({
            data: notifications,
        });

        console.log("✅ Notifications created:", result.count);

        return Response.json({ message: "Event created", event }, { status: 201 });
    } catch (error) {
        console.error("POST error:", error);
        return new Response(JSON.stringify({ message: "Failed to create event" }), {
            status: 500,
        });
    }
}
