import { FormProvider, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { onFormError } from "@/utils/methods";
import { TextInput } from "../inputfields/textinput";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ApiCall } from "@/services/api";
import { toast } from "react-toastify";
import { AddFarmerForm, AddFarmerSchema } from "@/schema/addfarmer";
import { MultiSelect } from "../inputfields/multiselect";
import { DateSelect } from "../inputfields/dateselect";

const AddFarmerPage = () => {
  const router = useRouter();
  const methods = useForm<AddFarmerForm>({
    resolver: valibotResolver(AddFarmerSchema),
  });

  type AddFarmerResponse = {
    id: string;
    name: string;
    role: string;
  };

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: AddFarmerForm) => {
      const response = await ApiCall({
        query:
          "mutation CreateUser($createUserInput: CreateUserInput!, $createUserLoanInput: CreateUserLoanInput!) { createUser(createUserInput: $createUserInput, createUserLoanInput: $createUserLoanInput) {id,name,role}}",
        variables: {
          createUserInput: {
            beneficiary_code: data.beneficiary_code,
            beneficiary_type: data.beneficiary_type,
            contact: data.contact,
            cow_count: parseInt(data.cow_count),
            name: data.name,
            role: "FARMER",
            address: data.address,
            village: data.village,
            district: data.district,
            contact_two: data.contact_two,
            occupation: data.occupation,
          },
          createUserLoanInput: {
            amount: data.amount,
            emi_amount: data.emi_amount,
            start_date: data.start_date,
          },
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["createUser"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "createUser"
      ] as AddFarmerResponse;
    },

    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: AddFarmerForm) => {
    login.mutate({
      beneficiary_code: data.beneficiary_code,
      beneficiary_type: data.beneficiary_type,
      contact: data.contact,
      cow_count: data.cow_count,
      name: data.name,
      address: data.address,
      village: data.village,
      district: data.district,
      contact_two: data.contact_two,
      occupation: data.occupation,
      amount: data.amount,
      emi_amount: data.emi_amount,
      start_date: data.start_date,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onFormError)}>
        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="Farmer Name"
            required={true}
            name="name"
            placeholder="Enter Farmer Name"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="Mobile Number"
            required={true}
            name="contact"
            onlynumber={true}
            maxlength={10}
            placeholder="Enter mobile number"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="Alternate Mobile Number"
            name="contact_two"
            onlynumber={true}
            placeholder="Enter alternate mobile number"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="Occupation"
            name="occupation"
            placeholder="Enter Occupation"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="Beneficiary Code"
            required={true}
            name="beneficiary_code"
            placeholder="Enter Beneficiary Code"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="Cow Count"
            required={true}
            name="cow_count"
            onlynumber={true}
            placeholder="Enter Cow Count"
          />
        </div>

        <div className="mt-2">
          <MultiSelect<AddFarmerForm>
            title="Beneficiary Type"
            required={true}
            name="beneficiary_type"
            placeholder="Select Beneficiary Type"
            options={[
              { label: "SSDU", value: "SSDU" },
              { label: "IDDP", value: "IDDP" },
            ]}
          />
        </div>

        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="Address"
            required={true}
            name="address"
            placeholder="Enter Address"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="Village"
            required={true}
            name="village"
            placeholder="Enter Village Name"
          />
        </div>
        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="District"
            required={true}
            name="district"
            placeholder="Enter District Name"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="Amount"
            required={true}
            name="amount"
            onlynumber={true}
            placeholder="Enter Amount"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddFarmerForm>
            title="EMI Amount"
            required={true}
            name="emi_amount"
            onlynumber={true}
            placeholder="Enter EMI Amount"
          />
        </div>

        <div className="mt-2">
          <DateSelect<AddFarmerForm>
            title="Start Date"
            required={true}
            name="start_date"
            placeholder="Enter Start Date"
          />
        </div>

        <button
          type="submit"
          disabled={methods.formState.isSubmitting}
          className="py-1 rounded-md bg-blue-500 px-4 text-sm text-white mt-2 cursor-pointer w-full"
        >
          {login.isPending ? "Loading..." : "Register"}
        </button>
      </form>
    </FormProvider>
  );
};

export default AddFarmerPage;
