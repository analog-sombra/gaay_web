"use client";
import { IcBaselineArrowBack } from "@/components/icons";
import { ApiCall } from "@/services/api";
import { baseurl } from "@/utils/const";
import { decryptURLData, formateDate } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface MedicalResponse {
  id: number;
  type: string;
  remarks: string;
  follow_up_treatment: string;
  follow_up_date: Date;
  treatment_provided: string;
  date: Date;
  reason: string;
  doctorid: number;
  farmer: {
    id: number;
    name: string;
    contact: string;
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

  const medicaldata = useQuery({
    queryKey: ["getmedicalbyid"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query GetMedicalRequestById($id:Int!){getMedicalRequestById (id:$id){ id, type, remarks, reason, date, follow_up_treatment, follow_up_date, treatment_provided, farmer { name, contact, id }, cow { id, farmerid, alias, cowname, cowstatus, breed { name },  photocover, sex, birthdate, cowtagno, noofcalves, weight, daily_milk_produce}}}",
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
      </div>
      <div className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Doctor Name
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.doctorid ? medicaldata.data?.doctor.name : "N/A"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Doctor Contact
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {medicaldata.data?.doctorid
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
