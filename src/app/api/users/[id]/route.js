// import { NextResponse } from "next/server";
// import { prisma } from "@/src/lib/prisma";
// import bcrypt from "bcrypt";
// import formidable from "formidable";
// import fs from "fs/promises";
// import { Readable } from "stream";
// import { getToken } from "next-auth/jwt";

// // Disable built-in body parser
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// // Helper to parse multipart/form-data
// async function parseFormData(req) {
//     const form = formidable({ multiples: false, keepExtensions: true });

//     // Convert NextRequest to Node-compatible stream
//     const stream = Readable.from(await req.arrayBuffer());
//     const fakeReq = Object.assign(stream, {
//         headers: req.headers,
//         method: req.method,
//         url: req.url,
//     });

//     return new Promise((resolve, reject) => {
//         form.parse(fakeReq, (err, fields, files) => {
//             if (err) reject(err);
//             else {
//                 const normalizedFields = Object.fromEntries(
//                     Object.entries(fields).map(([key, val]) => [key, val[0]])
//                 );
//                 const normalizedFiles = Object.fromEntries(
//                     Object.entries(files).map(([key, val]) => [key, val[0]])
//                 );
//                 resolve({ fields: normalizedFields, files: normalizedFiles });
//             }
//         });
//     });
// }

// // ✅ GET user by ID
// export async function GET(req, context) {
//     try {
//         const { params } = context;

//         if (!params?.id) {
//             return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
//         }

//         const id = parseInt(params.id);
//         if (isNaN(id)) {
//             return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
//         }

//         const user = await prisma.user.findUnique({
//             where: { id },
//             select: { id: true, name: true, email: true, phone: true, photo: true },
//         });

//         if (!user) {
//             return NextResponse.json({ message: "User not found" }, { status: 404 });
//         }

//         return NextResponse.json(user);
//     } catch (error) {
//         console.error("GET Error:", error);
//         return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 });
//     }
// }

// export async function PUT(req, context) {
//   try {
//     const { params } = context;
//     const id = parseInt(params.id);

//     if (!id) {
//       return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
//     }

//     const { fields, files } = await parseFormData(req);

//     console.log("Fields:", fields);
//     console.log("Files:", files);

//     const { name, phone, password } = fields;

//     const updateData = {};
//     if (name) updateData.name = name;
//     if (phone) updateData.phone = phone;
//     if (password && password.length >= 6) {
//       updateData.password = await bcrypt.hash(password, 10);
//     }

//     if (files?.photo) {
//       try {
//         const fileBuffer = await fs.readFile(files.photo.filepath);
//         const mimeType = files.photo.mimetype || "image/jpeg";
//         const base64Photo = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
//         updateData.photo = base64Photo;
//       } catch (fileErr) {
//         console.error("Error reading photo file:", fileErr);
//         return NextResponse.json({ message: "Failed to process photo" }, { status: 500 });
//       }
//     }

//     const updatedUser = await prisma.user.update({
//       where: { id },
//       data: updateData,
//     });

//     return NextResponse.json({ message: "Profile updated", user: updatedUser });
//   } catch (error) {
//     console.error("PUT Error:", error); // 👈 This will tell you where it fails
//     return NextResponse.json({ message: "Failed to update profile", error: error.message }, { status: 500 });
//   }
// }


// export async function DELETE(req, context) {
//     try {
//         const { params } = context;
//         const id = parseInt(params.id);

//         if (!id) {
//             return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
//         }

//         const deleted = await prisma.user.delete({ where: { id } });

//         return NextResponse.json({ message: "User deleted", user: deleted });
//     } catch (error) {
//         console.error("DELETE Error:", error);
//         return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
//     }
// }

// import { NextResponse } from "next/server";
// import { prisma } from "@/src/lib/prisma";
// import bcrypt from "bcrypt";
// import formidable from "formidable";
// import fs from "fs/promises";
// import { Readable } from "stream";

// // Disable built-in body parser for file uploads
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// // Helper to parse form-data (multipart)
// async function parseFormData(req) {
//     const form = formidable({ multiples: false, keepExtensions: true });

//     const stream = Readable.from(await req.arrayBuffer());
//     const fakeReq = Object.assign(stream, {
//         headers: req.headers,
//         method: req.method,
//         url: "",
//     });

//     return new Promise((resolve, reject) => {
//         form.parse(fakeReq, (err, fields, files) => {
//             if (err) return reject(err);

//             const normalizedFields = Object.fromEntries(
//                 Object.entries(fields).map(([key, val]) => [key, Array.isArray(val) ? val[0] : val])
//             );
//             const normalizedFiles = Object.fromEntries(
//                 Object.entries(files).map(([key, val]) => [key, Array.isArray(val) ? val[0] : val])
//             );
//             resolve({ fields: normalizedFields, files: normalizedFiles });
//         });
//     });
// }

// app/api/users/[id]/route.js

import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

// Required to disable the default body parsing
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function PUT(req, { params }) {
    const userId = params.id;

    try {
        // Parse form data manually
        const formData = await req.formData();
        const name = formData.get("name");
        const phone = formData.get("phone");
        const password = formData.get("password");
        const photoFile = formData.get("photo");

        let photoPath;

        // If user uploaded a photo
        if (photoFile && typeof photoFile === "object" && photoFile.arrayBuffer) {
            const buffer = Buffer.from(await photoFile.arrayBuffer());
            const uploadsDir = path.join(process.cwd(), "public", "uploads");

            // Ensure uploads dir exists
            await mkdir(uploadsDir, { recursive: true });

            const ext = photoFile.name.split(".").pop();
            const fileName = `${uuidv4()}.${ext}`;
            photoPath = `/uploads/${fileName}`;

            await writeFile(path.join(uploadsDir, fileName), buffer);
        }

        const updateData = {
            name,
            phone,
        };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        if (photoPath) {
            updateData.photo = photoPath;
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: updateData,
        });

        return NextResponse.json({ user: updatedUser });
    } catch (err) {
        console.error("PUT Error:", err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}





// ✅ GET user by ID
export async function GET(req, context) {
    try {
        const id = parseInt(context.params.id);
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

// ✅ UPDATE user by ID (with optional photo and password)
// export async function PUT(req, context) {
//     try {
//         const id = parseInt(context.params.id);
//         if (isNaN(id)) {
//             return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
//         }

//         const { fields, files } = await parseFormData(req);

//         console.log("📄 Fields:", fields);
//         console.log("📁 Files:", files);

//         const { name, phone, password } = fields;

//         const updateData = {};
//         if (name) updateData.name = name;
//         if (phone) updateData.phone = phone;
//         if (password && password.length >= 6) {
//             updateData.password = await bcrypt.hash(password, 10);
//         }

//         if (files?.photo?.filepath) {
//             try {
//                 const fileBuffer = await fs.readFile(files.photo.filepath);
//                 const mimeType = files.photo.mimetype || "image/jpeg";
//                 const base64Photo = `data:${mimeType};base64,${fileBuffer.toString("base64")}`;
//                 updateData.photo = base64Photo;
//             } catch (photoErr) {
//                 console.error("Photo upload failed:", photoErr);
//                 return NextResponse.json({ message: "Failed to process photo" }, { status: 500 });
//             }
//         }

//         const updatedUser = await prisma.user.update({
//             where: { id },
//             data: updateData,
//         });

//         return NextResponse.json({ message: "Profile updated", user: updatedUser });
//     } catch (error) {
//         console.error("PUT Error:", error);
//         return NextResponse.json({ message: "Failed to update profile", error: error.message }, { status: 500 });
//     }
// }

// ✅ DELETE user by ID
export async function DELETE(req, context) {
    try {
        const id = parseInt(context.params.id);
        if (isNaN(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }

        const deletedUser = await prisma.user.delete({
            where: { id },
        });

        return NextResponse.json({ message: "User deleted", user: deletedUser });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ message: "Failed to delete user", error: error.message }, { status: 500 });
    }
}
