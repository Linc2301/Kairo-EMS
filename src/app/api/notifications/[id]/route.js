import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

// GET /api/notifications/[id] - Get notifications for a user
// export async function GET(_request, context) {
//     const params = context.params;
//     const userId = Number(params.id);

//     if (isNaN(userId)) {
//         return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
//     }

//     try {
//         const notifications = await prisma.notification.findMany({
//             where: { userId },
//             orderBy: { createdAt: "desc" },
//         });
//         return NextResponse.json(notifications);
//     } catch (error) {
//         console.error(" GET /api/notifications/[id] error:", error);
//         return NextResponse.json({ message: "Failed to fetch notifications" }, { status: 500 });
//     }
// }
// export async function GET(_request, context) {
//     const params = await context.params;  //  Await this
//     const userId = Number(params.id);

//     if (isNaN(userId)) {
//         return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
//     }

//     try {
//         const notifications = await prisma.notification.findMany({
//             where: { userId },
//             orderBy: { createdAt: "desc" },
//         });
//         return NextResponse.json(notifications);
//     } catch (error) {
//         console.error(" GET /api/notifications/[id] error:", error);
//         return NextResponse.json({ message: "Failed to fetch notifications" }, { status: 500 });
//     }
// }

// console.log("API fetching notifications for userId:", userId);
// console.log("Result:", notifications);


// // POST /api/notifications/[id] - Create a notification for a user
// export async function POST(request, context) {
//     const params = await context.params; //
//     const userId = Number(params.id);


//     if (isNaN(userId)) {
//         return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
//     }

//     try {
//         const body = await request.json();
//         const { message, eventId } = body;

//         if (!message) {
//             return NextResponse.json({ message: "Message is required" }, { status: 400 });
//         }

//         const newNotification = await prisma.notification.create({
//             data: {
//                 userId,
//                 message,
//                 eventId: eventId || null,
//                 isRead: false,
//             },
//         });

//         return NextResponse.json(newNotification, { status: 201 });
//     } catch (error) {
//         console.error(" POST /api/notifications/[id] error:", error);
//         return NextResponse.json({ message: "Failed to create notification" }, { status: 500 });
//     }
// }
