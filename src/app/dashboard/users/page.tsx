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
import { Input, Pagination, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Users = () => {
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

  interface SearchUsersResponse {
    limit: number;
    page: number;
    total: number;
    data: {
      id: number;
      contact: string;
      name: string;
      beneficiary_code: string;
      cow_count: number;
    }[];
  }

  const userdata = useQuery({
    queryKey: ["user", pagination.skip, pagination.take, search],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "mutation SearchUsers($searchUserPaginationInput: SearchUserPaginationInput!) { searchUsers(searchUserPaginationInput: $searchUserPaginationInput) {total, skip, take, data {id, name, contact,beneficiary_code, cow_count }}}",
        variables: {
          searchUserPaginationInput: {
            take: pagination.take,
            skip: pagination.skip,
            search: search,
            roles: ["FARMER"],
          },
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["searchUsers"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "searchUsers"
      ] as SearchUsersResponse;
    },
  });

  interface DashboardUserData {
    iddp: number;
    iddp_cow_count: number;
    ssdu: number;
    ssdu_cow_count: number;
    total: number;
    withcows: number;
  }

  const dashboarduserdata = useQuery({
    queryKey: ["dashboarduserdata"],
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query DashboardUserReport {dashboardUserReport {iddp, iddp_cow_count, ssdu, ssdu_cow_count, total, withcows}}",
        variables: {},
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["dashboardUserReport"]) {
        throw new Error("Value not found in response");
      }

      return (response.data as Record<string, unknown>)[
        "dashboardUserReport"
      ] as DashboardUserData;
    },
    refetchOnWindowFocus: false,
  });

  const onChange = (page: number, pagesize: number) => {
    setPaginatin({
      ...pagination,
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    userdata.refetch();
  };
  return (
    <div className="p-6">
      <div className="flex gap-2 items-center">
        <h1 className="text-[#162f57] text-2xl font-semibold">Users</h1>
        <div className="grow"></div>
        {/* <button className="bg-blue-500 text-white px-4 py-1 rounded-md">
          Add User
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
            userdata.refetch();
          }}
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2  items-center mt-2">
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">IDDP/No of cows</p>
            <div className="grow"></div>
            <Tooltip title="IDDP/No of cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <MaterialSymbolsPersonRounded />
            <p className="text-xl font-semibold">
              {dashboarduserdata.data?.iddp}/
              {dashboarduserdata.data?.iddp_cow_count}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">SSDU/No of cows</p>
            <div className="grow"></div>
            <Tooltip title="SSDU/No of cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <IcBaselineAttractions />
            <p className="text-xl font-semibold">
              {dashboarduserdata.data?.ssdu}/
              {dashboarduserdata.data?.ssdu_cow_count}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">Total Users</p>
            <div className="grow"></div>
            <Tooltip title="Total number of Users">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <MaterialSymbolsPersonRounded />
            <p className="text-xl font-semibold">
              {dashboarduserdata.data?.total}
            </p>
          </div>
        </div>
        <div className="flex-1 rounded-md bg-white p-4">
          <div className="flex">
            <p className="text-sm">User With Cows</p>
            <div className="grow"></div>
            <Tooltip title="Total number of Users With Cows">
              <IcOutlineInfo />
            </Tooltip>
          </div>
          <div className="flex gap-2 items-center">
            <FluentDocumentBulletList16Regular />
            <p className="text-xl font-semibold">
              {dashboarduserdata.data?.withcows}
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
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Contact
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Beneficiary Code
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Cow Count
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userdata.data?.data.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {pagination.skip + index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {user.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {user.contact}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {user.beneficiary_code}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    {user.cow_count}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded-md"
                      onClick={() => {
                        router.push(
                          `/dashboard/users/${encryptURLData(
                            user.id.toString()
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
              total={userdata.data?.data.length ? userdata.data?.total : 0}
              pageSizeOptions={[2, 5, 10, 20, 25, 50, 100]}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
