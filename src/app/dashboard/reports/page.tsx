"use client";
import Link from "next/link";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx"; // Importing XLSX from the correct path
import { useQuery } from "@tanstack/react-query";
import { ApiCall } from "@/services/api";
import { toast } from "react-toastify";

interface CowReportResponse {
  beneficiary_code: string;
  name: string;
  cowtagno: string;
  cowname: string;
  alias: string;
  sex: string;
  birthdate: Date | null;
  weight: number | null;
  daily_milk_produce: number;
  no_of_calves: number;
  bull_calves: number;
  heifer_calves: number;
  cowstatus: string;
  death_date: Date | null;
  death_reason: string | null;
  Beneficiary_Contact: string;
  beneficiary_type: string;
  cow_count: number | null;
  mother_id: number | null;
  mother_cowtagno: string | null;
}

interface UserReportResponse {
  beneficiary_code: string;
  name: string;
  alias: string;
  contact: string;
  contact_two: string | null;
  beneficiary_type: string;
  address: string;
  village: string;
  district: string;
  status: string;
  loan_id: number | null;
  amount: number | null;
  start_date: Date | null;
  end_date: Date | null;
  emi_amount: number | null;
  emi_date: Date | null;
  number_of_cows: number;
  no_of_calves: number;
  alive_cows: number;
  sold_cows: number;
  dead_cows: number;
  number_of_female_calves: number;
  number_of_male_calves: number;
}

const ReportsPage = () => {
  const cowdata = useQuery({
    queryKey: ["cow_report"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query CowReport{ cowReport{ beneficiary_code, name, cowtagno, cowname, alias, sex, birthdate, weight,  daily_milk_produce, no_of_calves, bull_calves, heifer_calves,cowstatus,  death_date, death_reason, Beneficiary_Contact, beneficiary_type, cow_count,  mother_id, mother_cowtagno}}",
        variables: {},
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["cowReport"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "cowReport"
      ] as CowReportResponse[];
    },
  });
  const userdata = useQuery({
    queryKey: ["user_report"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query UserReport {userReport {beneficiary_code,name,alias,contact,contact_two,beneficiary_type,address,village,district,status,loan_id,amount,start_date,end_date,emi_amount,emi_date,number_of_cows,no_of_calves,alive_cows,sold_cows,dead_cows,number_of_female_calves,number_of_male_calves}}",
        variables: {},
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["userReport"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "userReport"
      ] as UserReportResponse[];
    },
  });

  const userExportToExcel = () => {
     if (userdata.data === undefined || userdata.data.length === 0) {
      toast.error("No user data available to export.");
      return;
    }

    const formattedData = userdata.data.map((item) => {
      const formattedItem: Record<string, any> = {};
      Object.entries(item).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          formattedItem[key] = "N/A";
        } else if (key === "start_date" || key === "end_date" || key === "emi_date") {
          formattedItem[key] = new Date(value).toLocaleDateString("en-GB");
        } else {
          formattedItem[key] = value;
        }
      });
      return formattedItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, `${"User_report"}.xlsx`);
  };
  const cowExportToExcel = () => {
    if (cowdata.data === undefined || cowdata.data.length === 0) {
      toast.error("No cow data available to export.");
      return;
    }

    // Format dates to dd-mm-yyyy and replace empty/null/undefined with "NA"
    const formattedData = cowdata.data.map((item) => {
      const formattedItem: Record<string, any> = {};
      Object.entries(item).forEach(([key, value]) => {
        if (key === "birthdate" || key === "death_date") {
          formattedItem[key] = value
            ? new Date(value).toLocaleDateString("en-GB")
            : "N/A";
        } else if (value === null || value === undefined || value === "") {
          formattedItem[key] = "N/A";
        } else {
          formattedItem[key] = value;
        }
      });
      return formattedItem;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(blob, `${"Cow_report"}.xlsx`);
  };

  return (
    <div className="p-6">
      <h1>User Report</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        <div className="p-2 rounded shadow bg-white">
          <p className="text-sm">User Report</p>
          <hr />
          <p className="text-xs mt-2">
            This report provides detailed information about the gaupalak, including their name, loan, cow details.
            It is generated based on the latest data available in the system.
          </p>
          <button
            className="text-blue-500 mt-2 block text-sm font-semibold"
            onClick={userExportToExcel}
          >
            Download Report
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <h1>Cow Report</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        <div className="p-2 rounded shadow bg-white">
          <p className="text-sm">Cow Report</p>
          <hr />
          <p className="text-xs mt-2">
            This report provides detailed information about the registered gir
            cows, including their name, cow tag no, milk production, and
            gaupalak history. It is generated based on the latest data available
            in the system.
          </p>
          <button
            className="text-blue-500 mt-2 block text-sm font-semibold"
            onClick={cowExportToExcel}
          >
            Download Report
          </button>
          {/* <Link
            download={true}
            href={"/cowdata.xlsx"}
            className="text-blue-500 mt-2 block text-sm font-semibold"
          >
            Download Report
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
