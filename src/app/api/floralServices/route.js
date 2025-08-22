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

// api/floralServices/route.js
// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const venueId = searchParams.get("venue_id");

//     try {
//         const services = await prisma.floralService.findMany({
//             where: venueId
//                 ? {
//                     venue_id: parseInt(venueId),
//                 }
//                 : {},
//             include: {
//                 Venue: {
//                     include: {
//                         Event: {
//                             select: { name: true },
//                         },
//                     },
//                 },
//             },
//         });

//         const formatted = services.map((service) => ({
//             ...service,
//             venueName: service.Venue?.name || null,
//             eventName: service.Venue?.Event?.name || null,
//         }));

//         return NextResponse.json(formatted);
//     } catch (error) {
//         console.error("GET /floralServices error:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get('venueId');

    try {
        let whereClause = {};

        if (venueId) {
            whereClause.venue_id = parseInt(venueId);
        }

        const services = await prisma.floralService.findMany({
            where: whereClause,
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

        return NextResponse.json(services);
    } catch (error) {
        console.error("GET /floralServices error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}