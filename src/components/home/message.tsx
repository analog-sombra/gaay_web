import Image from "next/image";

export default function Message() {
  return (
    <section id="about" className="p-4 md:p-0 md:w-4/6 mx-auto mt-10 flex flex-col lg:flex-row gap-6">
      <div className="container mx-auto bg-[#f8f8ff] p-6 rounded-md">
        <h2 className="text-xl font-medium text-center mb-4">
          MESSAGE FROM HON&apos;BLE CHAIRMAN
        </h2>
        <div className="relative">
          {/* Image Positioned Top Left */}
          <Image
            alt="Chairman"
            src="/1.jpg"
            width={150} // Adjust as needed
            height={150} // Adjust as needed
            className="float-left mr-4 mb-2 rounded-md"
          />
          <p className="text-justify text-xs">
            In the process of development, it is necessary that all the sections
            of society develop in co-ordination with each other. To implement
            this principle, Dadra and Nagar Haveli, Daman & Diu Scheduled Castes
            / Scheduled Tribe, Other Backward Classes and Minorities &
            Handicapped Financial & Development Corporation Ltd. was established
            to cater to the needs of the people of these categories in Daman and
            Diu and Dadra & Nagar Haveli.
            <br />
            <br />
            I would urge all the people belonging to these categories to take
            full advantage of the schemes and benefits provided by the said
            Corporation so that they can develop themselves financially and be
            self-reliant and come up at par with other sections of the society
            or even excel in their respective endeavors.
            <br />
            <br />I wish success to the people of Daman & Diu and Dadra & Nagar
            Haveli belonging to these categories.
          </p>

          <p className="font-bold text-sm text-right">- Shri Praful Patel</p>
        </div>
      </div>
      <div className="container mx-auto bg-[#f8f8ff] p-6 rounded-md">
        <h2 className="text-xl font-medium text-center mb-4">
          MESSAGE FROM MANAGING DIRECTOR
        </h2>
        <div className="relative">
          {/* Image Positioned Top Left */}
          <Image
            alt="Chairman"
            src="/2.jpg"
            width={150} // Adjust as needed
            height={150} // Adjust as needed
            className="float-left mr-4 mb-2 rounded-md object-cover"
          />
          <p className="text-justify text-xs">
            “One may have been born Poor But by Commitment & Hard Work he can
            reach the peak Of Development” Development is a Dynamic process. It
            generally coincides with the Economic Upliftment and Empowerment.
            <br />
            <br />
            Corporation is committed for Both i.e. Financial Assistance for Self
            Employment projects and Empowerment Trainings. We are highly
            sensitive towards the needs of the people we are connected with .
            <br />
            <br />
            “Let us move Forward”
          </p>
        </div>
      </div>
    </section>
  );
}
