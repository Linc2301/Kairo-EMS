import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";

export async function GET(request, { params }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }

        const contact = await prisma.contact.findUnique({
            where: { id },
        });

        if (!contact) {
            return NextResponse.json({ message: "Contact not found" }, { status: 404 });
        }

        return NextResponse.json(contact);
    } catch (error) {
        console.error("GET /api/contact/[id] error:", error);
        return NextResponse.json(
            { message: "Failed to fetch contact", error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = parseInt(params.id);
        if (isNaN(id)) {
            return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
        }

        const deletedContact = await prisma.contact.delete({
            where: { id },
        });

        return NextResponse.json({
            message: "Contact deleted successfully",
            contact: deletedContact,
        });
    } catch (error) {
        console.error("DELETE /api/contact/[id] error:", error);

        if (error.code === "P2025") {
            return NextResponse.json(
                { message: "Contact not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Failed to delete contact", error: error.message },
            { status: 500 }
        );
    }
}