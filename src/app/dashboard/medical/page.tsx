"use client";
import { ApiCall } from "@/services/api";
import { encryptURLData } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import { Input, Pagination } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Medical = () => {
  const router = useRouter();
  const [pagination, setPaginatin] = useState<{
    take: number;
    skip: number;
    total: number;
  }>({
    take: 10,
    skip: 0,
    total: 0,
  });

  const [search, setSearch] = useState<string | undefined>(undefined);

  interface SearchCowsResponse {
    limit: number;
    page: number;
    total: number;
    data: {
      id: number;
      reason: string;
      medicalStatus: string;
      cow: {
        cowtagno: string;
        cowname: string;
      };
      farmer: {
        name: string;
        contact: string;
      };
    }[];
  }

  const medicaldata = useQuery({
    queryKey: ["medicalrequest", pagination.skip, pagination.take, search],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "mutation SearchMedicalRequest($searchMedicalPaginationInput: SearchMedicalPaginationInput!) { searchMedicalRequest(searchMedicalPaginationInput: $searchMedicalPaginationInput) {total,skip,take,data {id, reason, medicalStatus, cow {cowtagno,cowname}, farmer {name,contact}}}}",
        variables: {
          searchMedicalPaginationInput: {
            take: pagination.take,
            skip: pagination.skip,
            search: search,
          },
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["searchMedicalRequest"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "searchMedicalRequest"
      ] as SearchCowsResponse;
    },
  });

  const onChange = (page: number, pagesize: number) => {
    setPaginatin({
      ...pagination,
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    medicaldata.refetch();
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 items-center">
        <h1 className="text-[#162f57] text-2xl font-semibold">
          Medical Request
        </h1>
        <div className="grow"></div>
        {/* <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
          Add Medical Request
        </button> */}
        <Input
          placeholder="search"
          style={{ width: 200 }}
          value={search}
          allowClear
          onChange={(e) => {
            setPaginatin({
              ...pagination,
              skip: 0,
              take: pagination.take,
            });
            setSearch(e.target.value);
            medicaldata.refetch();
          }}
        />
      </div>

      <div className="mt-2 p-4 bg-white rounded-md shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full mt-2 border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Sr No.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Cow Tag No.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Farmer
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Contact Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Reason
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Status
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {medicaldata.data?.data.map((medical, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {pagination.skip + index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {medical.cow.cowtagno}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {medical.cow.cowname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {medical.farmer.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {medical.farmer.contact}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {medical.reason}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {medical.medicalStatus}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-md"
                      onClick={() => {
                        router.push(
                          `/dashboard/medical/${encryptURLData(
                            medical.id.toString()
                          )}`
                        );
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mx-auto 500 grid place-items-center">
          <div className="lg:hidden">
            <Pagination
              align="center"
              defaultCurrent={1}
              onChange={onChange}
              showSizeChanger
              total={500}
            />
          </div>
          <div className="hidden lg:block">
            <Pagination
              className="mt-2 mx-auto"
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
              showQuickJumper
              defaultCurrent={1}
              total={
                medicaldata.data?.data.length ? medicaldata.data?.total : 0
              }
              pageSizeOptions={[2, 5, 10, 20, 25, 50, 100]}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medical;
