import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { prisma } from "@/src/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favourites = await prisma.favourite.findMany({
        where: { user_id: session.user.id },
        include: { Event: true },
    });

    return NextResponse.json(favourites);
}

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventId } = await request.json();
    if (!eventId) return NextResponse.json({ error: "Event ID is required" }, { status: 400 });

    const existing = await prisma.favourite.findFirst({
        where: { user_id: session.user.id, eventId: parseInt(eventId) },
    });

    if (existing) return NextResponse.json({ error: "Already favourited" }, { status: 400 });

    const favourite = await prisma.favourite.create({
        data: { user_id: session.user.id, eventId: parseInt(eventId) },
        include: { Event: true },
    });

    return NextResponse.json(favourite, { status: 201 });
}
