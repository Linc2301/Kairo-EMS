import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, description, photo, price, venue_id } = body;

        if (!name || !description || !photo || !price || !venue_id) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const newService = await prisma.floralService.create({
            data: {
                name,
                description,
                photo,
                price: parseFloat(price),
                venue_id: parseInt(venue_id),
            },
        });

        return NextResponse.json({ message: "Service created", floralService: newService }, { status: 201 });
    } catch (error) {
        console.error("POST /floralServices error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get("venue_id");

    try {
        const services = await prisma.floralService.findMany({
            where: venueId
                ? {
                    venue_id: parseInt(venueId),
                }
                : {},

            select: {
                id: true,
                name: true,
                description: true,
                photo: true,
                price: true,
                venue_id: true,
                Venue: {
                    select: { name: true },
                },
            },
        });

        const formatted = services.map((service) => ({
            ...service,
            venueName: service.Venue?.name || null,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("GET /floralServices error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const eventId = searchParams.get("eventId");

//     try {
//         // Enhanced validation
//         if (eventId) {
//             const parsedId = parseInt(eventId);
//             if (isNaN(parsedId)) {
//                 return NextResponse.json(
//                     { message: "Invalid eventId parameter" },
//                     { status: 400 }
//                 );
//             }

//             // Verify event exists
//             const eventExists = await prisma.event.findUnique({
//                 where: { id: parsedId }
//             });

//             if (!eventExists) {
//                 return NextResponse.json(
//                     { message: "Event not found" },
//                     { status: 404 }
//                 );
//             }
//         }

//         const services = await prisma.floralService.findMany({
//             where: eventId ? { eventId: parseInt(eventId) } : {},
//             select: {
//                 id: true,
//                 name: true,
//                 description: true,
//                 photo: true,
//                 price: true,
//                 eventId: true,
//                 Event: {
//                     select: { name: true },
//                 },
//             },
//             orderBy: { name: "asc" },
//         });

//         const formatted = services.map((service) => ({
//             ...service,
//             venueName: service.Event?.name || null,
//             price: Number(service.price),
//         }));

//         return NextResponse.json(formatted);
//     } catch (error) {
//         console.error("GET /floralServices error:", error);
//         return NextResponse.json(
//             { message: "Internal Server Error" },
//             { status: 500 }
//         );
//     }
// }

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const eventId = searchParams.get("eventId");

//     if (!eventId || isNaN(eventId)) {
//         return NextResponse.json({ message: "Invalid eventId" }, { status: 400 });
//     }

//     try {
//         const floralServices = await prisma.floralService.findMany({
//             where: {
//                 eventId: parseInt(eventId),
//             },
//         });

//         return NextResponse.json(floralServices);
//     } catch (error) {
//         console.error("Error fetching floral services:", error);
//         return NextResponse.json({ message: "Failed to load floral services" }, { status: 500 });
//     }
// }