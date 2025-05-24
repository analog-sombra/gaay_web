import { Role } from "@/models/main";
import { isContainSpace } from "@/utils/methods";
import {
  check,
  InferInput,
  minLength,
  object,
  string,
  pipe,
  nullish,
  enum_,
} from "valibot";

const AddStaffSchema = object({
  name: pipe(string("Enter Farmer Name")),
  contact: pipe(
    string(),
    minLength(10, "Mobile number should be 10 digits."),
    check(isContainSpace, "Mobile number cannot contain space.")
  ),
  contact_two: nullish(
    pipe(
      string(),
      minLength(10, "Mobile number should be 10 digits."),
      check(isContainSpace, "Mobile number cannot contain space.")
    )
  ),
  address: pipe(string("Enter Address")),
  village: pipe(string("Enter Village Name")),
  district: pipe(string("Enter District Name")),
  role: enum_(Role, "Select Role"),
});

type AddStaffForm = InferInput<typeof AddStaffSchema>;
export { AddStaffSchema, type AddStaffForm };
