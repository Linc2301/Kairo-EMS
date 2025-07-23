// import { NextResponse } from 'next/server';
// import { prisma } from '@/src/lib/prisma';

// // Helper to parse the review ID
// function getIdFromParams(params) {
//     const id = parseInt(params.id);
//     if (isNaN(id)) {
//         throw new Error('Invalid review ID');
//     }
//     return id;
// }

// // GET /api/review/[id]
// export async function GET(_, { params }) {
//     try {
//         const id = getIdFromParams(params);

//         const review = await prisma.review.findUnique({
//             where: { id },
//             include: {
//                 user: {
//                     select: {
//                         id: true,
//                         name: true,
//                         photo: true,
//                     },
//                 },
//                 Venue: {
//                     select: {
//                         id: true,
//                         name: true,
//                     },
//                 },
//             },
//         });

//         if (!review) {
//             return NextResponse.json({ error: 'Review not found' }, { status: 404 });
//         }

//         return NextResponse.json(review);
//     } catch (error) {
//         console.error('GET /api/review/[id] error:', error);
//         return NextResponse.json({ error: 'Failed to fetch review' }, { status: 500 });
//     }
// }

// // PUT /api/review/[id]
// export async function PUT(req, { params }) {
//     try {
//         const id = getIdFromParams(params);
//         const data = await req.json();

//         const { rating, review_date, description } = data;

//         const updatedReview = await prisma.review.update({
//             where: { id },
//             data: {
//                 rating,
//                 review_date: new Date(review_date),
//                 description,
//             },
//         });

//         return NextResponse.json(updatedReview);
//     } catch (error) {
//         console.error('PUT /api/review/[id] error:', error);
//         return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
//     }
// }

// // DELETE /api/review/[id]
// export async function DELETE(_, { params }) {
//     try {
//         const id = getIdFromParams(params);

//         await prisma.review.delete({
//             where: { id },
//         });

//         return NextResponse.json({ message: 'Review deleted successfully' });
//     } catch (error) {
//         console.error('DELETE /api/review/[id] error:', error);
//         return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
//     }
// }

import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

// Helper to parse and validate the review ID
function getIdFromParams(params) {
    const id = parseInt(params.id, 10);
    if (isNaN(id) || id <= 0) {
        throw new Error('Invalid review ID');
    }
    return id;
}

// GET /api/review/[id]
export async function GET(_, { params }) {
    try {
        const id = getIdFromParams(params);

        const review = await prisma.review.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        photo: true,
                    },
                },
                Venue: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        if (!review) {
            return NextResponse.json({ error: 'Review not found' }, { status: 404 });
        }

        return NextResponse.json(review);
    } catch (error) {
        console.error('GET /api/review/[id] error:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch review' }, { status: 500 });
    }
}

// PUT /api/review/[id]
export async function PUT(req, { params }) {
    try {
        const id = getIdFromParams(params);
        const data = await req.json();

        const { rating, review_date, description } = data;

        if (
            typeof rating !== 'number' ||
            !review_date ||
            typeof description !== 'string' ||
            description.trim() === ''
        ) {
            return NextResponse.json(
                { error: 'Missing or invalid fields: rating, review_date, and description are required' },
                { status: 400 }
            );
        }

        const updatedReview = await prisma.review.update({
            where: { id },
            data: {
                rating,
                review_date: new Date(review_date),
                description,
            },
        });

        return NextResponse.json(updatedReview);
    } catch (error) {
        console.error('PUT /api/review/[id] error:', error);
        return NextResponse.json({ error: error.message || 'Failed to update review' }, { status: 500 });
    }
}

// DELETE /api/review/[id]
export async function DELETE(_, { params }) {
    try {
        const id = getIdFromParams(params);

        await prisma.review.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('DELETE /api/review/[id] error:', error);
        return NextResponse.json({ error: error.message || 'Failed to delete review' }, { status: 500 });
    }
}
