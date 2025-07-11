import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .required("Email is required"),
  subject: yup
    .string()
    .required("Password is required"),

  message: yup
    .string()
    .required('Please confirm your password')

});
