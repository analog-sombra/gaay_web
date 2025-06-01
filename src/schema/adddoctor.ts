import { InferInput, object, pipe, number, string } from "valibot";

const AddDoctorSchema = object({
  doctorid: pipe(number("Enter Doctor ID")),
  scheduled_date: pipe(string("Enter Scheduled date")),
});

type AddDoctorForm = InferInput<typeof AddDoctorSchema>;
export { AddDoctorSchema, type AddDoctorForm };
