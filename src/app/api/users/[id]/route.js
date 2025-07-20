
import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import formidable from "formidable";
import fs from "fs/promises";
import { Readable } from "stream";

// Disable built-in body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper to parse multipart/form-data
async function parseFormData(req) {
    const form = formidable({ multiples: false, keepExtensions: true });

    // Convert NextRequest to Node.js-compatible readable stream
    const stream = Readable.from(await req.arrayBuffer());
    const fakeReq = Object.assign(stream, {
        headers: req.headers,
        method: req.method,
        url: req.url,
    });

    return new Promise((resolve, reject) => {
        form.parse(fakeReq, (err, fields, files) => {
            if (err) reject(err);
            else {
                const normalizedFields = Object.fromEntries(
                    Object.entries(fields).map(([key, val]) => [key, val[0]])
                );
                const normalizedFiles = Object.fromEntries(
                    Object.entries(files).map(([key, val]) => [key, val[0]])
                );
                resolve({ fields: normalizedFields, files: normalizedFiles });
            }
        });
    });
}

// GET /api/user/[id] — Fetch single user
export async function GET(req, { params }) {
    try {
        const { id } = params;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch user", error: error.message },
            { status: 500 }
        );
    }
}

// PUT /api/user/[id] — Update user profile
export async function PUT(req, { params }) {
    
    try {
        const { id } = params;
        const { fields, files } = await parseFormData(req);

        const { name, phone, password } = fields;

        const updateData = {};

        if (name) updateData.name = name;
        if (phone) updateData.phone = phone;

        if (password && password.length >= 6) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        if (files.photo) {
            const fileBuffer = await fs.readFile(files.photo.filepath);
            const mimeType = files.photo.mimetype || "image/jpeg";
            const base64Photo = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
            updateData.photo = base64Photo;
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: updateData,
        });

        return NextResponse.json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("User update error:", error);
        return NextResponse.json(
            { message: "Failed to update user", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        const id = parseInt(params.id); // only if your ID is a number
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        const deleted = await prisma.user.delete({
            where: { id }, //need to mark this
        });

        return NextResponse.json({
            message: "Contact successfully deleted",
            user: deleted,
        });
    } catch (error) {
        console.error("Delete API Error:", error);
        return NextResponse.json(
            {
                message: "Failed to delete contact",
                error: error.message,
            },
            { status: 500 }
        );
    }
}