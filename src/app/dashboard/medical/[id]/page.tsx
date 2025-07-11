"use client";
import { DateSelect } from "@/components/form/inputfields/dateselect";
import { MultiSelect } from "@/components/form/inputfields/multiselect";
import { IcBaselineArrowBack } from "@/components/icons";
import { AddDoctorForm, AddDoctorSchema } from "@/schema/adddoctor";
import { ApiCall } from "@/services/api";
import { baseurl } from "@/utils/const";
import { decryptURLData, formateDate, onFormError } from "@/utils/methods";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Drawer } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import dayjs from "dayjs";

interface MedicalResponse {
  id: number;
  type: string;
  remarks: string;
  follow_up_treatment: string;
  follow_up_date: Date;
  treatment_provided: string;
  date: Date;
  scheduled_date: Date;
  reason: string;
  doctorid: number;
  medicalStatus: string;
  complaint_no: string;
  farmer: {
    id: number;
    name: string;
    contact: string;
    beneficiary_code: string;
    address: string;
  };
  doctor: {
    id: number;
    name: string;
    contact: string;
  };
  cow: {
    id: number;
    farmerid: number;
    cowname: string;
    cowstatus: string;
    alias: string;
    breed: {
      name: string;
    };

    photocover: string;
    sex: string;
    birthdate: string;
    cowtagno: string;
    noofcalves: number;
    weight: number;
    daily_milk_produce: number;
  };
}

const Medical = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string | string[] }>();
  const idString = Array.isArray(id) ? id[0] : id;
  const medicalid: number = parseInt(decryptURLData(idString, router));

  const [open, setOpen] = useState(false);
  const medicaldata = useQuery({
    queryKey: ["getmedicalbyid"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query GetMedicalRequestById($id:Int!){getMedicalRequestById (id:$id){ id, type, remarks, reason, date, follow_up_treatment, follow_up_date, scheduled_date, complaint_no, medicalStatus, treatment_provided, farmer { name, contact, id, beneficiary_code, address },  doctor { id, name, contact }, cow { id, farmerid, alias, cowname, cowstatus, breed { name },  photocover, sex, birthdate, cowtagno, noofcalves, weight, daily_milk_produce}}}",
        variables: {
          id: medicalid,
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (
        !(response.data as Record<string, unknown>)["getMedicalRequestById"]
      ) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "getMedicalRequestById"
      ] as MedicalResponse;
    },
  });

  if (medicaldata.isLoading) {
    return <div>Loading...</div>;
  }

  if (medicaldata.isError) {
    return <div>Error: {medicaldata.error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex gap-1 items-center">
        <button
          className="bg-[#f3f6f8] rounded-lg p-2"
          onClick={() => router.back()}
        >
          <IcBaselineArrowBack className="text-2xl" />
        </button>
        <h1 className="text-[#162f57] text-2xl font-semibold leading-3">
          Medical Request Data
        </h1>
        <div className="grow"></div>
        {medicaldata.data?.medicalStatus == "CREATED" && (
          <button
            className="bg-blue-500 text-white px-4 py-1 h-8 rounded-md hover:bg-blue-600 transition-colors duration-200"
            onClick={() => setOpen(true)}
          >
            Assign Doctor
          </button>
        )}
        {medicaldata.data?.medicalStatus == "SCHEDULED" && (
          <button
            className="bg-rose-500 text-white px-4 py-1 h-8 rounded-md hover:bg-rose-600 transition-colors duration-200"
            onClick={() => setOpen(true)}
          >
            Reassign Doctor
          </button>
        )}
        <Drawer
          size="large"
          title={
            medicaldata.data?.medicalStatus === "SCHEDULED"
              ? "Reassign Doctor"
              : "Assign Doctor"
          }
          onClose={() => setOpen(false)}
          open={open}
        >
          <AddDoctor id={medicalid} />
        </Drawer>
      </div>

      <div className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {medicaldata.data?.cow.photocover == null ||
        medicaldata.data?.cow.photocover == "" ? (
          <>
            <div className="relative col-span-1 row-span-4 rounded-md h-80 sm:h-auto">
              <Image
                src={"/missingcow.jpeg"}
                fill={true}
                alt="User Photo"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </>
        ) : (
          <>
            <div className="relative col-span-1 row-span-4 rounded-md h-80 sm:h-auto">
              <Image
                src={baseurl + "/" + medicaldata.data?.cow.photocover}
                fill={true}
                alt="User Photo"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </>
        )}
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Name</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.cow.cowname}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Cow Tag No
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.cow.cowtagno}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Alias</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.cow.alias}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Breed</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.cow.breed.name}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Farmer Name
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.farmer.name}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Farmer Contact
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.farmer.contact}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Weight</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.cow.weight}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Milk Prouduce
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.cow.daily_milk_produce}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            No of Calves
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.cow.noofcalves}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Birth Date
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {formateDate(new Date(medicaldata.data?.cow.birthdate ?? ""))}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Beneficial Code
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.farmer.beneficiary_code ?? "N/A"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Address</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.farmer.address ?? "N/A"}
          </p>
        </div>
      </div>
      <div className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Doctor Name
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.doctor ? medicaldata.data?.doctor.name : "N/A"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Doctor Contact
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.doctor
              ? medicaldata.data?.doctor.contact
              : "N/A"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Reason</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.reason}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Complaint Date
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.date
              ? formateDate(new Date(medicaldata.data?.date ?? ""))
              : "N/A"}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Complaint No
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.complaint_no
              ? medicaldata.data?.complaint_no
              : "N/A"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Shcheduled Date
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.scheduled_date
              ? formateDate(new Date(medicaldata.data?.scheduled_date ?? ""))
              : "N/A"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Medical Status
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.medicalStatus}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Follow up Date
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.follow_up_date
              ? formateDate(new Date(medicaldata.data?.follow_up_date ?? ""))
              : "N/A"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4 lg:col-span-2">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Treatment Provided
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.treatment_provided ?? "N/A"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4 lg:col-span-2">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Follow up Treatment
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.follow_up_treatment ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Medical;

interface AddDoctorProps {
  id: number;
}
const AddDoctor = (props: AddDoctorProps) => {
  const router = useRouter();
  const methods = useForm<AddDoctorForm>({
    resolver: valibotResolver(AddDoctorSchema),
  });

  type AddMedicalResponse = {
    id: string;
  };

  type userResponse = {
    id: string;
    name: string;
    contact: string;
    role: string;
  };

  const userdata = useQuery({
    queryKey: ["searchUsersByRole"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "mutation SearchUsersByRole($role: [String!]!) { searchUsersByRole(role: $role) {id, name, contact, role}}",
        variables: {
          role: ["STOCKMEN", "DOCTOR"],
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["searchUsersByRole"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "searchUsersByRole"
      ] as userResponse[];
    },
  });

  const assigndoctor = useMutation({
    mutationKey: ["assignDoctor"],
    mutationFn: async (data: AddDoctorForm) => {
      const response = await ApiCall({
        query:
          "mutation AddDoctor($addDoctorInput: AddDoctorInput!) {addDoctor(addDoctorInput: $addDoctorInput) { id }}",
        variables: {
          addDoctorInput: {
            doctorid: data.doctorid,
            scheduled_date: data.scheduled_date,
            id: props.id,
          },
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["addDoctor"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "addDoctor"
      ] as AddMedicalResponse;
    },

    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: AddDoctorForm) => {
    assigndoctor.mutate({
      doctorid: data.doctorid,
      scheduled_date: data.scheduled_date,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit, onFormError)}>
        <div>
          <MultiSelect<AddDoctorForm>
            title="Doctor"
            required={true}
            name="doctorid"
            placeholder="Select Doctor"
            options={
              userdata.data?.map((user) => ({
                label: user.name + " (" + user.contact + ") - " + user.role,
                value: user.id,
              })) ?? []
            }
          />
        </div>

        <div className="mt-2">
          <DateSelect<AddDoctorForm>
            title="Scheduled Date"
            required={true}
            name="scheduled_date"
            placeholder="Enter Scheduled Date"
            format="DD/MM/YYYY"
            mindate={dayjs().subtract(30, "day")}
          />
        </div>

        <button
          type="submit"
          disabled={methods.formState.isSubmitting}
          className="py-1 rounded-md bg-blue-500 px-4 text-sm text-white mt-2 cursor-pointer w-full"
        >
          {assigndoctor.isPending ? "Loading..." : "Assign Doctor"}
        </button>
      </form>
    </FormProvider>
  );
};
