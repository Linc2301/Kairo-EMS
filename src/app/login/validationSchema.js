import { Password } from "@mui/icons-material";
import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});
