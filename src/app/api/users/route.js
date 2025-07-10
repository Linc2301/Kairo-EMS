import { NextResponse } from "next/server";
import * as yup from "yup";
import { prisma } from "@/lib/prisma";


const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    father_name: yup.string().required("Father name is required."),
    gender: yup.string().required("Gender is required.").oneOf(["male", "female"], "Invalid gender"),
    age: yup.number().positive().required("Age is required."),
    dob: yup.date().required("Date is required."),
    phone: yup.string().required("Phone is required"),
    address: yup.string().required("Address is required."),
    major: yup.string().required("Major is required.")

});


export async function GET() {
    const students = await prisma.student.findMany();
    return NextResponse.json(students);
}


//Register User API
export async function POST(req) {
    try {
        const body = await req.json();

        const validatedData = await schema.validate(body, { abortEarly: false });  //we used await cause the schema is the async function //use abortEarly for testing validate that is true or false
        const student = await prisma.student.create({
            data: validatedData,
        })
        return NextResponse.json({
            message: "Student is successfully created.",
            student: student
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