import { isContainSpace } from "@/utils/methods";
import { check, InferInput, minLength, object, string, pipe } from "valibot";

const LoginSchema = object({
  mobile: pipe(
    string(),
    minLength(10, "Mobile number should be 10 digits."),
    check(isContainSpace, "Mobile number cannot contain space.")
  ),
  password: pipe(
    string(),
    minLength(1, "Please enter your password."),
    check(isContainSpace, "Password cannot contain space.")
  ),
});

type LoginForm = InferInput<typeof LoginSchema>;
export { LoginSchema, type LoginForm };
