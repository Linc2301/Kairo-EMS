import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    photo: yup.string()
        .url("Photo must be a valid URL")
        .required("Photo is required"),
    date: yup.date()
        .typeError("Date must be a valid date")
        .required("Date is required"),
    time: yup.string()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM format")
        .required("Time is required"),
});



//DELETE API
export async function DELETE(req, { params }) {
    const eventId = parseInt(params.id);
    try {
        await prisma.timepackage.delete({
            where: { id: eventId },
        });
        return NextResponse.json({
            message: "Package is successfully deleted.",
            eventId,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Package not found or package deletion failed!"
        }, { status: 404 })
    }

}


//Update event API
export async function PUT(req, { params }) {
    try {
        const eventId = parseInt(params.id);
        const body = await req.json();
        const packageData = await schema.validate(body, { abortEarly: false, stripUnknown: true }); //use stripUnknown that might notice the change data in the validation fields
        await prisma.timepackage.update({
            where: { id: eventId },
            data: packageData,
        })
        return NextResponse.json({
            message: "Package is successfully updated.",
            eventId,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return NextResponse.json(
                {
                    message: "Validation Failed",
                    errors: error.inner.map((e) => ({       //we used map for the output that we want 
                        path: e.path,
                        message: e.message,
                    })),
                }, { status: 400 }
            );
        }
        return NextResponse.json({
            message: "Unexpected error",
            error: error.message,
        }, {
            status: 500
        });
    }

}


//Get event Detail API
export async function GET(req, { params }) {
    const packageId = parseInt(params.id); //get URL params fields,
    //Find student in database
    const event = await prisma.timepackage.findUnique({
        where: {
            id: packageId,
        }
    })
    return NextResponse.json(event)

}
