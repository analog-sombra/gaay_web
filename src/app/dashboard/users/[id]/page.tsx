"use client";
import { IcBaselineArrowBack } from "@/components/icons";
import { ApiCall } from "@/services/api";
import { baseurl } from "@/utils/const";
import { decryptURLData } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface UsersResponse {
  id: number;
  name: string;
  alias: string;
  contact: string;
  beneficiary_code: string;
  address: string;
  village: string;
  district: string;
  category: string;
  occupation: string;
  beneficiary_type: string;
  cow_count: number;
  photo: string | null;
}

const User = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string | string[] }>();
  const idString = Array.isArray(id) ? id[0] : id;
  const userid: number = parseInt(decryptURLData(idString, router));

  const userdata = useQuery({
    queryKey: ["getuserbyid"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query GetUserById($id: Int!) { getUserById(id: $id) { id, name, alias, contact, beneficiary_code, address, village, district, category, occupation, beneficiary_type, cow_count, photo }}",
        variables: {
          id: userid,
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["getUserById"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "getUserById"
      ] as UsersResponse;
    },
  });

  if (userdata.isLoading) {
    return <div>Loading...</div>;
  }

  if (userdata.isError) {
    return <div>Error: {userdata.error.message}</div>;
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
          User Data
        </h1>
        <div className="grow"></div>
      </div>

      <div className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {userdata.data?.photo == null || userdata.data?.photo == "" ? (
          <>
            <div className="relative col-span-1 row-span-4 rounded-md h-80 sm:h-auto">
              <Image
                src={"/avatar.jpg"}
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
                src={baseurl + "/" + userdata.data?.photo}
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
            {userdata.data?.name}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Alias</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {userdata.data?.alias}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Contact</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {userdata.data?.contact}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Beneficiary Code
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {userdata.data?.beneficiary_code}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Benefiary Type
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {userdata.data?.beneficiary_type}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Category
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {userdata.data?.category
              ? userdata.data?.category
              : "Not Available"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Address</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {userdata.data?.address ? userdata.data?.address : "Not Available"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Village</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {userdata.data?.village ? userdata.data?.village : "Not Available"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            District
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {userdata.data?.district
              ? userdata.data?.district
              : "Not Available"}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Cow Count
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {userdata.data?.cow_count ? userdata.data?.cow_count : "0"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default User;
