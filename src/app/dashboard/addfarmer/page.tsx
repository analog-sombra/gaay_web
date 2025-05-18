"use client";

import AddFarmerPage from "@/components/form/addfarmer/addfarmer";

const AddFarmer = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-md shadow-md mt-20">
        <h1>
          <span className="text-[#162f57] text-2xl font-semibold">
            Add Farmer
          </span>
        </h1>
        <AddFarmerPage />
      </div>
    </div>
  );
};
export default AddFarmer;
