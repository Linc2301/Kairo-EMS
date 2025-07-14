import { NextResponse } from "next/server";
import { prisma } from "@/src/lib/prisma";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    photo: yup.string()
        .url("Photo must be a valid URL")
        .required("Photo is required"),
    price: yup.number().required("Price is required!")

});


//DELETE API
export async function DELETE(req, { params }) {
    const serviceId = parseInt(params.id);
    try {
        await prisma.floralservice.delete({
            where: { id: serviceId },
        });
        return NextResponse.json({
            message: "Service is successfully deleted.",
            serviceId,
        });
    } catch (error) {
        return NextResponse.json({
            message: "Service not found or service deletion failed!"
        }, { status: 404 })
    }

}


//Update event API
export async function PUT(req, { params }) {
    try {
        const serviceId = parseInt(params.id);
        const body = await req.json();
        const validatedData = await schema.validate(body, { abortEarly: false, stripUnknown: true }); //use stripUnknown that might notice the change data in the validation fields
        await prisma.floralservice.update({
            where: { id: serviceId },
            data: validatedData,
        })
        return NextResponse.json({
            message: "Service is successfully updated.",
            serviceId,
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
    const serviceId = parseInt(params.id); //get URL params fields,
    //Find student in database
    const event = await prisma.floralservice.findUnique({
        where: {
            id: serviceId,
        }
    })
    return NextResponse.json(event)

}
