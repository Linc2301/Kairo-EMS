import { NextResponse } from "next/server";
import * as yup from "yup";
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_pass: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

//Register User API
export async function POST(req) {
  try {
      
      const body = await req.json();
      const validatedData = await schema.validate(body, { abortEarly: false });
    delete validatedData.confirm_pass;
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        password: hashedPassword,
      },
    });
    return NextResponse.json({
      message: "User is successfully created.",
      user: user,
    });
  } catch (error) {
    // return NextResponse.json({ message: "Internal Server Error" }, { status: 500 }); //we need to mark that error message have the (status) attrubute
    if (error.name === "ValidationError") {
      return NextResponse.json(
        {
          message: "Validation Failed",
          errors: error.inner.map((e) => ({
            //we used map for the output that we want
            path: e.path,
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Unexpected error",
        error: error.message || error,
      },
      {
        status: 500,
      }
    );
  }
}
