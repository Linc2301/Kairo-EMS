import { NextResponse } from 'next/server';
import { prisma } from "@/src/lib/prisma";


// GET a specific favourite by ID
export async function GET(request, { params }) {
    try {
        const { id } = params;

        const favourite = await prisma.favourite.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                Event: true,
                user: true,
            },
        });

        if (!favourite) {
            return NextResponse.json(
                { error: 'Favourite not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(favourite);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch favourite', details: error.message },
            { status: 500 }
        );
    }
}

// DELETE - Remove a favourite
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        // First check if the favourite exists
        const favourite = await prisma.favourite.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!favourite) {
            return NextResponse.json(
                { error: 'Favourite not found' },
                { status: 404 }
            );
        }

        await prisma.favourite.delete({
            where: {
                id: parseInt(id),
            },
        });

        return NextResponse.json(
            { message: 'Favourite removed successfully' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to remove favourite', details: error.message },
            { status: 500 }
        );
    }
}

// PUT - Update a favourite (though you might not need this for favourites)
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { eventId } = await request.json();

        if (!eventId) {
            return NextResponse.json(
                { error: 'Event ID is required' },
                { status: 400 }
            );
        }

        const updatedFavourite = await prisma.favourite.update({
            where: {
                id: parseInt(id),
            },
            data: {
                eventId: parseInt(eventId),
            },
            include: {
                Event: true,
            },
        });

        return NextResponse.json(updatedFavourite);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update favourite', details: error.message },
            { status: 500 }
        );
    }
}