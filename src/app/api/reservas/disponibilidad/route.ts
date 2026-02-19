import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    // Check if date is blocked
    const blocked = await prisma.blockedDate.findFirst({ where: { date } });
    if (blocked) {
      return NextResponse.json({ bookedSlots: [], blocked: true, reason: blocked.reason });
    }

    // Get all bookings for that date that are not cancelled
    const bookings = await prisma.booking.findMany({
      where: {
        date,
        status: { not: 'cancelada' },
      },
      select: { time: true },
    });

    const bookedSlots = bookings.map((b) => b.time);

    return NextResponse.json({ bookedSlots, blocked: false });
  } catch (error) {
    console.error('Error checking availability:', error);
    return NextResponse.json({ error: 'Error checking availability' }, { status: 500 });
  }
}
