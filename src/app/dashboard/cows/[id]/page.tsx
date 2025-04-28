"use client";
import { IcBaselineArrowBack } from "@/components/icons";
import { ApiCall } from "@/services/api";
import { baseurl } from "@/utils/const";
import { decryptURLData, formateDate } from "@/utils/methods";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface CowResponse {
  id: number;
  farmerid: number;
  cowname: string;
  cowstatus: string;
  alias: string;
  breed: {
    name: string;
  };
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
  cow_health_report: {
    black_quarter_date: string;
    brucellossis_date: string;
    food_and_mouth_date: string;
    heat_period: string;
    last_calf_birthdate: string;
    last_deworming_date: string;
    last_sickness_date: string;
    last_treatment_date: string;
    last_vaccine_date: string;
    hemorrhagic_septicemia_date: string;
  }[];
  insurance: {
    insurance_amount: string;
    insurance_date: string;
    insurance_id: string;
    insurance_name: string;
    insurance_renewal_amount: string;
    insurance_renewal_date: string;
  }[];
}

const Cow = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string | string[] }>();
  const idString = Array.isArray(id) ? id[0] : id;
  const cowid: number = parseInt(decryptURLData(idString, router));

  const cowdata = useQuery({
    queryKey: ["getcowbyid"],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const response = await ApiCall({
        query:
          "query GetCowById($id:Int!){getCowById (id:$id){ id, farmerid, alias, cowname, cowstatus, breed { name }, farmer { name, contact, id } photocover, sex, birthdate, cowtagno, noofcalves, weight, daily_milk_produce, cow_health_report { black_quarter_date, brucellossis_date, food_and_mouth_date, heat_period, last_calf_birthdate, last_deworming_date, last_sickness_date, last_treatment_date, last_vaccine_date, hemorrhagic_septicemia_date }, insurance {  insurance_amount,insurance_date,insurance_id,insurance_name,insurance_renewal_amount,insurance_renewal_date}}}",
        variables: {
          id: cowid,
        },
      });

      if (!response.status) {
        throw new Error(response.message);
      }

      // if value is not in response.data then return the error
      if (!(response.data as Record<string, unknown>)["getCowById"]) {
        throw new Error("Value not found in response");
      }
      return (response.data as Record<string, unknown>)[
        "getCowById"
      ] as CowResponse;
    },
  });

  if (cowdata.isLoading) {
    return <div>Loading...</div>;
  }

  if (cowdata.isError) {
    return <div>Error: {cowdata.error.message}</div>;
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
          Cow Data
        </h1>
        <div className="grow"></div>
      </div>

      <div className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {cowdata.data?.photocover == null || cowdata.data?.photocover == "" ? (
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
                src={baseurl + "/" + cowdata.data?.photocover}
                fill={true}
                alt="User Photo"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </>
        )}
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Name</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {cowdata.data?.cowname}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Cow Tag No
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {cowdata.data?.cowtagno}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Alias</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {cowdata.data?.alias}
          </p>
        </div>

        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Breed</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {cowdata.data?.breed.name}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Farmer Name
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {cowdata.data?.farmer.name}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Farmer Contact
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {cowdata.data?.farmer.contact}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">Weight</p>
          <p className="text-sm text-black leading-5 font-semibold">
            {cowdata.data?.weight}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Milk Prouduce
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {cowdata.data?.daily_milk_produce}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            No of Calves
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {cowdata.data?.noofcalves}
          </p>
        </div>
        <div className="bg-gray-100 rounded-md py-2 px-4">
          <p className="text-sm font-normal text-gray-500 leading-3">
            Birth Date
          </p>
          <p className="text-sm text-black leading-5 font-semibold">
            {formateDate(new Date(cowdata.data?.birthdate ?? ""))}
          </p>
        </div>
      </div>

      {cowdata.data?.cow_health_report.length !== 0 && (
        <>
          <div className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Black Quarter Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.cow_health_report[0].black_quarter_date ?? ""
                  )
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Brucellossis Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.cow_health_report[0].brucellossis_date ?? ""
                  )
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Food And Mouth Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.cow_health_report[0].food_and_mouth_date ?? ""
                  )
                )}
              </p>
            </div>

            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Heat Period
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(cowdata.data?.cow_health_report[0].heat_period ?? "")
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Last Calf Birth Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.cow_health_report[0].last_calf_birthdate ?? ""
                  )
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Last Deworming Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.cow_health_report[0].last_deworming_date ?? ""
                  )
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Last Sickness Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.cow_health_report[0].last_sickness_date ?? ""
                  )
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Last Treatment Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.cow_health_report[0].last_treatment_date ?? ""
                  )
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Last Vaccine Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.cow_health_report[0].last_vaccine_date ?? ""
                  )
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Hemorrhagic Septicemia Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.cow_health_report[0]
                      .hemorrhagic_septicemia_date ?? ""
                  )
                )}
              </p>
            </div>
          </div>
        </>
      )}

      {cowdata.data?.insurance.length !== 0 && (
        <>
          <div className="mt-2 p-4 bg-white rounded-md shadow-md grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Insurance Amount
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {cowdata.data?.insurance[0].insurance_amount}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Insurance Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(cowdata.data?.insurance[0].insurance_date ?? "")
                )}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Insurance Name
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {cowdata.data?.insurance[0].insurance_name}
              </p>
            </div>

            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Insurance Renewal Amount
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {cowdata.data?.insurance[0].insurance_renewal_amount}
              </p>
            </div>
            <div className="bg-gray-100 rounded-md py-2 px-4">
              <p className="text-sm font-normal text-gray-500 leading-3">
                Insurance Renewal Date
              </p>
              <p className="text-sm text-black leading-5 font-semibold">
                {formateDate(
                  new Date(
                    cowdata.data?.insurance[0].insurance_renewal_date ?? ""
                  )
                )}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Cow;
