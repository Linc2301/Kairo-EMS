import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

// export async function GET(req) {
//     const { searchParams } = new URL(req.url);
//     const eventId = searchParams.get("eventId");

//     if (!eventId || isNaN(eventId)) {
//         return NextResponse.json({ message: "Invalid or missing eventId" }, { status: 400 });
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
//         return NextResponse.json({ message: "Server error" }, { status: 500 });
//     }
// }


export async function GET(_req, { params }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    try {
        const service = await prisma.floralService.findUnique({
            where: { id },
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

        if (!service) return NextResponse.json({ message: "Not found" }, { status: 404 });

        return NextResponse.json({ ...service, venueName: service.Venue?.name || null });
    } catch (error) {
        console.error("GET /floralServices/[id] error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function PUT(req, { params }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        const { name, description, photo, price, venue_id } = await req.json();

        if (!name || !description || !price || !venue_id) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const updated = await prisma.floralService.update({
            where: { id },
            data: {
                name,
                description,
                photo,
                price: parseFloat(price),
                venue_id: parseInt(venue_id),
            },
        });

        return NextResponse.json({ message: "Updated", floralService: updated });
    } catch (error) {
        console.error("PUT /floralServices/[id] error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}




export async function DELETE(_req, { params }) {
    const id = parseInt(params.id);
    if (isNaN(id)) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

    try {
        await prisma.floralService.delete({ where: { id } });
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("DELETE /floralServices/[id] error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
