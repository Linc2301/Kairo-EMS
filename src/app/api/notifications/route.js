// import { NextResponse } from 'next/server';
// import { prisma } from '@/src/lib/prisma';

// export async function POST(req) {
//     try {
//         const { title, message } = await req.json();

//         if (!title || !message) {
//             return NextResponse.json(
//                 { error: 'Title and message are required' },
//                 { status: 400 }
//             );
//         }

//         const notification = await prisma.notification.create({
//             data: { title, message }
//         });

//         return NextResponse.json(notification, { status: 201 });
//     } catch (error) {
//         console.error('Notification creation error:', error);
//         return NextResponse.json(
//             { error: 'Failed to create notification' },
//             { status: 500 }
//         );
//     }
// }
import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
    try {
        const notifications = await prisma.notification.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json(
            { error: 'Failed to fetch notifications' },
            { status: 500 }
        );
    }
}

export async function PATCH() {
    try {
        await prisma.notification.updateMany({
            where: { read: false },
            data: { read: true },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error marking all as read:', error);
        return NextResponse.json(
            { error: 'Failed to mark all as read' },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const { title, message } = await req.json();

        // Debug log
        console.log('Creating notification with:', { title, message });

        const notification = await prisma.notification.create({
            data: { title, message }
        });

        // Debug log
        console.log('Created notification:', notification);

        return NextResponse.json(notification, { status: 201 });
    } catch (error) {
        console.error('Creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create notification', details: error.message },
            { status: 500 }
        );
    }
}