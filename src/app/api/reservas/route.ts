import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (date) where.date = date;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          service: { include: { category: true } },
          client: true,
        },
        orderBy: [{ date: 'desc' }, { time: 'asc' }],
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({ bookings, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Error fetching bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceId, date, time, clientName, clientPhone, clientEmail, total, notes } = body;

    // Find or create client
    let client = await prisma.client.findFirst({
      where: { phone: clientPhone },
    });

    if (!client) {
      client = await prisma.client.create({
        data: {
          name: clientName,
          phone: clientPhone,
          email: clientEmail || null,
        },
      });
    } else {
      // Update name/email if provided
      client = await prisma.client.update({
        where: { id: client.id },
        data: {
          name: clientName,
          email: clientEmail || client.email,
        },
      });
    }

    const booking = await prisma.booking.create({
      data: {
        date,
        time,
        total,
        notes: notes || null,
        serviceId,
        clientId: client.id,
        status: 'pendiente',
      },
      include: {
        service: true,
        client: true,
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
  }
}
