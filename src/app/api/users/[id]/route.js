// app/api/users/[id]/route.js
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

// Helper function to handle photo upload
async function handlePhotoUpload(photoFile) {
  if (!photoFile || typeof photoFile !== "object" || !photoFile.arrayBuffer) {
    return null;
  }

  const buffer = Buffer.from(await photoFile.arrayBuffer());
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const ext = photoFile.name.split(".").pop();
  const fileName = `${uuidv4()}.${ext}`;
  const photoPath = `/uploads/${fileName}`;

  await writeFile(path.join(uploadsDir, fileName), buffer);
  return photoPath;
}

// ✅ PUT /api/users/[id] - update user with status management
export async function PUT(req, { params }) {
  const userId = parseInt(params.id, 10);

  if (isNaN(userId)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const status = formData.get("status");
    const photoFile = formData.get("photo");

    // Validate status
    const validStatuses = ["active", "inactive", "suspended"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const photoPath = await handlePhotoUpload(photoFile);

    const updateData = {
      name,
      phone,
      ...(status && { status }),
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (photoPath) {
      updateData.photo = photoPath;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("PUT /api/users/[id] error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ✅ GET /api/users/[id] - fetch user with bookings + reviews + status
export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        photo: true,
        status: true,
        isAdmin: true,
        // Update these to match your actual Prisma model relations
        Booking: true,
        Review: true,
        Favourite: true
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return NextResponse.json(
      { message: "Failed to fetch user", error: error.message },
      { status: 500 }
    );
  }
}
// ✅ PATCH /api/users/[id] - update user status specifically
export async function PATCH(req, { params }) {
  try {
    const userId = parseInt(params.id, 10);
    const { status } = await req.json();

    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    // Check if user exists first
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, isAdmin: true, status: true }
    });

    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Prevent status change for admin users
    if (existingUser.isAdmin === 'admin') {
      return NextResponse.json(
        { message: "Cannot change status of admin users" },
        { status: 403 }
      );
    }

    const validStatuses = ["active", "inactive", "suspended"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { status },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        isAdmin: true
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("PATCH /api/users/[id] error:", error);

    if (error.code === 'P2025') {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Failed to update user status", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE user by ID
export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Failed to delete user", error: error.message },
      { status: 500 }
    );
  }
}