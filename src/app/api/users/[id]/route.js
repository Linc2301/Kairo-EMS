import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import formidable from "formidable";
import fs from "fs/promises";
import { Readable } from "stream";
import { getToken } from "next-auth/jwt";

// Disable built-in body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper to parse multipart/form-data
async function parseFormData(req) {
    const form = formidable({ multiples: false, keepExtensions: true });

    // Convert NextRequest to Node-compatible stream
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

// ✅ GET user by ID
export async function GET(req, context) {
    try {
        const { params } = context;

        if (!params?.id) {
            return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
        }

        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id },
            select: { id: true, name: true, email: true, phone: true, photo: true },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 });
    }
}

// ✅ PUT (update) user
export async function PUT(req, context) {
    try {
        const token = await getToken({ req });

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { params } = context;
        const id = parseInt(params.id);

        if (!id || token.id !== id) {
            return NextResponse.json({ message: "Unauthorized update" }, { status: 403 });
        }

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
            where: { id },
            data: updateData,
        });

        return NextResponse.json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        console.error("PUT Error:", error);
        return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
    }
}

// ✅ DELETE user
export async function DELETE(req, context) {
    try {
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { params } = context;
        const id = parseInt(params.id);

        if (!id || token.id !== id) {
            return NextResponse.json({ message: "Unauthorized delete" }, { status: 403 });
        }

        const deleted = await prisma.user.delete({ where: { id } });

        return NextResponse.json({ message: "User deleted", user: deleted });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
    }
}
