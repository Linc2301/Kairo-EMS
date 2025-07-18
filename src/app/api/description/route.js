import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";

// Disable Next.js body parser to handle multipart/form-data
export const config = {
    api: {
        bodyParser: false,
        sizeLimit: "10mb", // Increase if needed for larger images
    },
};

async function parseForm(req) {
    const form = formidable({
        multiples: false,
        keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else {
                const normalizedFields = Object.fromEntries(
                    Object.entries(fields).map(([key, value]) => [key, value[0]])
                );
                const normalizedFiles = Object.fromEntries(
                    Object.entries(files).map(([key, value]) => [key, value[0]])
                );
                resolve({ fields: normalizedFields, files: normalizedFiles });
            }
        });
    });
}


// Improved form parsing with error handling
// POST create new event
export async function POST(req) {
    try {
        const formData = await req.formData();

        const description = formData.get("description");
        const file = formData.get("photo");

        if (!description || !file) {
            return new Response(JSON.stringify({ message: "Missing required fields" }), {
                status: 400,
            });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64 = buffer.toString("base64");
        const base64Image = `data:${file.type};base64,${base64}`;

        const event = await prisma.description.create({
            data: {
                description,
                photo: base64Image,
            },
        });

        return Response.json({ message: "Event created", event }, { status: 201 });
    } catch (error) {
        console.error("POST error:", error);
        return new Response(JSON.stringify({ message: "Failed to create event" }), {
            status: 500,
        });
    }
}

// GET single event with photo
export async function GET() {
    const events = await prisma.description.findMany({
        select: {
            id: true,
            description: true,
            photo: true, // or false if you're omitting image on list
        },
    });

    return Response.json(events);
}


