import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET a specific favourite by ID (only if belongs to user)
export async function GET(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const favourite = await prisma.favourite.findUnique({
            where: { id: parseInt(id) },
            include: { Event: true, user: true },
        });

        if (!favourite || favourite.user_id !== session.user.id) {
            return NextResponse.json({ error: "Favourite not found" }, { status: 404 });
        }

        return NextResponse.json(favourite);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch favourite", details: error.message },
            { status: 500 }
        );
    }
}

// DELETE - Remove a favourite (only if belongs to user)
export async function DELETE(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const favourite = await prisma.favourite.findUnique({
            where: { id: parseInt(id) },
        });

        if (!favourite || favourite.user_id !== session.user.id) {
            return NextResponse.json({ error: "Not allowed" }, { status: 403 });
        }

        await prisma.favourite.delete({ where: { id: parseInt(id) } });

        return NextResponse.json({ message: "Favourite removed successfully" });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to remove favourite", details: error.message },
            { status: 500 }
        );
    }
}

// PUT - Update favourite (not usually needed, but protected)
export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        const { eventId } = await request.json();

        if (!eventId) {
            return NextResponse.json(
                { error: "Event ID is required" },
                { status: 400 }
            );
        }

        const favourite = await prisma.favourite.findUnique({
            where: { id: parseInt(id) },
        });

        if (!favourite || favourite.user_id !== session.user.id) {
            return NextResponse.json({ error: "Not allowed" }, { status: 403 });
        }

        const updatedFavourite = await prisma.favourite.update({
            where: { id: parseInt(id) },
            data: { eventId: parseInt(eventId) },
            include: { Event: true },
        });

        return NextResponse.json(updatedFavourite);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update favourite", details: error.message },
            { status: 500 }
        );
    }
}
