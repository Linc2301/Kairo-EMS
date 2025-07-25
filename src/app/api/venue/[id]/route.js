import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req, context) {
    const { id } = context.params;

    const venue = await prisma.venue.findUnique({
        where: { id: parseInt(id) },
    });

    if (!venue) {
        return NextResponse.json({ message: "Venue not found" }, { status: 404 });
    }

    return NextResponse.json(venue);
}


// export async function GET(req, { params }) {
//     const { id } = params;
//     const venueId = parseInt(id);

//     if (!venueId || isNaN(venueId)) {
//         return NextResponse.json({ message: "Venue ID is required" }, { status: 400 });
//     }

//     try {
//         const venue = await prisma.venue.findUnique({
//             where: { id: venueId },
//         });

//         if (!venue) {
//             return NextResponse.json({ message: "Venue not found" }, { status: 404 });
//         }

//         const venueTypes = await prisma.venueType.findMany({
//             where: { venue_id: venueId },
//         });

//         const floralServices = await prisma.floralService.findMany({
//             where: { venue_id: venueId },
//         });

//         const timePackages = await prisma.timePackage.findMany({
//             where: { venue_id: venueId },
//         });

//         return NextResponse.json({
//             venueTypes,
//             floralServices,
//             timePackages,
//         });
//     } catch (error) {
//         console.error("Error fetching related venue data:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }
export async function PUT(req, { params }) {
    const { id } = params;
    const body = await req.json();

    const { name, photo1, photo2, photo3, eventId } = body;

    try {
        const updated = await prisma.venue.update({
            where: { id: parseInt(id) },
            data: {
                name,
                photo1,
                photo2,
                photo3,
                eventId: parseInt(eventId),
            },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update error:", error);
        return NextResponse.json({ message: "Update failed" }, { status: 500 });
    }
}

// DELETE venue
export async function DELETE(req, { params }) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        // Manual deletion (remove if you use cascade)
        await prisma.review.deleteMany({ where: { venue_id: id } });
        await prisma.booking.deleteMany({ where: { venue_id: id } });
        await prisma.venueType.deleteMany({ where: { venue_id: id } });
        await prisma.floralService.deleteMany({ where: { venue_id: id } });
        await prisma.timePackage.deleteMany({ where: { venue_id: id } });

        await prisma.venue.delete({ where: { id } });

        return NextResponse.json({ message: "Venue deleted successfully" });
    } catch (error) {
        console.error("Failed to delete venue:", error);
        return NextResponse.json({ error: "Failed to delete venue" }, { status: 500 });
    }
}
