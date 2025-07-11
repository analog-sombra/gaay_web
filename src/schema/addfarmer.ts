import { BeneficiaryType } from "@/models/main";
import { isContainSpace } from "@/utils/methods";
import {
  check,
  InferInput,
  minLength,
  object,
  string,
  pipe,
  enum_,
  nullish,
} from "valibot";

const AddFarmerSchema = object({
  alias: pipe(string("Enter alias")),
  name: pipe(string("Enter Farmer Name")),
  beneficiary_code: pipe(string("Enter Beneficiary Code")),
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
  occupation: nullish(
    pipe(string("Enter Occupation"), minLength(3, "Occupation is too short"))
  ),
  address: pipe(string("Enter Address")),
  village: pipe(string("Enter Village Name")),
  district: pipe(string("Enter District Name")),
  beneficiary_type: enum_(BeneficiaryType, "Select Beneficiary Type"),
  cow_count: pipe(string("Enter Number of Cows")),
  amount: pipe(string("Enter Amount")),
  emi_amount: pipe(string("Enter EMI Amount")),
  start_date: pipe(string("Enter Start Date")),
});

type AddFarmerForm = InferInput<typeof AddFarmerSchema>;
export { AddFarmerSchema, type AddFarmerForm };
