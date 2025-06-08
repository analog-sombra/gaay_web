"use client";

import {
  FluentDocumentBulletList16Regular,
  FluentShieldAdd48Filled,
  IcBaselineAttractions,
  IcOutlineInfo,
  IcOutlineInsertChart,
  IcRoundTurnedInNot,
  MaterialSymbolsPersonRounded,
  SolarBellBold,
} from "@/components/icons";
import { ApiCall } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { Select, Tooltip } from "antd";
import { useState } from "react";

import { ChartData, Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import Link from "next/link";
import { encryptURLData } from "@/utils/methods";
ChartJS.register(...registerables);

interface DashboardData {
  cows: number;
  medical: number;
  user: number;
  venders: number;
}

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

interface CowResponse {
  id: number;
  farmerid: number;
  cowname: string;
  cowstatus: string;
  alias: string;
  farmer: {
    id: number;
    name: string;
    contact: string;
  };
  photocover: string;
  sex: string;
  birthdate: string;
  cowtagno: string;
  noofcalves: number;
  weight: number;
  daily_milk_produce: number;
}

interface LatestMedicalResponse {
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
  };
  cow: {
    id: number;
    farmerid: number;
    cowname: string;
    cowstatus: string;
    alias: string;
    photocover: string;
    sex: string;
    birthdate: string;
    cowtagno: string;
    noofcalves: number;
    weight: number;
    daily_milk_produce: number;
  };
}

const Dashboard = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const dashboarddata = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query GetDashbordData {getDashbordData {cows,medical,user,venders}}",
        variables: {},
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["getDashbordData"]) {
        throw new Error("Value not found in response");
      }

      return (response.data as Record<string, unknown>)[
        "getDashbordData"
      ] as DashboardData;
    },
    refetchOnWindowFocus: false,
  });

  interface MonthData {
    monthlyData: {
      count: number;
      month: string;
    }[];
  }

  const chardata = useQuery({
    queryKey: ["chartdata", year],
    queryFn: async () => {
      const response = await ApiCall({
        query: `query TreatmentGraph($year: String!) {
          treatmentGraph(year: $year) {
            monthlyData {
              count,
              month
            }  
          }
        }`,
        variables: {
          year: year.toString(),
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["treatmentGraph"]) {
        throw new Error("Value not found in response");
      }

      return (response.data as Record<string, unknown>)[
        "treatmentGraph"
      ] as MonthData;
    },
  });

  const maxValue = Math.max(
    ...(chardata.data?.monthlyData.map((item) => item.count) || [0])
  );
  const yAxisMax = maxValue === 0 ? 10 : maxValue * 2;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        barThickness: 10,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
        title: {
          display: true,
          text: "Month",
          font: {
            size: 14,
            weight: "bold" as const,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          precision: 0,
        },
      },
      y: {
        max: yAxisMax,
        title: {
          display: true,
          text: "No. of Treatments",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          precision: 0,
          callback: function (tickValue: string | number) {
            if (typeof tickValue === "number") {
              return Math.round(tickValue);
            }
            return tickValue;
          },
        },
      },
    },
    indexAxis: "x" as const,
    elements: {
      bar: {
        borderWidth: 2,
        categorySpacing: 0,
      },
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#1e293b",
        font: {
          size: 10,
        },
        formatter: function (value: unknown) {
          return value;
        },
      },

      labels: {
        color: "white",
      },
      title: {
        display: false,
      },
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  // generate label for months from January to December
  const label = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(0, i, 1); // start from January
    return month.toLocaleString("en-US", { month: "short" });
  });

  // import { ChartData } from "chart.js";

  const dataset: ChartData<"bar"> = {
    labels: label,
    datasets: [
      {
        label: "Treatments",
        data: chardata.data?.monthlyData.map((item) => item.count) || [],
        backgroundColor: "#95acbe",
        borderWidth: 0,
      },
    ],
  };

  const userdata = useQuery({
    queryKey: ["latestFarmer"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query LatestFarmer{ latestFarmer{ id, name, alias, contact, beneficiary_code, address, village, district, category, occupation, beneficiary_type, cow_count, photo }}",
        variables: {},
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["latestFarmer"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "latestFarmer"
      ] as UsersResponse;
    },
  });

  const cowdata = useQuery({
    queryKey: ["latestCow"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query LatestCow{ latestCow{ id, farmerid, alias, cowname, cowstatus, farmer { name, contact, id } photocover, sex, birthdate, cowtagno, noofcalves, weight, daily_milk_produce}}",
        variables: {},
      });
      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["latestCow"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "latestCow"
      ] as CowResponse;
    },
  });

  const medicaldata = useQuery({
    queryKey: ["latestMedicalRequest"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query LatestMedicalRequest{ latestMedicalRequest{ id, type, remarks, reason, date, follow_up_treatment, follow_up_date, scheduled_date, complaint_no, medicalStatus, treatment_provided, farmer { name, contact, id }, cow { id, farmerid, alias, cowname, cowstatus, photocover, sex, birthdate, cowtagno, noofcalves, weight, daily_milk_produce}}}",
        variables: {},
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["latestMedicalRequest"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "latestMedicalRequest"
      ] as LatestMedicalResponse;
    },
  });

  if (medicaldata.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (medicaldata.isError) {
    return <div>Error: {medicaldata.error.message}</div>;
  }

  if (cowdata.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (cowdata.isError) {
    return <div>Error: {cowdata.error.message}</div>;
  }

  if (userdata.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (userdata.isError) {
    return <div>Error: {userdata.error.message}</div>;
  }

  if (dashboarddata.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grow w-full  flex flex-col gap-4 p-4">
        <div className="flex w-full items-center gap-4">
          <p className="text-white bg-black rounded-full font-semibold h-10 w-10 grid place-items-center">
            SCST
          </p>
          <div>
            <p>Department</p>
            <p>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="grow"></div>
          {/* <Search placeholder="search" style={{ width: 200 }} /> */}
        </div>

        <div className="rounded-lg bg-white p-2 flex flex-row gap-4 items-center">
          <SolarBellBold className="text-black text-4xl" />
          <div>
            <p className="text-xl font-semibold">Important Message</p>
            <p className="text-sm text-gray-600">
              {dashboarddata.data?.medical} Pending Medical Alerts - Action
              Needed
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2  items-center">
          <Link href="/dashboard/users">
            <div className="flex-1 rounded-md bg-white p-4">
              <div className="flex">
                <p className="text-sm">Total No. of Gaupalak</p>
                <div className="grow"></div>
                <Tooltip title="Total number of Gaupalak registered in the system">
                  <IcOutlineInfo />
                </Tooltip>
              </div>
              <div className="flex gap-2 items-center">
                <MaterialSymbolsPersonRounded />
                <p className="text-xl font-semibold">
                  {dashboarddata.data?.user}
                </p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/cows">
            <div className="flex-1 rounded-md bg-white p-4">
              <div className="flex">
                <p className="text-sm">Total No. Cows</p>
                <div className="grow"></div>
                <Tooltip title="Total number of Cows registered in the system">
                  <IcOutlineInfo />
                </Tooltip>
              </div>
              <div className="flex gap-2 items-center">
                <IcBaselineAttractions />
                <p className="text-xl font-semibold">
                  {dashboarddata.data?.cows}
                </p>
              </div>
            </div>
          </Link>
          <Link href="/dashboard/marketplace">
            <div className="flex-1 rounded-md bg-white p-4">
              <div className="flex">
                <p className="text-sm">Total No. of Vendors</p>
                <div className="grow"></div>
                <Tooltip title="Total number of Vendors registered in the system">
                  <IcOutlineInfo />
                </Tooltip>
              </div>
              <div className="flex gap-2 items-center">
                <MaterialSymbolsPersonRounded />
                <p className="text-xl font-semibold">
                  {dashboarddata.data?.venders}
                </p>
              </div>
            </div>
          </Link>
          <Link href="/dashboard/medical">
            <div className="flex-1 rounded-md bg-white p-4">
              <div className="flex">
                <p className="text-sm">Pending Medical Request</p>
                <div className="grow"></div>
                <Tooltip title="Total number of Pending Medical Requests">
                  <IcOutlineInfo />
                </Tooltip>
              </div>
              <div className="flex gap-2 items-center">
                <FluentDocumentBulletList16Regular />
                <p className="text-xl font-semibold">
                  {dashboarddata.data?.medical}
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 grid-cols-1  gap-2 items">
          <div className="rounded-lg bg-white p-2 flex-1">
            <div className=" p-2 flex flex-row gap-4 items-center">
              <FluentDocumentBulletList16Regular className="text-black text-xl" />
              <div>
                <p className="text-lg font-semibold">Recent Task</p>
                <p className="text-sm text-gray-600">
                  Click on Task to view in Details
                </p>
              </div>
            </div>

            <MedicalRequestCard
              title="New Medical Request"
              name={medicaldata.data?.farmer.name || "-"}
              cowname={medicaldata.data?.cow.cowname || "-"}
              status={medicaldata.data?.reason || "-"}
              icon={
                <FluentShieldAdd48Filled className="text-blue-500 text-4xl" />
              }
              id={1}
              link={`/dashboard/medical/${encryptURLData(
                medicaldata.data?.id.toString() || "1"
              )}`}
            />
            <CowCard
              title="New Cow Added"
              name={cowdata.data?.cowname || "-"}
              tagno={cowdata.data?.cowtagno || "-"}
              farmer={cowdata.data?.farmer.name || "-"}
              icon={
                <IcBaselineAttractions className="text-blue-500 text-4xl" />
              }
              id={1}
              link={`/dashboard/cows/${encryptURLData(
                cowdata.data?.id.toString() || "1"
              )}`}
            />
            <FarmerCard
              title="Gauplak Profile Created"
              name={userdata.data?.name || "-"}
              contact={userdata.data?.contact || "-"}
              code={userdata.data?.beneficiary_code || "-"}
              status="In Progress"
              icon={
                <MaterialSymbolsPersonRounded className="text-blue-500 text-4xl" />
              }
              link={`/dashboard/users/${encryptURLData(
                userdata.data?.id.toString() || "1"
              )}`}
              id={1}
            />
          </div>

          <div className="flex-1">
            <div className="rounded-lg bg-white p-2">
              <div className=" p-2 flex flex-row gap-4 items-center">
                <IcOutlineInsertChart className="text-blue-500 text-3xl" />
                <div>
                  <p className="text-lg">No. of Medical Treatments Vs Month</p>
                  <p className="text-sm">Graph & Analysis</p>
                </div>
                <div className="grow"></div>
                <Select
                  showSearch
                  style={{ width: 100 }}
                  placeholder="Select Year"
                  defaultValue={new Date().getFullYear().toString()}
                  optionFilterProp="children"
                  onChange={(value) => {
                    setYear(parseInt(value));
                    chardata.refetch();
                  }}
                  value={year.toString()}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={Array.from({ length: 10 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return {
                      value: year.toString(),
                      label: year.toString(),
                    };
                  })}
                />
              </div>
              <div className="bg-white h-80 shadow-sm rounded-md p-4 col-span-6 lg:col-span-4">
                <Bar options={options} data={dataset} />
              </div>
            </div>
            <div className="rounded-lg bg-white p-2 mt-2">
              <div className=" p-2 flex flex-row gap-4 items-center">
                <IcRoundTurnedInNot className="text-blue-500 text-3xl" />
                <p className="text-lg">Quick Access</p>
              </div>
              <div className="gap-4 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
                <Link
                  href={"/dashboard/addfarmer"}
                  className="bg-[#f1e0cd] rounded-md grid place-items-center py-6 text-center px-4"
                >
                  Add New Gaupalak
                </Link>
                <Link
                  href={"/dashboard/addvendor"}
                  className="bg-[#f1e0cd] rounded-md grid place-items-center py-6 text-center px-4"
                >
                  Add New Vendor
                </Link>

                <Link
                  href={"/dashboard/addstaff"}
                  className="bg-[#f1e0cd] rounded-md grid place-items-center py-6 text-center px-4"
                >
                  Add New Staff
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

interface MedicalRequestCardProps {
  id: number;
  title: string;
  name: string;
  cowname: string;
  status: string;
  icon: React.ReactNode;
  link: string;
}

const MedicalRequestCard = (props: MedicalRequestCardProps) => {
  return (
    <div className=" p-2 flex flex-row gap-4 items-center shadow-md rounded-md mt-2">
      {props.icon}
      <div className="grow">
        <p className="text-lg font-semibold">{props.title}</p>
        <p className="text-sm text-gray-600">Gaupalak Name: {props.name}</p>
        <p className="text-sm text-gray-600">Cow Name : {props.cowname}</p>
        <p className="text-sm text-gray-600">Status: {props.status}</p>
      </div>
      <Link
        href={props.link}
        className="bg-blue-500 text-white rounded-full px-2 py-1 shrink-0 w-32 text-center"
      >
        View Details
      </Link>
    </div>
  );
};
interface CowCardProps {
  id: number;
  title: string;
  name: string;
  farmer: string;
  tagno: string;
  icon: React.ReactNode;
  link: string;
}

const CowCard = (props: CowCardProps) => {
  return (
    <div className=" p-2 flex flex-row gap-4 items-center shadow-md rounded-md mt-2">
      {props.icon}
      <div className="grow">
        <p className="text-lg font-semibold">{props.title}</p>
        <p className="text-sm text-gray-600">Gaupalak Name: {props.farmer}</p>
        <p className="text-sm text-gray-600">Cow Name : {props.name}</p>
        <p className="text-sm text-gray-600">Tag No: {props.tagno}</p>
      </div>
      <Link
        href={props.link}
        className="bg-blue-500 text-white rounded-full px-2 py-1 shrink-0 w-32 text-center"
      >
        View Details
      </Link>
    </div>
  );
};

interface FarmerCardProps {
  id: number;
  title: string;
  name: string;
  contact: string;
  code: string;
  status: string;
  icon: React.ReactNode;
  link: string;
}

const FarmerCard = (props: FarmerCardProps) => {
  return (
    <div className=" p-2 flex flex-row gap-4 items-center shadow-md rounded-md mt-2">
      {props.icon}
      <div className="grow">
        <p className="text-lg font-semibold">{props.title}</p>
        <p className="text-sm text-gray-600">Gaupalak Name: {props.name}</p>
        <p className="text-sm text-gray-600">Contact : {props.contact}</p>
        <p className="text-sm text-gray-600">Beneficiary Code: {props.code}</p>
      </div>
      <Link
        href={props.link}
        className="bg-blue-500 text-white rounded-full px-2 py-1 shrink-0 w-32 text-center"
      >
        View Details
      </Link>
    </div>
  );
};
