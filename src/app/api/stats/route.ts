import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const today = new Date().toISOString().split('T')[0];

    const [
      totalBookings,
      todayBookings,
      pendingBookings,
      totalClients,
      todayRevenue,
      monthlyRevenue,
      popularServices,
      recentBookings,
      bookingsByStatus,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { date: today } }),
      prisma.booking.count({ where: { status: 'pendiente' } }),
      prisma.client.count(),
      prisma.booking.aggregate({
        where: { date: today, status: { not: 'cancelada' } },
        _sum: { total: true },
      }),
      prisma.booking.aggregate({
        where: {
          date: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0] },
          status: { not: 'cancelada' },
        },
        _sum: { total: true },
      }),
      prisma.booking.groupBy({
        by: ['serviceId'],
        _count: true,
        orderBy: { _count: { serviceId: 'desc' } },
        take: 5,
      }),
      prisma.booking.findMany({
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: { service: true, client: true },
      }),
      prisma.booking.groupBy({
        by: ['status'],
        _count: true,
      }),
    ]);

    // Get service names for popular services
    const serviceIds = popularServices.map((s) => s.serviceId);
    const services = await prisma.service.findMany({
      where: { id: { in: serviceIds } },
    });

    const popularWithNames = popularServices.map((s) => ({
      ...s,
      serviceName: services.find((svc) => svc.id === s.serviceId)?.name || 'Desconocido',
    }));

    return NextResponse.json({
      totalBookings,
      todayBookings,
      pendingBookings,
      totalClients,
      todayRevenue: todayRevenue._sum.total || 0,
      monthlyRevenue: monthlyRevenue._sum.total || 0,
      popularServices: popularWithNames,
      recentBookings,
      bookingsByStatus,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Error fetching stats' }, { status: 500 });
  }
}
