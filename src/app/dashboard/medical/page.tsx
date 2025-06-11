"use client";
import {
  FluentDocumentBulletList16Regular,
  IcBaselineAttractions,
  IcOutlineInfo,
  MaterialSymbolsPersonRounded,
} from "@/components/icons";
import { ApiCall } from "@/services/api";
import { encryptURLData, formatDateTime, formateDate } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import { Input, Pagination, Popover, Tooltip } from "antd";
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
      scheduled_date: string;
      follow_up_date: string;
      createdAt: string;
      updatedAt: string;
      date: string;
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
          "mutation SearchMedicalRequest($searchMedicalPaginationInput: SearchMedicalPaginationInput!) { searchMedicalRequest(searchMedicalPaginationInput: $searchMedicalPaginationInput) {total,skip,take,data {id, reason, medicalStatus, scheduled_date, follow_up_date, updatedAt, createdAt, date, cow {cowtagno,cowname}, farmer {name,contact}}}}",
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

  interface DashboardMedicalData {
    total: number;
    create: number;
    schedule: number;
    completed: number;
    late: number;
  }

  const dashboardmedicaldata = useQuery({
    queryKey: ["dashboardmedicaldata"],
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query DashboardMedicalReport {dashboardMedicalReport {total, create, schedule, completed, late}}",
        variables: {},
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (
        !(response.data as Record<string, unknown>)["dashboardMedicalReport"]
      ) {
        throw new Error("Value not found in response");
      }

      return (response.data as Record<string, unknown>)[
        "dashboardMedicalReport"
      ] as DashboardMedicalData;
    },
    refetchOnWindowFocus: false,
  });

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const getStatus = (status: string) => {
    if (status === "CREATED") {
      return (
        <p className="text-yellow-500 bg-yellow-500/20 border-yellow-500 rounded px-2 border text-center">
          {status}
        </p>
      );
    }

    if (status === "RESOLVED") {
      return (
        <p className="text-green-500 bg-green-500/20 border-green-500 rounded px-2 border text-center">
          {status}
        </p>
      );
    }

    if (status === "LATE") {
      return (
        <p className="text-red-500 bg-red-500/20 border-red-500 rounded px-2 border text-center">
          {status}
        </p>
      );
    }

    if (
      status === "SCHEDULED" ||
      status === "CANCELLED" ||
      status === "REJECTED" ||
      status === "POSTPONED"
    ) {
      return (
        <p className="text-orange-500 bg-orange-500/20 border-orange-500 rounded px-2 border text-center">
          {status}
        </p>
      );
    }
  };

  const statusOrder = [
    "LATE",
    "CREATED",
    "SCHEDULED",
    "CANCELLED",
    "REJECTED",
    "POSTPONED",
    "RESOLVED",
  ];

  // Helper to get effective status for sorting
  const getEffectiveStatus = (medical: any) => {
    if (
      medical.medicalStatus === "SCHEDULED" &&
      medical.scheduled_date < today.toISOString().split("T")[0]
    ) {
      return "LATE";
    }
    return medical.medicalStatus;
  };

  const sortedMedicalData = (medicaldata.data?.data || [])
    .slice()
    .sort((a, b) => {
      const aStatus = getEffectiveStatus(a);
      const bStatus = getEffectiveStatus(b);
      const aIndex = statusOrder.indexOf(aStatus);
      const bIndex = statusOrder.indexOf(bStatus);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2  items-center mt-2">
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total No. Medical Request</p>
            <div className="grow"></div>
            <Tooltip title="Total number of Medical Requests registered in the system">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <MaterialSymbolsPersonRounded />
            <p className="text-xl font-semibold">
              {dashboardmedicaldata.data?.total}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Created Medical Requests</p>
            <div className="grow"></div>
            <Tooltip title="Total number of Created Medical Requests">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <IcBaselineAttractions />
            <p className="text-xl font-semibold">
              {dashboardmedicaldata.data?.create}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Scheduled/Late Requests</p>
            <div className="grow"></div>
            <Tooltip title="Total number of Scheduled/Late Requests">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <MaterialSymbolsPersonRounded />
            <p className="text-xl font-semibold">
              {dashboardmedicaldata.data?.schedule}/
              {dashboardmedicaldata.data?.late}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Completed Medical Request</p>
            <div className="grow"></div>
            <Tooltip title="Total number of Completed Medical Requests">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <FluentDocumentBulletList16Regular />
            <p className="text-xl font-semibold">
              {dashboardmedicaldata.data?.completed}
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
              {sortedMedicalData.map((medical, index) => (
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
                    {/* {medical.medicalStatus} */}

                    {medical.medicalStatus == "SCHEDULED"
                      ? medical.scheduled_date <
                        today.toISOString().split("T")[0]
                        ? getStatus("LATE")
                        : getStatus("SCHEDULED")
                      : getStatus(medical.medicalStatus)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm flex gap-2 items-center">
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
                    <Popover
                      content={
                        <>
                          <div>
                            Request Date :{" "}
                            {formatDateTime(new Date(medical.date))}
                          </div>
                          <div>
                            Scheduled Date :{" "}
                            {formatDateTime(new Date(medical.scheduled_date))}
                          </div>
                          {medical.medicalStatus == "RESOLVED" && (
                            <>
                              <div>
                                Completed Date :
                                {formatDateTime(new Date(medical.updatedAt))}
                              </div>
                            </>
                          )}
                        </>
                      }
                      title="Details"
                    >
                      <IcOutlineInfo />
                    </Popover>
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
