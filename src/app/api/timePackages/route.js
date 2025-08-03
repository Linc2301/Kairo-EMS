import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

// Enable plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);

// GET API
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const venueId = searchParams.get("venueId");

  try {
    const timePackages = await prisma.timePackage.findMany({
      where: venueId ? { venue_id: parseInt(venueId) } : {},
      include: {
        Venue: { select: { name: true } },
      },
      orderBy: { id: "asc" },
    });

    const formatted = timePackages.map((tp) => ({
      id: tp.id,
      startTime: tp.startTime.toISOString(),
      endTime: tp.endTime.toISOString(),
      venue_id: tp.venue_id,
      venueName: tp.Venue?.name || "Unknown",
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

export async function POST(request) {
  try {
    const { date, startTime, endTime, venue_id } = await request.json();

    if (!date || !startTime || !endTime || !venue_id) {
      return NextResponse.json(
        { message: "အချက်အလက်ပြည့်စုံမှုမရှိပါ။" },
        { status: 400 }
      );
    }

    // HH:mm format မမှန်လျှင် error ပေးမည်
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return NextResponse.json(
        { message: "အချိန်ဖော်ပြပုံမှားနေပါသည် (HH:mm format လိုအပ်သည်)" },
        { status: 400 }
      );
    }

    // Myanmar timezone အတိုင်း datetime ပြောင်းမည်
    const start = dayjs
      .tz(`${date} ${startTime}`, "YYYY-MM-DD HH:mm", "Asia/Yangon")
      .toDate();

    let end = dayjs.tz(`${date} ${endTime}`, "YYYY-MM-DD HH:mm", "Asia/Yangon");

    // end time က start time ထက်လျော့နေလျှင် နောက်နေ့တစ်ရက်ဖြစ်စေ
    if (end.isSameOrBefore(dayjs(start))) {
      end = end.add(1, "day");
    }

    const endDate = end.toDate();

    // date field ကိုရက်အနေနဲ့ပဲ သိမ်းရန်
    const dateOnly = dayjs
      .tz(date, "YYYY-MM-DD", "Asia/Yangon")
      .startOf("day")
      .toDate();

    const created = await prisma.timePackage.create({
      data: {
        date: dateOnly,
        startTime: start,
        endTime: endDate,
        venue_id: Number(venue_id),
      },
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("Error creating time package:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        {
          message:
            "ဒီနေ့၊ ဒီအချိန်၊ ဒီနေရာအတွက် Time Package ရှိပြီးသားဖြစ်သည်။",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Time Package ဖန်တီးမှု မအောင်မြင်ပါ" },
      { status: 500 }
    );
  }
}