import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
  .string()
  .required("Email is required")
  .email("Invalid email format")
  .required("Email is required"),

  phone: yup
  .string()
  .required("Phone number is required")
  .matches(/^09\d{7,9}$/, "Invalid phone number"),

  
 
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
    
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password')
  
});
