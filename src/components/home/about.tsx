import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="w-4/6 mx-auto mt-6">
      <div className="container mx-auto">
        <div className="bg-[#f8f8ff] p-3 rounded-md">
          <h2 className="text-3xl font-medium text-center">Key Features</h2>
          <div className="h-[1px] w-full bg-gray-400 my-3"></div>
          <p className="text-lg font-semibold leading-5">
            Easy Loan Management
          </p>
          <p className="text-sm leading-4">
            Simplifies the process of applying for and managing loans, making
            financial support accessible without complicated paperwork.
          </p>

          <p className="text-lg font-medium mt-3 leading-5">
            Unique Cow Identification
          </p>
          <p className="text-sm leading-4">
            Each cow is assigned a unique ear tag for accurate tracking,
            ensuring better health monitoring and transparency.
          </p>

          <p className="text-lg font-semibold mt-3 leading-5">
            Instant Medical Assistance
          </p>
          <p className="text-sm leading-4">
            Enables farmers to request immediate help from animal husbandry
            officers, ensuring prompt medical care for their cattle.
          </p>

          <p className="text-lg font-semibold mt-3 leading-5">
            Simplified Insemination Requests
          </p>
          <p className="text-sm leading-4">
            Farmers can request insemination services directly through the app,
            making the breeding process more efficient and reliable.
          </p>

          <p className="text-lg font-semibold mt-3 leading-5">
            Milk Supply Tracking
          </p>
          <p className="text-sm leading-4">
            Helps farmers manage milk production and sales effectively, ensuring
            fair pricing and accurate records.
          </p>

          <p className="text-lg font-semibold  mt-3 leading-5">
            Farmer Marketplace
          </p>
          <p className="text-sm leading-4">
            Provides a platform for farmers to connect with verified vendors for
            buying and selling cattle and related supplies without
            intermediaries.
          </p>

          <p className="text-lg font-semibold mt-3 leading-5">
            SMS Alerts for Non-Smartphone Users
          </p>
          <p className="text-sm leading-4">
            Delivers important updates and notifications through SMS, ensuring
            that even those without smartphones stay informed.
          </p>

          <p className="text-lg font-semibold mt-3  leading-5">
            Farmer Profile Management
          </p>
          <p className="text-sm leading-4">
            Tracks each farmer’s loan status, cattle health, and overall
            progress, allowing for personalized support and better
            decision-making.
          </p>

          <p className="text-sm leading-4 mt-3">
            GAAY is committed to supporting SC/ST communities in Dadra and Nagar
            Haveli and Daman and Diu by promoting financial independence,
            ensuring transparency, and fostering sustainable development through
            technology and care.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-5">
        <div className="relative col-span-2 h-80">
          <Image src="/4.jpg" alt="About" fill={true} />
        </div>
        <div className="relative col-span-3 h-80">
          <Image src="/5.jpg" alt="About" fill={true} />
        </div>
      </div>
      <div className="grid grid-cols-7">
        {/* <div className="relative col-span-1 h-80">
          <h3 className="text-sm font-medium text-center">Types of Loan</h3>
          <ol>
            <li>GAAY(Gir Adash Ajeevika Yojana)</li>
            <li>Transport Sector</li>
            <li>Shops</li>
            <li>Service Sector</li>
            <li>Mushroom Farming</li>
          </ol>
        </div> */}
        <div className="relative col-span-3 h-80">
          <Image src="/7.jpg" alt="About" fill={true} />
        </div>
        <div className="relative col-span-4 h-80">
          <Image src="/6.jpg" alt="About" fill={true} />
        </div>
      </div>
    </section>
  );
}
