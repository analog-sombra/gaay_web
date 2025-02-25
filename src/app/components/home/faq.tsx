"use client";

// import type { CollapseProps } from "antd";
import { Collapse } from "antd";

export default function FAQ() {
  const faqs = [
    {
      key: "1",
      label: "How can I register for VAT?",
      children: (
        <p>
          To register, simply fill out the Google Form available through the
          link on the website. The VAT department will create your account based
          on the provided details and share the login credentials via your
          registered email and mobile number.
        </p>
      ),
    },
    {
      key: "2",
      label: "How do I log in to the portal?",
      children: (
        <p>
          You can log in using your TIN number or registered mobile number.
          After entering your details, you will receive an OTP for verification.
        </p>
      ),
    },
    {
      key: "3",
      label: "How do I file a VAT return?",
      children: (
        <p>
          The system auto-generates the return when you update your stock and
          sales details on the web portal. This information is converted into
          the required return format.
        </p>
      ),
    },
    {
      key: "4",
      label: "How is the C-Form generated?",
      children: (
        <p>
          The C-Form is automatically generated three months after interstate
          filing has been completed.
        </p>
      ),
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <section id="faq" className="py-20 w-4/6 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <Collapse items={faqs} defaultActiveKey={["1"]} onChange={onChange} />
    </section>
  );
}
