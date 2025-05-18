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
} from "valibot";

const AddFarmerSchema = object({
  name: pipe(string("Enter Farmer Name")),
  beneficiary_code: pipe(string("Enter Beneficiary Code")),
  contact: pipe(
    string(),
    minLength(10, "Mobile number should be 10 digits."),
    check(isContainSpace, "Mobile number cannot contain space.")
  ),
  beneficiary_type: enum_(BeneficiaryType, "Select Beneficiary Type"),
  cow_count: pipe(string("Enter Number of Cows")),
});

type AddFarmerForm = InferInput<typeof AddFarmerSchema>;
export { AddFarmerSchema, type AddFarmerForm };
