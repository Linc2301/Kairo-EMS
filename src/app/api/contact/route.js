import { NextResponse } from "next/server";
import * as yup from "yup";
import { prisma } from "@/src/lib/prisma";


const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    subject: yup.string().required("Subject is required!"),
    message: yup.string().required("Message is required")
});



export async function GET() {
    const contactData = await prisma.contact.findMany();
    return NextResponse.json(contactData);
}


//Register User API
export async function POST(req) {
    try {
        const body = await req.json();

        const validatedData = await schema.validate(body, { abortEarly: false });  //we used await cause the schema is the async function //use abortEarly for testing validate that is true or false
        const data = await prisma.contact.create({
            data: validatedData,
        })
        return NextResponse.json({
            message: "Contact is successfully created.",
            user: data
        })
    } catch (error) {
        // return NextResponse.json({ message: "Internal Server Error" }, { status: 500 }); //we need to mark that error message have the (status) attrubute
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
            error: error.message || error,
        }, {
            status: 500
        });
    }
}