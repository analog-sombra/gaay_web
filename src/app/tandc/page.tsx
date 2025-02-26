"use client";
import { Fa6SolidArrowLeftLong } from "@/components/icons";
import { useRouter } from "next/navigation";

const TermAndConditionPage = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 min-h-screen px-6 py-4">
      <div className="bg-white shadow rounded-md w-full flex gap-6 px-6 py-2 items-center">
        <Fa6SolidArrowLeftLong
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <h4 className="text-xl font-semibold text-center grow">
          Terms and Conditions
        </h4>
      </div>

      <div className="bg-white p-8 shadow rounded-md w-full mt-3">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Scope of Service</h2>
          <p className="text-lg">
            DNH DD SC ST GAAY, operated by the DNH DD SC ST Corporation
            (DNHDDSCST) of Dadra and Nagar Haveli, provides a platform
            exclusively for accessing GAAY Application within the territory. By
            using our services, you agree to abide by the terms outlined herein.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
          <p className="text-lg">
            Users must be at least 18 years old and legally capable of entering
            into binding contracts to access and use our services. Government
            agencies and authorized personnel are eligible to list Gir Cows
            through our platform.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cow Listings</h2>
          <p className="text-lg">
            DNH DD SC ST facilitates the listing and promotion of Gir Cows for
            trade purposes. All cow listings are subject to approval by DNH DD
            SC ST and must adhere to relevant regulations and guidelines.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Sale Transactions</h2>
          <p className="text-lg">
            Sale of Gir Cows facilitated through DNH DD SC ST GAAY App are
            governed by applicable laws and regulations. Users are responsible
            for reviewing and understanding the terms of agreements before
            entering into transactions.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. User Responsibilities
          </h2>
          <p className="text-lg">
            Users are solely responsible for the accuracy and legality of the
            information provided during registration and property listings. DNH
            DD SC ST reserves the right to verify user information and take
            appropriate action in case of inaccuracies or violations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Privacy Policy</h2>
          <p className="text-lg">
            By using our services, you consent to the collection, processing,
            and storage of personal data as outlined in our Privacy Policy. We
            are committed to protecting user privacy and complying with data
            protection laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            7. Intellectual Property
          </h2>
          <p className="text-lg">
            All content, including but not limited to logos, trademarks, and
            textual content, displayed on DNH DD SC ST is the property of DNH DD
            SC ST Corporationor its licensors and is protected by intellectual
            property laws. Unauthorized use or reproduction of content is
            strictly prohibited.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Limitation of Liability
          </h2>
          <p className="text-lg">
            DNH DD SC ST GAAY App strives to provide accurate and reliable
            information but does not guarantee the completeness, accuracy, or
            reliability of content on the platform. Users agree to use our
            services at their own risk and acknowledge that DNH DD SC ST shall
            not be liable for any direct, indirect, or consequential damages
            arising from the use of our platform.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
          <p className="text-lg">
            These Terms and Conditions are governed by the laws of the Union
            Territory of Dadra and Nagar Haveli and Silvassa. Any disputes
            arising from the use of DNH DD SC ST GAAY App shall be subject to
            the exclusive jurisdiction of the courts in Dadra and Nagar Haveli.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            10. Updates and Modifications
          </h2>
          <p className="text-lg">
            DNH DD SC ST reserves the right to update or modify these Terms and
            Conditions at any time without prior notice. Users are responsible
            for regularly reviewing the Terms and Conditions to stay informed of
            any changes.
          </p>
          <p className="text-lg my-4">
            By accessing and using DNH DD SC ST GAAY App, you agree to comply
            with these Terms and Conditions. If you do not agree with any part
            of these terms, please refrain from using our services.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermAndConditionPage;
