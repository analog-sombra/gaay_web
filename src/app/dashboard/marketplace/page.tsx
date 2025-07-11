"use client";
import { ApiCall } from "@/services/api";
import { encryptURLData } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import { Alert, Input, Pagination, Radio } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

enum Role {
  SELLERCOW = "SELLERCOW",
  SELLERMEDICINE = "SELLERMEDICINE",
  SELLERFODDER = "SELLERFODDER",
}

const MarketPlace = () => {
  const router = useRouter();

  const roleoptions = [
    { label: "SELLERCOW", value: "SELLERCOW" },
    { label: "SELLERMEDICINE", value: "SELLERMEDICINE" },
    { label: "SELLERFODDER", value: "SELLERFODDER" },
  ];

  const [role, setRole] = useState<Role>(Role.SELLERCOW);

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
    }[];
  }

  const userdata = useQuery({
    queryKey: ["user", pagination.skip, pagination.take, search, role],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "mutation SearchUsers($searchUserPaginationInput: SearchUserPaginationInput!) { searchUsers(searchUserPaginationInput: $searchUserPaginationInput) {total, skip, take, data {id, name, contact,beneficiary_code }}}",
        variables: {
          searchUserPaginationInput: {
            take: pagination.take,
            skip: pagination.skip,
            search: search,
            roles: [role],
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

  const onChange = (page: number, pagesize: number) => {
    setPaginatin({
      ...pagination,
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    // userdata.refetch();
  };
  return (
    <div className="p-6">
      <div className="flex gap-2 items-center">
        <h1 className="text-[#162f57] text-2xl font-semibold">Market Place</h1>
        <div className="grow"></div>
        <Radio.Group
          options={roleoptions}
          onChange={(val) => {
            setPaginatin({
              ...pagination,
              skip: 0,
              take: pagination.take,
            });
            setRole(val.target.value);
            // userdata.refetch();
          }}
          value={role}
          optionType="button"
          buttonStyle="solid"
        />
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

      <div className="mt-2 p-4 bg-white rounded-md shadow-md">
        {userdata.data?.data.length == 0 ? (
          <Alert message="No Data Found" type="error" showIcon />
        ) : (
          <>
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
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-md"
                          onClick={() => {
                            router.push(
                              `/dashboard/marketplace/${encryptURLData(
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
          </>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
