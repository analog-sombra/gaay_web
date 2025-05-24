"use client";

import AddStaffPage from "@/components/form/addstaff/addstaff";

const AddStaff = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-md shadow-md mt-20">
        <h1>
          <span className="text-[#162f57] text-2xl font-semibold">
            Add Staff
          </span>
        </h1>
        <AddStaffPage />
      </div>
    </div>
  );
};
export default AddStaff;
