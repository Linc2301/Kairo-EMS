
// import { NextResponse } from 'next/server'
// import { prisma } from "@/src/lib/prisma";

// // Function to generate custom booking ID
// async function generateBookingId() {
//   try {
//     // Get the last booking to determine the next number
//     const lastBooking = await prisma.booking.findFirst({
//       where: {
//         bookingId: {
//           startsWith: 'BK'
//         }
//       },
//       orderBy: {
//         id: 'desc'
//       }
//     });

//     let nextNumber = 1;

//     if (lastBooking && lastBooking.bookingId) {
//       // Extract the number from the last booking ID (e.g., "BK001" -> 1)
//       const lastNumber = parseInt(lastBooking.bookingId.replace('BK', ''));
//       nextNumber = lastNumber + 1;
//     }

//     // Format with leading zeros (BK001, BK002, etc.)
//     return `BK${nextNumber.toString().padStart(3, '0')}`;
//   } catch (error) {
//     console.error('Error generating booking ID:', error);
//     // Fallback to timestamp-based ID if there's an error
//     return `BK${Date.now().toString().slice(-6)}`;
//   }
// }

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');

//     // Validate userId if provided
//     const filter = userId && !isNaN(Number(userId))
//       ? { user_id: Number(userId) }
//       : {};

//     const bookings = await prisma.booking.findMany({
//       where: filter,
//       include: {
//         venue: true,
//         VenueType: true,
//         floralService: true,
//         TimePackage: true,
//         Event: {   // ✅ Get Event via Venue
//           select: { id: true, name: true },
//         },
//         user: {
//           select: {
//             id: true,
//             name: true,
//             email: true
//           }
//         },
//       },
//       orderBy: { createdAt: 'desc' },
//     });

//     return NextResponse.json(bookings);
//   } catch (error) {
//     console.error('Bookings fetch error:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch bookings', details: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   try {
//     const data = await req.json();
//     console.log('Received booking data:', data);

//     // Validate ALL required fields from the Prisma model
//     if (
//       !data.venue_id ||
//       !data.venueTypeId ||
//       !data.timePackageId ||
//       !data.user_id ||
//       !data.booking_date ||
//       !data.total_amount ||
//       !data.floral_service_id
//     ) {
//       return NextResponse.json(
//         { error: 'Missing required fields', received: data },
//         { status: 400 }
//       );
//     }

//     // Generate custom booking ID
//     const customBookingId = await generateBookingId();
//     console.log('Generated booking ID:', customBookingId);

//     const booking = await prisma.booking.create({
//       data: {
//         bookingId: customBookingId, // Use our custom generated ID
//         venue_id: Number(data.venue_id),
//         venueTypeId: Number(data.venueTypeId),
//         floral_service_id: Number(data.floral_service_id),
//         timePackageId: Number(data.timePackageId),
//         user_id: Number(data.user_id),
//         eventId: data.eventId ? Number(data.eventId) : null,
//         booking_date: new Date(data.booking_date),
//         total_amount: Number(data.total_amount),
//         status: data.status || "pending",
//       },
//       include: {
//         user: { select: { id: true, name: true, email: true } },
//         venue: true,
//         VenueType: true,
//         floralService: true,
//         TimePackage: true,
//       },
//     });

//     return NextResponse.json(booking, { status: 201 });
//   } catch (error) {
//     console.error('Failed to create booking:', error);
//     console.error('Prisma Error Details:', error.message);

//     // Check for specific Prisma errors
//     if (error.code === 'P2002') {
//       if (error.meta?.target?.includes('timePackageId')) {
//         return NextResponse.json(
//           { error: 'This time package has already been booked.' },
//           { status: 409 }
//         );
//       }
//       if (error.meta?.target?.includes('bookingId')) {
//         return NextResponse.json(
//           { error: 'Booking ID conflict. Please try again.' },
//           { status: 409 }
//         );
//       }
//     }

//     return NextResponse.json(
//       { error: 'Failed to create booking', details: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const bookingId = searchParams.get('id');
//     const data = await req.json();

//     if (!bookingId) {
//       return NextResponse.json(
//         { error: 'Booking ID is required' },
//         { status: 400 }
//       );
//     }

//     const updatedBooking = await prisma.booking.update({
//       where: { bookingId: bookingId },
//       data: {
//         status: data.status || "confirmed"
//       },
//       include: {
//         user: { select: { id: true, name: true, email: true } },
//         venue: true,
//         VenueType: true,
//         floralService: true,
//         TimePackage: true,
//       },
//     });

//     return NextResponse.json(updatedBooking);
//   } catch (error) {
//     console.error('Failed to update booking:', error);
//     return NextResponse.json(
//       { error: 'Failed to update booking', details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server'
import { prisma } from "@/src/lib/prisma";

async function generateBookingId() {
  try {
    const lastBooking = await prisma.booking.findFirst({
      where: {
        bookingId: {
          startsWith: 'BK'
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    let nextNumber = 1;

    if (lastBooking && lastBooking.bookingId) {
      const lastNumber = parseInt(lastBooking.bookingId.replace('BK', ''));
      nextNumber = lastNumber + 1;
    }

    return `BK${nextNumber.toString().padStart(3, '0')}`;
  } catch (error) {
    console.error('Error generating booking ID:', error);
    return `BK${Date.now().toString().slice(-6)}`;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const filter = userId && !isNaN(Number(userId))
      ? { user_id: Number(userId) }
      : {};

    const bookings = await prisma.booking.findMany({
      where: filter,
      include: {
        venue: {
          include: {
            Event: true
          }
        },
        VenueType: true,
        floralService: true,
        TimePackage: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Bookings fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    console.log('Received booking data:', data);

    if (
      !data.venue_id ||
      !data.venueTypeId ||
      !data.timePackageId ||
      !data.user_id ||
      !data.booking_date ||
      !data.total_amount ||
      !data.floral_service_id
    ) {
      return NextResponse.json(
        { error: 'Missing required fields', received: data },
        { status: 400 }
      );
    }

    const customBookingId = await generateBookingId();
    console.log('Generated booking ID:', customBookingId);

    const booking = await prisma.booking.create({
      data: {
        bookingId: customBookingId,
        venue_id: Number(data.venue_id),
        venueTypeId: Number(data.venueTypeId),
        floral_service_id: Number(data.floral_service_id),
        timePackageId: Number(data.timePackageId),
        user_id: Number(data.user_id),
        booking_date: new Date(data.booking_date),
        total_amount: Number(data.total_amount),
        status: data.status || "pending",
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        venue: {
          include: {
            Event: true
          }
        },
        VenueType: true,
        floralService: true,
        TimePackage: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Failed to create booking:', error);
    console.error('Prisma Error Details:', error.message);

    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('timePackageId')) {
        return NextResponse.json(
          { error: 'This time package has already been booked.' },
          { status: 409 }
        );
      }
      if (error.meta?.target?.includes('bookingId')) {
        return NextResponse.json(
          { error: 'Booking ID conflict. Please try again.' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create booking', details: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get('id');
    const data = await req.json();

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { bookingId: bookingId },
      data: {
        status: data.status || "confirmed"
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        venue: {
          include: {
            Event: true
          }
        },
        VenueType: true,
        floralService: true,
        TimePackage: true,
      },
    });

    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Failed to update booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking', details: error.message },
      { status: 500 }
    );
  }
}