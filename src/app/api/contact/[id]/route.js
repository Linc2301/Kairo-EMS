import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function DELETE(req, { params }) {
    try {
        const id = parseInt(params.id); // only if your ID is a number
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }

        const deleted = await prisma.contact.delete({
            where: { id }, //need to mark this
        });

        return NextResponse.json({
            message: "Contact successfully deleted",
            contact: deleted,
        });
    } catch (error) {
        console.error("Delete API Error:", error);
        return NextResponse.json(
            {
                message: "Failed to delete contact",
                error: error.message,
            },
            { status: 500 }
        );
    }
}
