"use client";

import AddVendorPage from "@/components/form/addvendor/addvendor";


const AddVendor = () => {
  return (
    <div className="w-full h-full grid place-items-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-md shadow-md mt-20">
        <h1>
          <span className="text-[#162f57] text-2xl font-semibold">
            Add Vendor
          </span>
        </h1>
        <AddVendorPage />
      </div>
    </div>
  );
};
export default AddVendor;
