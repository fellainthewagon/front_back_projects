import { object, string, ref } from "yup";

export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    password: string()
      .required("Password is required")
      .min(6, "Password should be 6 char minimum")
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        "Password can only contain Latin letters, numbers, _ and -"
      ),
    passwordConfirmation: string().oneOf(
      [ref("password"), null],
      "Password must match"
    ),
    email: string().email("Must be valid email").required("Email is required"),
  }),
});

export const createUserSessionSchema = object({
  body: object({
    password: string()
      .required("Password is required")
      .min(6, "Password should be 6 char minimum")
      .matches(
        /^[a-zA-Z0-9_.-]*$/,
        "Password can only contain Latin letters, numbers, _ and -"
      ),
    email: string().email("Must be valid email").required("Email is required"),
  }),
});
