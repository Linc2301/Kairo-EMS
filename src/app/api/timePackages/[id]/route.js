import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import * as yup from "yup";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const MYANMAR_TZ = "Asia/Yangon";

const updateSchema = yup.object().shape({
  startTime: yup
    .string()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time")
    .required(),
  endTime: yup
    .string()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time")
    .test("is-after-start", "End time must be after start time", function (value) {
      const { startTime } = this.parent;
      return value > startTime;
    })
    .required(),
  venue_id: yup.number().integer().required(),
});

// export async function GET(req, { params }) {
//   const id = Number(params.id);
//   if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

//   try {
//     const timePackage = await prisma.timePackage.findUnique({
//       where: { id },
//       include: { Venue: { select: { name: true } } },
//     });

//     if (!timePackage)
//       return NextResponse.json({ message: "Not found" }, { status: 404 });

//     return NextResponse.json({
//       id: timePackage.id,
//       startTime: dayjs(timePackage.startTime)
//         .tz(MYANMAR_TZ)
//         .format("HH:mm"),
//       endTime: dayjs(timePackage.endTime)
//         .tz(MYANMAR_TZ)
//         .format("HH:mm"),
//       venue_id: timePackage.venue_id,
//       venueName: timePackage.Venue?.name || "N/A",
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }


export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const venueId = searchParams.get("venueId");
  const dateStr = searchParams.get("date");
  try {
    // Build where clause
    let whereClause = {
      booking: null, // Only show unbooked time packages
    };
    // Add venue filter if provided
    if (venueId) {
      whereClause.venue_id = parseInt(venueId);
    }
    // Add date filter if provided
    if (dateStr) {
      const date = new Date(dateStr);
      whereClause.date = date;
    }
    const timePackages = await prisma.timePackage.findMany({
      where: whereClause,
      include: {
        Venue: {
          select: {
            name: true,
            Event: {
              select: {
                name: true
              }
            }
          }
        },
      },
      orderBy: { startTime: "asc" },
    });
    const formatted = timePackages.map((tp) => ({
      id: tp.id,
      startTime: tp.startTime.toISOString(),
      endTime: tp.endTime.toISOString(),
      date: tp.date.toISOString().split('T')[0],
      venue_id: tp.venue_id,
      venueName: tp.Venue?.name || "Unknown",
      eventName: tp.Venue?.Event?.name || "N/A"
    }));
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Error fetching time packages:", error);
    return NextResponse.json(
      { message: "Failed to fetch time packages" },
      { status: 500 }
    );
  }
}


export async function PUT(req, { params }) {
  const id = Number(params.id);
  if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  try {
    const body = await req.json();
    await updateSchema.validate(body, { abortEarly: false });

    // Date fixed to '1970-01-01' to store only time part, but stored as UTC
    const start = dayjs.tz(`1970-01-01 ${body.startTime}`, "YYYY-MM-DD HH:mm", MYANMAR_TZ).toDate();
    const end = dayjs.tz(`1970-01-01 ${body.endTime}`, "YYYY-MM-DD HH:mm", MYANMAR_TZ).toDate();

    const venue = await prisma.venue.findUnique({ where: { id: Number(body.venue_id) } });
    if (!venue) {
      return NextResponse.json(
        { message: `Venue ${body.venue_id} not found` },
        { status: 404 }
      );
    }

    const updated = await prisma.timePackage.update({
      where: { id },
      data: {
        startTime: start,
        endTime: end,
        venue_id: Number(body.venue_id),
      },
    });

    return NextResponse.json({ message: "Updated successfully", data: updated });
  } catch (error) {
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.inner.map((e) => ({ field: e.path, message: e.message })),
        },
        { status: 400 }
      );
    }
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const id = Number(params.id);
  if (!id) return NextResponse.json({ message: "Invalid ID" }, { status: 400 });

  try {
    await prisma.timePackage.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted successfully", id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Delete failed", error: error.message }, { status: 500 });
  }
}
