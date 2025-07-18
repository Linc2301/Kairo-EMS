// app/api/review/[id]/route.js
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(_, { params }) {
    const { id } = params;

    try {
        const review = await prisma.review.findUnique({
            where: { id: Number(id) },
            include: { user: true },
        });

        if (!review) {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }

        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
    }
}

export async function DELETE(_, { params }) {
    const { id } = params;

    try {
        const deleted = await prisma.review.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: 'Review deleted successfully', deleted });
    } catch (error) {
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
    }
}
