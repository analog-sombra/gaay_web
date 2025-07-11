import { FormProvider, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { onFormError } from "@/utils/methods";
import { TextInput } from "../inputfields/textinput";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ApiCall } from "@/services/api";
import { toast } from "react-toastify";
import { AddStaffForm, AddStaffSchema } from "@/schema/addstaff";
import { MultiSelect } from "../inputfields/multiselect";

const AddVendorPage = () => {
  const router = useRouter();
  const methods = useForm<AddStaffForm>({
    resolver: valibotResolver(AddStaffSchema),
  });

  type AddStaffResponse = {
    id: string;
    name: string;
    role: string;
  };

  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: AddStaffForm) => {
      const response = await ApiCall({
        query:
          "mutation CreateStaff($createStaffInput: CreateStaffInput!) { createStaff(createStaffInput: $createStaffInput) {id,name,role}}",
        variables: {
          createStaffInput: {
            contact: data.contact,
            name: data.name,
            address: data.address,
            village: data.village,
            district: data.district,
            contact_two: data.contact_two,
            role: data.role,
            alias: data.alias,
          },
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["createStaff"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "createStaff"
      ] as AddStaffResponse;
    },

    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: AddStaffForm) => {
    login.mutate({
      contact: data.contact,
      name: data.name,
      address: data.address,
      village: data.village,
      district: data.district,
      contact_two: data.contact_two,
      role: data.role,
      alias: data.alias,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onFormError)}>
        <div className="mt-2">
          <TextInput<AddStaffForm>
            title="Name"
            required={true}
            name="name"
            placeholder="Enter Name"
          />
        </div>
        <div className="mt-2">
          <TextInput<AddStaffForm>
            title="Alias"
            required={true}
            name="alias"
            placeholder="Enter Alias"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddStaffForm>
            title="Mobile Number"
            required={true}
            name="contact"
            onlynumber={true}
            maxlength={10}
            placeholder="Enter mobile number"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddStaffForm>
            title="Alternate Mobile Number"
            name="contact_two"
            onlynumber={true}
            placeholder="Enter alternate mobile number"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddStaffForm>
            title="Address"
            required={true}
            name="address"
            placeholder="Enter Address"
          />
        </div>

        <div className="mt-2">
          <TextInput<AddStaffForm>
            title="Village"
            required={true}
            name="village"
            placeholder="Enter Village Name"
          />
        </div>
        <div className="mt-2">
          <TextInput<AddStaffForm>
            title="District"
            required={true}
            name="district"
            placeholder="Enter District Name"
          />
        </div>

        <div className="mt-2">
          <MultiSelect<AddStaffForm>
            title="Role"
            required={true}
            name="role"
            placeholder="Select Role"
            options={["SELLERCOW", "SELLERMEDICINE", "SELLERFODDER"].map(
              (item) => ({
                label: item,
                value: item,
              })
            )}
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

export default AddVendorPage;
