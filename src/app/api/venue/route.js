
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, photo1, photo2, photo3, eventId } = body;

    if (!name || !eventId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newVenue = await prisma.venue.create({
      data: {
        name,
        photo1,
        photo2,
        photo3,
        eventId: parseInt(eventId), // IMPORTANT
      },
    });

    return NextResponse.json({ message: "Venue created", venue: newVenue }, { status: 201 });
  } catch (error) {
    console.error("Venue creation error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const events = await prisma.venue.findMany({
      select: {
        id: true,
        name: true,
        photo1: true,
        photo2: true,
        photo3: true,
        eventId: true,
        Event: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(events); 
  } catch (error) {
    console.error("GET venue error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}


// export async function GET() {
//   try {
//     const events = await prisma.venue.findMany({
//       select: {
//         id: true,
//         name: true,
//         photo1: true,
//         photo2: true,
//         photo3: true,
//         eventId: true, // keep the raw ID if needed
//         event: {
//           select: {
//             name: true,
//           },
//         },
//       },
//     });

//     // Format the response to flatten event.name
//     const formatted = events.map((venue) => ({
//       ...venue,
//       eventName: venue.event?.name || null,
//     }));

//     return NextResponse.json(formatted);
//   } catch (error) {
//     console.error("GET venue error:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }