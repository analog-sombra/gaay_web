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
          Refund and Cancellation Policy
        </h4>
      </div>

      <div className="bg-white p-8 shadow rounded-md w-full mt-3">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Cancellation by Dealers
          </h2>
          <p className="text-lg">
            Dealers may request to delist their product for products listed on
            DNH DD SC ST GAAY under certain conditions. Cancellation requests
            must be submitted in writing to DNH DD SC ST Corporation for review
            and approval.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Refund Eligibility</h2>
          <p className="text-lg">
            Refunds for cancelled products are subject to the terms outlined in
            the agreement and applicable laws and regulations. DNH DD SC ST
            Corporation reserves the right to assess each cancellation request
            on a case-by-case basis to determine refund eligibility.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cancellation Fees</h2>
          <p className="text-lg">
            Depending on the terms of the agreement, farmers may be subject to
            cancellation fees in the event of a cancelled agreement.
            Cancellation fees, if applicable, will be deducted from any refund
            issued to the farmers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Cancellation by DNH DD SC ST Corporation
          </h2>
          <p className="text-lg">
            In the event that a DNH DD SC ST Corporation-owned property becomes
            unavailable for sale due to unforeseen circumstances or other
            reasons, DNH DD SC ST Corporation reserves the right to cancel the
            agreement. In such cases, farmers will be notified promptly, and any
            payments already made will be refunded in full.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Processing Time</h2>
          <p className="text-lg">
            Refunds for cancelled orders will be processed within a reasonable
            timeframe, subject to administrative procedures and banking
            processing times. DNH DD SC ST Corporation will make every effort to
            expedite the refund process and keep farmers informed of the status
            of their refund.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Non-Refundable Fees
          </h2>
          <p className="text-lg">
            Certain fees, such as administrative fees or processing fees, may be
            non-refundable in the event of a cancelled order. These fees will be
            clearly outlined in the cancelled order or communicated to the
            farmer at the time of cancellation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Refund Method</h2>
          <p className="text-lg">
            Refunds for cancelled agreements will be issued using the same
            payment method originally used by the farmer for rental payments,
            unless otherwise agreed upon by both parties.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-lg">
            For inquiries regarding refunds and cancellations, farmers can
            contact DNH DD SC ST Corporation at the provided contact
            information. Our team is dedicated to assisting tenants and
            resolving any issues related to refunds and cancellations in a
            timely manner.Contact via E-mail:dnhddscst@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermAndConditionPage;
