import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="p-4 md:p-0 md:w-4/6 mx-auto mt-6">
      <div className="container mx-auto">
        <div className="bg-[#f8f8ff] p-3 rounded-md">
          <h2 className="text-3xl font-medium text-center">Key Features of GAAY App</h2>
          <div className="h-[1px] w-full bg-gray-400 my-3"></div>
          <p className="text-lg font-semibold leading-5">
            Easy Loan Management
          </p>
          <p className="text-sm leading-4">
            Simplifies the process of applying and managing loans, making
            financial support accessible without complicated paperwork.
          </p>

          <p className="text-lg font-medium mt-3 leading-5">
            Unique Cow Identification
          </p>
          <p className="text-sm leading-4">
            Each cow is assigned a unique ear tag number for accurate tracking,
            ensuring better health monitoring and transparency.
          </p>

          <p className="text-lg font-semibold mt-3 leading-5">
            Instant Medical Assistance
          </p>
          <p className="text-sm leading-4">
            Enables farmers to request immediate medical help from animal husbandry
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
            Helps farmers to manage milk production and sales effectively, ensure
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
            Tracks loan status, cattle health, and overall
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

      <div className="grid  grid-col-1 md:grid-cols-12">
        <div className="relative w-full md:col-span-6 h-80">
          <Image src="/5.jpg" alt="About" fill={true} />
        </div>
        <div className="relative w-full md:col-span-6 h-80">
          <Image src="/13.jpg" alt="About" fill={true} />
        </div>
        <div className="relative w-full md:col-span-4 h-80">
          <Image src="/20.jpg" alt="About" fill={true} />
        </div>
        <div className="relative w-full md:col-span-4 h-80">
          <Image src="/11.jpg" alt="About" fill={true} />
        </div>

        <div className="relative w-full md:col-span-4 h-80">
          <Image src="/12.jpg" alt="About" fill={true} />
        </div>
      </div>
    </section>
  );
}
