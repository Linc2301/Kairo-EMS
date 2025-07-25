// app/api/events/route.js
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: false,
        sizeLimit: "10mb",
    },
};

// POST - Create event
export async function POST(req) {
    try {
        const formData = await req.formData();

        const name = formData.get("name");
        const description = formData.get("description");
        const file = formData.get("photo");

        if (!name || !description || !file) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const base64Image = `data:${file.type};base64,${base64}`;

        const event = await prisma.event.create({
            data: {
                name,
                description,
                photo: base64Image,
            },
        });

        return NextResponse.json({ message: "Event created", event }, { status: 201 });
    } catch (error) {
        console.error("POST error:", error);
        return NextResponse.json({ message: "Failed to create event" }, { status: 500 });
    }
}

// GET - Fetch all events
export async function GET() {
    try {
        const events = await prisma.event.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                photo: true,
            },
        });

        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch events" }, { status: 500 });
    }
}


// import { NextResponse } from "next/server";
// import { prisma } from "@/src/lib/prisma";
// import formidable from "formidable";
// import fs from "fs/promises";
// import path from "path";

// export const config = {
//     api: {
//         bodyParser: false,
//         sizeLimit: "10mb",
//     },
// };

// async function parseForm(req) {
//     const form = formidable({
//         multiples: false,
//         keepExtensions: true,
//     });

//     return new Promise((resolve, reject) => {
//         form.parse(req, (err, fields, files) => {
//             if (err) reject(err);
//             else {
//                 const normalizedFields = Object.fromEntries(
//                     Object.entries(fields).map(([key, value]) => [key, value[0]])
//                 );
//                 const normalizedFiles = Object.fromEntries(
//                     Object.entries(files).map(([key, value]) => [key, value[0]])
//                 );
//                 resolve({ fields: normalizedFields, files: normalizedFiles });
//             }
//         });
//     });
// }

// export async function POST(req) {
//     try {
//         const formData = await req.formData();

//         const name = formData.get("name");
//         const description = formData.get("description");
//         const file = formData.get("photo");

//         if (!name || !description || !file) {
//             return new Response(JSON.stringify({ message: "Missing required fields" }), {
//                 status: 400,
//             });
//         }

//         const arrayBuffer = await file.arrayBuffer();
//         const buffer = Buffer.from(arrayBuffer);
//         const base64 = buffer.toString("base64");
//         const base64Image = data: ${ file.type }; base64, ${ base64 };

//         const event = await prisma.event.create({
//             data: {
//                 name,
//                 description,
//                 photo: base64Image,
//             },
//         });

//         return Response.json({ message: "Event created", event }, { status: 201 });
//     } catch (error) {
//         console.error("POST error:", error);
//         return new Response(JSON.stringify({ message: "Failed to create event" }), {
//             status: 500,
//         });
//     }
// }


// export async function GET() {
//     const events = await prisma.event.findMany({
//         select: {
//             id: true,
//             name: true,
//             description: true,
//             photo: true,
//         },
//     });

//     return Response.json(events);
// }