import { Password } from "@mui/icons-material";
import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format")
      .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .max(8, "Password must be at most 8 characters")
    .matches(/^[A-Za-z0-9]*$/, "Password can only contain letters and numbers"), // ✅ no special chars
});
