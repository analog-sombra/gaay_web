"use client";
import { IcBaselineArrowBack } from "@/components/icons";
import { ApiCall } from "@/services/api";
import { baseurl } from "@/utils/const";
import { decryptURLData, formateDate } from "@/utils/methods";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert, Pagination } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface UsersResponse {
  id: number;
  role: string;
}

interface MedicalPaginationResponse {
  take: number;
  skip: number;
  total: number;
  data: MedicalResponse[];
}

interface MedicalResponse {
  id: number;
  name: string;
  cover: string;
  size: string;
  size_unit: string;
  pack_size?: string | null;
  mrp: string;
  sale_price?: string | null;
  description: string;
  purpose: string;
  composition?: string | null;
  manufacturer?: string | null;
  dosage?: string | null;
  large_description?: string | null;
  photo1?: string | null;
  photo2?: string | null;
  photo3?: string | null;
  photo4?: string | null;
  photo5?: string | null;
  purchase_price: string;
}

interface FoodPaginationResponse {
  take: number;
  skip: number;
  total: number;
  data: FoodResponse[];
}

interface FoodResponse {
  id: number;
  name: string;
  cover: string;
  size: string;
  size_unit: string;
  pack_size?: string | null;
  mrp: string;
  sale_price?: string | null;
  description: string;
  purpose: string;
  composition?: string | null;
  manufacturer?: string | null;
  large_description?: string | null;
  photo1?: string | null;
  photo2?: string | null;
  photo3?: string | null;
  photo4?: string | null;
  photo5?: string | null;
  purchase_price: string;
}

interface CowPaginationResponse {
  take: number;
  skip: number;
  total: number;
  data: CowResponse[];
}

interface CowResponse {
  id: number;
  farmerid: number;
  cowid: number;
  listingdate: Date;
  price: string;
  verified: boolean;
  remarks: string;
  cow: {
    id: number;
    farmerid: number;
    cowname: string;
    cowstatus: string;
    alias: string;
    breed: {
      name: string;
    };
    photocover: string;
    sex: string;
    birthdate: string;
    cowtagno: string;
    noofcalves: number;
    weight: number;
    daily_milk_produce: number;
  };
}

enum Datatype {
  COW = "COW",
  MEDICINE = "MEDICINE",
  FOOD = "FOOD",
}
const Market = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string | string[] }>();
  const idString = Array.isArray(id) ? id[0] : id;
  const userid: number = parseInt(decryptURLData(idString, router));

  const [dataType, setDataType] = useState<Datatype>(Datatype.COW);

  const [cows, setCows] = useState<CowResponse[]>([]);
  const [medicines, setMedicines] = useState<MedicalResponse[]>([]);
  const [foods, setFoods] = useState<FoodResponse[]>([]);

  const userdata = useQuery({
    queryKey: ["getUserById"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query GetUserById($id: Int!) { getUserById(id: $id) { id, role }}",
        variables: {
          id: userid,
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["getUserById"]) {
        throw new Error("Value not found in response");
      }
      const userdata: UsersResponse = (
        response.data as Record<string, unknown>
      )["getUserById"] as UsersResponse;

      if (userdata.role == "SELLERCOW") {
        await marketdata.mutateAsync({
          skip: pagination.skip,
          take: pagination.take,
        } as { skip: number; take: number });
        setDataType(Datatype.COW);
      } else if (userdata.role == "SELLERMEDICINE") {
        await medicaldata.mutateAsync({
          skip: pagination.skip,
          take: pagination.take,
        } as { skip: number; take: number });
        setDataType(Datatype.MEDICINE);
      } else if (userdata.role == "SELLERFODDER") {
        await fooddata.mutateAsync({
          skip: pagination.skip,
          take: pagination.take,
        } as { skip: number; take: number });
        setDataType(Datatype.FOOD);
      }
      return userdata;
    },
  });

  const medicaldata = useMutation({
    mutationKey: ["getMarketMedicineByUser"],
    mutationFn: async ({ skip, take }: { skip: number; take: number }) => {
      const response = await ApiCall({
        query:
          "query GetMarketMedicineByUser($id: Int!,$skip: Int!, $take: Int!) { getMarketMedicineByUser(id: $id, skip:$skip, take: $take) { take, skip, total, data {id, name, cover, size, size_unit, pack_size, mrp, sale_price, description, purpose, composition, manufacturer, dosage, large_description, photo1, photo2, photo3, photo4, photo5 }}}",
        variables: {
          id: userid,
          skip: skip,
          take: take,
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (
        !(response.data as Record<string, unknown>)["getMarketMedicineByUser"]
      ) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "getMarketMedicineByUser"
      ] as MedicalPaginationResponse;
    },
    onSuccess: (data) => {
      setMedicines(data.data);
      setPaginatin({
        ...pagination,
        total: data.total,
      });
    },
  });

  const fooddata = useMutation({
    mutationKey: ["getMarketFoodByUser"],
    mutationFn: async ({ skip, take }: { skip: number; take: number }) => {
      const response = await ApiCall({
        query:
          "query GetMarketFoodByUser($id: Int!,$skip: Int!, $take: Int!) { getMarketFoodByUser(id: $id, skip:$skip, take: $take) { take, skip, total, data { id, name, cover, size, size_unit, pack_size, mrp, sale_price, description, purpose, composition, manufacturer, large_description, photo1, photo2, photo3, photo4, photo5 }}}",
        variables: {
          id: userid,
          skip: skip,
          take: take,
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["getMarketFoodByUser"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "getMarketFoodByUser"
      ] as FoodPaginationResponse;
    },
    onSuccess: (data) => {
      setFoods(data.data);
      setPaginatin({
        ...pagination,
        total: data.total,
      });
    },
  });

  const marketdata = useMutation({
    mutationKey: ["getMarketCowByUser"],
    mutationFn: async ({ skip, take }: { skip: number; take: number }) => {
      const response = await ApiCall({
        query:
          "query GetMarketCowByUser($id: Int!,$skip: Int!, $take: Int!) { getMarketCowByUser(id: $id, skip:$skip, take: $take) { take, skip, total data { id, cowid, farmerid, listingdate, price, verified, remarks, cow { id, farmerid, cowname, cowstatus, alias, breed { name }, photocover, sex, birthdate, cowtagno, noofcalves, weight, daily_milk_produce}}}}",
        variables: {
          id: userid,
          skip: skip,
          take: take,
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["getMarketCowByUser"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "getMarketCowByUser"
      ] as CowPaginationResponse;
    },
    onSuccess: (data) => {
      setCows(data.data);
      setPaginatin({
        ...pagination,
        total: data.total,
      });
    },
  });

  const [pagination, setPaginatin] = useState<{
    take: number;
    skip: number;
    total: number;
  }>({
    take: 10,
    skip: 0,
    total: 0,
  });

  const onMarketChange = (page: number, pagesize: number) => {
    setPaginatin({
      ...pagination,
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    marketdata.mutateAsync({
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    setCows([]);
  };

  const onMedicalChange = (page: number, pagesize: number) => {
    setPaginatin({
      ...pagination,
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    medicaldata.mutateAsync({
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    setMedicines([]);
  };

  const onFoodChange = (page: number, pagesize: number) => {
    setPaginatin({
      ...pagination,
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    fooddata.mutateAsync({
      skip: pagesize * (page - 1),
      take: pagesize,
    });
    setFoods([]);
  };

  if (userdata.isLoading) {
    return <div>Loading...</div>;
  }

  if (userdata.isError) {
    return <div>Error: {userdata.error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex gap-1 items-center">
        <button
          className="bg-[#f3f6f8] rounded-lg p-2"
          onClick={() => router.back()}
        >
          <IcBaselineArrowBack className="text-2xl" />
        </button>
        <h1 className="text-[#162f57] text-2xl font-semibold leading-3">
          Market Place Data
        </h1>
        <div className="grow"></div>
      </div>
      {/* cow section start here */}
      {dataType === Datatype.COW && (
        <>
          {cows.length == 0 && (
            <Alert message="No Cow found" type="error" showIcon />
          )}

          {cows.map((cowdata, index) => (
            <>
              <div
                key={index}
                className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
              >
                {cowdata.cow.photocover == null ||
                cowdata.cow.photocover == "" ? (
                  <>
                    <div className="relative col-span-1 row-span-4 rounded-md h-80 sm:h-auto">
                      <Image
                        src={"/missingcow.jpeg"}
                        fill={true}
                        alt="User Photo"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative col-span-1 row-span-4 rounded-md h-80 sm:h-auto">
                      <Image
                        src={baseurl + "/" + cowdata.cow.photocover}
                        fill={true}
                        alt="User Photo"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </>
                )}
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Name
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {cowdata.cow.cowname}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Cow Tag No
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {cowdata.cow.cowtagno}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Alias
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {cowdata.cow.alias}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Breed
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {cowdata.cow.breed.name}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Weight
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {cowdata.cow.weight}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Milk Prouduce
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {cowdata.cow.daily_milk_produce}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    No of Calves
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {cowdata.cow.noofcalves}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Birth Date
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {formateDate(new Date(cowdata.cow.birthdate ?? ""))}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Price
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {cowdata.price}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Listing Date
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {formateDate(new Date(cowdata.listingdate ?? ""))}
                  </p>
                </div>
              </div>
            </>
          ))}

          {cows.length !== 0 && (
            <>
              <div className="mx-auto 500 grid place-items-center">
                <div className="lg:hidden">
                  <Pagination
                    align="center"
                    defaultCurrent={1}
                    onChange={onMarketChange}
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
                    total={marketdata.data?.total}
                    pageSizeOptions={[2, 5, 10, 20, 25, 50, 100]}
                    onChange={onMarketChange}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
      {/* cow section end here */}

      {/* food section start here */}
      {dataType === Datatype.FOOD && (
        <>
          {cows.length == 0 && (
            <Alert message="No Food found" type="error" showIcon />
          )}

          {foods.map((fooddata, index) => (
            <>
              <div
                key={index}
                className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
              >
                {fooddata.cover == null || fooddata.cover == "" ? (
                  <>
                    <div className="relative col-span-1 row-span-4 rounded-md h-80 sm:h-auto">
                      <Image
                        src={"/missingcow.jpeg"}
                        fill={true}
                        alt="User Photo"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative col-span-1 row-span-4 rounded-md h-80 sm:h-auto">
                      <Image
                        src={baseurl + "/" + fooddata.cover}
                        fill={true}
                        alt="Food Photo"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </>
                )}
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Name
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {fooddata.name}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Price
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {fooddata.mrp}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Purchase Price
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {fooddata.purchase_price}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Pack Size
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {fooddata.pack_size}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Manufacturer
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {fooddata.manufacturer}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Descraiption
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {fooddata.description}
                  </p>
                </div>
              </div>
            </>
          ))}

          {foods.length !== 0 && (
            <>
              <div className="mx-auto 500 grid place-items-center">
                <div className="lg:hidden">
                  <Pagination
                    align="center"
                    defaultCurrent={1}
                    onChange={onFoodChange}
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
                    total={fooddata.data?.total}
                    pageSizeOptions={[2, 5, 10, 20, 25, 50, 100]}
                    onChange={onFoodChange}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* food sectin end here */}
      {/* medicine section start here */}
      {dataType === Datatype.MEDICINE && (
        <>
          {medicines.length == 0 && (
            <Alert message="No Food found" type="error" showIcon />
          )}

          {medicines.map((medicinedata, index) => (
            <>
              <div
                key={index}
                className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 "
              >
                {medicinedata.cover == null || medicinedata.cover == "" ? (
                  <>
                    <div className="relative col-span-1 row-span-4 rounded-md h-80 sm:h-auto">
                      <Image
                        src={"/missingcow.jpeg"}
                        fill={true}
                        alt="User Photo"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative col-span-1 row-span-4 rounded-md h-80 sm:h-auto">
                      <Image
                        src={baseurl + "/" + medicinedata.cover}
                        fill={true}
                        alt="Food Photo"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </>
                )}
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Name
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {medicinedata.name}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Price
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {medicinedata.mrp}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Purchase Price
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {medicinedata.purchase_price}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Pack Size
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {medicinedata.pack_size}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Manufacturer
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {medicinedata.manufacturer}
                  </p>
                </div>
                <div className="bg-gray-100 rounded-md py-2 px-4">
                  <p className="text-sm font-normal text-gray-500 leading-3">
                    Descraiption
                  </p>
                  <p className="text-sm text-black leading-5 font-semibold">
                    {medicinedata.description}
                  </p>
                </div>
              </div>
            </>
          ))}

          {medicines.length !== 0 && (
            <>
              <div className="mx-auto 500 grid place-items-center">
                <div className="lg:hidden">
                  <Pagination
                    align="center"
                    defaultCurrent={1}
                    onChange={onMedicalChange}
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
                    total={medicaldata.data?.total}
                    pageSizeOptions={[2, 5, 10, 20, 25, 50, 100]}
                    onChange={onMedicalChange}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* medicine sectin end here */}
    </div>
  );
};
export default Market;
