import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// GET single notification
export async function GET(request, { params }) {
    try {
        const { id } = params;

        // Validate ID
        if (isNaN(Number(id))) {
            return NextResponse.json(
                { error: 'Invalid notification ID' },
                { status: 400 }
            );
        }

        const notification = await prisma.notification.findUnique({
            where: { id: Number(id) },
        });

        if (!notification) {
            return NextResponse.json(
                { error: 'Notification not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(notification);
    } catch (error) {
        console.error('Error fetching notification:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notification', details: error.message },
            { status: 500 }
        );
    }
}

// UPDATE notification
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const { title, message } = await request.json();

        // Validate ID
        if (isNaN(Number(id))) {
            return NextResponse.json(
                { error: 'Invalid notification ID' },
                { status: 400 }
            );
        }

        // Validate input
        if (!title || !message) {
            return NextResponse.json(
                { error: 'Title and message are required' },
                { status: 400 }
            );
        }

        const updatedNotification = await prisma.notification.update({
            where: { id: Number(id) },
            data: { title, message },
        });

        return NextResponse.json(updatedNotification);
    } catch (error) {
        console.error('Error updating notification:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Notification not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to update notification', details: error.message },
            { status: 500 }
        );
    }
}

// DELETE notification
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        // Validate ID
        if (isNaN(Number(id))) {
            return NextResponse.json(
                { error: 'Invalid notification ID' },
                { status: 400 }
            );
        }

        await prisma.notification.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json(
            { message: 'Notification deleted successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting notification:', error);

        if (error.code === 'P2025') {
            return NextResponse.json(
                { error: 'Notification not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete notification', details: error.message },
            { status: 500 }
        );
    }
}

export async function PATCH(request, { params }) {
    try {
        const { id } = params;
        const { read } = await request.json();

        await prisma.notification.update({
            where: { id: Number(id) },
            data: { read },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating notification:', error);
        return NextResponse.json(
            { error: 'Failed to update notification' },
            { status: 500 }
        );
    }
}