import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// export async function POST(req) {
//     try {
//         const body = await req.json();
//         const { name, description, photo, price, venue_id } = body;

//         if (!name || !description || !photo || !price || !venue_id) {
//             return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//         }

//         const newVenueType = await prisma.venueType.create({
//             data: {
//                 name,
//                 description,
//                 photo, // photo in base64
//                 price: parseFloat(price),
//                 venue_id: parseInt(venue_id),
//             },
//         });

//         return NextResponse.json({ message: "VenueType created", venueType: newVenueType }, { status: 201 });
//     } catch (error) {
//         console.error("VenueType creation error:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }
export async function POST(req) {
    try {
        const body = await req.json();
        const { name, description, photo, price, eventId, venue_id } = body;

        if (!name || !description || !photo || !price || (!venue_id && !eventId)) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // Optionally infer venue_id from eventId
        let resolvedVenueId = venue_id;
        if (!resolvedVenueId && eventId) {
            const venue = await prisma.venue.findFirst({
                where: { eventId: parseInt(eventId) },
                select: { id: true },
            });

            if (!venue) {
                return NextResponse.json({ message: "No venue found for the given eventId" }, { status: 404 });
            }

            resolvedVenueId = venue.id;
        }

        const newVenueType = await prisma.venueType.create({
            data: {
                name,
                description,
                photo,
                price: parseFloat(price),
                venue_id: parseInt(resolvedVenueId),
            },
        });

        return NextResponse.json({ message: "VenueType created", venueType: newVenueType }, { status: 201 });
    } catch (error) {
        console.error("VenueType creation error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}




// export async function GET() {
//     try {
//         const venueTypes = await prisma.venueType.findMany({
//             select: {
//                 id: true,
//                 name: true,
//                 photo: true,
//                 description: true,
//                 price: true,
//                 venue_id: true,
//                 Venue: {
//                     select: {
//                         name: true,
//                     },
//                 },
//             },
//         });

//         const formatted = venueTypes.map((type) => ({
//             ...type,
//             venueName: type.Venue?.name || null,
//         }));

//         return NextResponse.json(formatted);
//     } catch (error) {
//         console.error("GET venueType error:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get("venueId");

    try {
        const venueTypes = await prisma.venueType.findMany({
            where: venueId
                ? {
                    venue_id: parseInt(venueId),
                }
                : {}, // No filter if no venueId

            select: {
                id: true,
                name: true,
                photo: true,
                description: true,
                price: true,
                venue_id: true,
                Venue: {
                    select: {
                        name: true,
                        eventId: true,
                    },
                },
            },
        });

        const formatted = venueTypes.map((type) => ({
            ...type,
            venueName: type.Venue?.name || null,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("GET /venueType error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}