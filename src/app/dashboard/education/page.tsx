"use client";
import { ApiCall } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Alert, Input, Pagination, Radio } from "antd";
import { useState } from "react";

enum Learn {
  FOOD = "FOOD",
  HEALTH = "HEALTH",
  MEDICINE = "MEDICINE",
}

const Educations = () => {
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

  const [learn, setLearn] = useState<Learn>(Learn.FOOD);

  const learnoptions = [
    { label: "FOOD", value: "FOOD" },
    { label: "HEALTH", value: "HEALTH" },
    { label: "MEDICINE", value: "MEDICINE" },
  ];

  interface SearchEducationResponse {
    limit: number;
    page: number;
    total: number;
    data: {
      id: number;
      title: string;
      description: string;
      type: string;
      link: string;
    }[];
  }

  const educationdata = useQuery({
    queryKey: ["education", pagination.skip, pagination.take, search],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "mutation SearchLearn($searchLearnPaginationInput: SearchLearnPaginationInput!) { searchLearn(searchLearnPaginationInput: $searchLearnPaginationInput) {total, skip, take, data {id, title, description, type, link }}}",
        variables: {
          searchLearnPaginationInput: {
            take: pagination.take,
            skip: pagination.skip,
            search: search,
            learn: learn,
          },
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["searchLearn"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "searchLearn"
      ] as SearchEducationResponse;
    },
  });

  const onChange = (page: number, pagesize: number) => {
    setPaginatin({
      ...pagination,
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    educationdata.refetch();
  };
  return (
    <div className="p-6">
      <div className="flex gap-2 items-center">
        <h1 className="text-[#162f57] text-2xl font-semibold">Education</h1>
        <div className="grow"></div>
        <Radio.Group
          options={learnoptions}
          onChange={(val) => {
            setPaginatin({
              ...pagination,
              skip: 0,
              take: pagination.take,
            });
            setLearn(val.target.value);
            educationdata.refetch();
          }}
          value={learn}
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
            educationdata.refetch();
          }}
        />
      </div>

      <div className="mt-2 p-4 bg-white rounded-md shadow-md">
        {educationdata.data?.data.length == 0 ? (
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
                      Title
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                      Description
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-md font-normal">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {educationdata.data?.data.map((learn, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                        {pagination.skip + index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                        {learn.title}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                        {learn.description}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 font-normal text-sm">
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-md"
                          onClick={() => {
                            window.open(learn.link, "_blank");
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
                    educationdata.data?.data.length
                      ? educationdata.data?.total
                      : 0
                  }
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

export default Educations;
