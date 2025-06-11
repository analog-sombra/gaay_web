"use client";
import {
  FluentDocumentBulletList16Regular,
  IcBaselineAttractions,
  IcOutlineInfo,
  MaterialSymbolsPersonRounded,
} from "@/components/icons";
import { ApiCall } from "@/services/api";
import { encryptURLData } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import { Input, Pagination, Popover, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Cows = () => {
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
      cowtagno: string;
      cowname: string;
      farmer: {
        name: string;
        contact: string;
        beneficiary_code: string;
      };
    }[];
  }

  const cowdata = useQuery({
    queryKey: ["cows", pagination.skip, pagination.take, search],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "mutation SearchCows($searchCowPaginationInput: SearchCowPaginationInput!) { searchCows(searchCowPaginationInput: $searchCowPaginationInput) {total,skip,take,data {id, cowtagno,cowname,farmer {name,contact, beneficiary_code}}}}",
        variables: {
          searchCowPaginationInput: {
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
      if (!(response.data as Record<string, unknown>)["searchCows"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "searchCows"
      ] as SearchCowsResponse;
    },
  });

  interface DashboardCowData {
    total: number;
    alive: number;
    dead: number;
    sold: number;
    heifer: number;
    calf: number;
    cow_alive: number;
    cow_dead: number;
  }

  const dashboardcowdata = useQuery({
    queryKey: ["dashboardcowdata"],
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query DashboardCowReport {dashboardCowReport {total, alive, dead, sold, heifer, calf, cow_alive, cow_dead }}",
        variables: {},
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["dashboardCowReport"]) {
        throw new Error("Value not found in response");
      }

      return (response.data as Record<string, unknown>)[
        "dashboardCowReport"
      ] as DashboardCowData;
    },
    refetchOnWindowFocus: false,
  });

  const onChange = (page: number, pagesize: number) => {
    setPaginatin({
      ...pagination,
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    cowdata.refetch();
  };
  return (
    <div className="p-6">
      <div className="flex gap-2 items-center">
        <h1 className="text-[#162f57] text-2xl font-semibold">Cows</h1>
        <div className="grow"></div>
        {/* <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
          Add Cow
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
            cowdata.refetch();
          }}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2  items-center mt-2">
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total No of cows</p>
            <div className="grow"></div>
            <Tooltip title="Total No of cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <MaterialSymbolsPersonRounded />
            <p className="text-xl font-semibold">
              {dashboardcowdata.data?.total}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total No of alive cows</p>
            <div className="grow"></div>
            <Tooltip title="Total No of alive cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <IcBaselineAttractions />
            <p className="text-xl font-semibold">
              {dashboardcowdata.data?.alive}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total No of dead cows</p>
            <div className="grow"></div>
            <Tooltip title="Total number of dead cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <MaterialSymbolsPersonRounded />
            <p className="text-xl font-semibold">
              {dashboardcowdata.data?.dead}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total No of sold cows</p>
            <div className="grow"></div>
            <Tooltip title="Total number of sold cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <FluentDocumentBulletList16Regular />
            <p className="text-xl font-semibold">
              {dashboardcowdata.data?.sold}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total No of heifer cows</p>
            <div className="grow"></div>
            <Tooltip title="Total No of heifer cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <MaterialSymbolsPersonRounded />
            <p className="text-xl font-semibold">
              {dashboardcowdata.data?.heifer}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total no of calf</p>
            <div className="grow"></div>
            <Tooltip title="Total no of calf">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <IcBaselineAttractions />
            <p className="text-xl font-semibold">
              {dashboardcowdata.data?.calf}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total no of cow alive</p>
            <div className="grow"></div>
            <Tooltip title="Total number of alive cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <MaterialSymbolsPersonRounded />
            <p className="text-xl font-semibold">
              {dashboardcowdata.data?.cow_alive}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total no of cow dead</p>
            <div className="grow"></div>
            <Tooltip title="Total number of dead cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <FluentDocumentBulletList16Regular />
            <p className="text-xl font-semibold">
              {dashboardcowdata.data?.cow_dead}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 p-4 bg-white rounded-md shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full mt-2 border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Beneficiary Code
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Farmer
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Cow Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Cow Tag No.
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Contact Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cowdata.data?.data.map((cow, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {cow.farmer.beneficiary_code}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {cow.farmer.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {cow.cowname}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {cow.cowtagno}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {cow.farmer.contact}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-md"
                      onClick={() => {
                        router.push(
                          `/dashboard/cows/${encryptURLData(cow.id.toString())}`
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
              total={cowdata.data?.data.length ? cowdata.data?.total : 0}
              pageSizeOptions={[2, 5, 10, 20, 25, 50, 100]}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cows;
