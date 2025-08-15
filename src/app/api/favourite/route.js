import { NextResponse } from 'next/server';
import { prisma } from "@/src/lib/prisma";


// GET all favourites for a user (you might want to add user authentication)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        const favourites = await prisma.favourite.findMany({
            where: {
                user_id: parseInt(userId),
            },
            include: {
                Event: true,
            },
        });

        return NextResponse.json(favourites);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch favourites', details: error.message },
            { status: 500 }
        );
    }
}

// POST - Add a new favourite
export async function POST(request) {
    try {
        const { user_id, eventId } = await request.json();

        if (!user_id || !eventId) {
            return NextResponse.json(
                { error: 'User ID and Event ID are required' },
                { status: 400 }
            );
        }

        // Check if the favourite already exists
        const existingFavourite = await prisma.favourite.findFirst({
            where: {
                user_id: parseInt(user_id),
                eventId: parseInt(eventId),
            },
        });

        if (existingFavourite) {
            return NextResponse.json(
                { error: 'This event is already in your favourites' },
                { status: 400 }
            );
        }

        const newFavourite = await prisma.favourite.create({
            data: {
                user_id: parseInt(user_id),
                eventId: parseInt(eventId),
            },
            include: {
                Event: true,
            },
        });

        return NextResponse.json(newFavourite, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to add favourite', details: error.message },
            { status: 500 }
        );
    }
}