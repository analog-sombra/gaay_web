import Link from "next/link";

export default function Banner() {
  return (
    <section className="bg-[#229799] text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to revolutionize your cattle management?
        </h2>
        <p className="mb-8">
          Join thousands of farmers already benefiting from the GAAY App
        </p>
        <Link
          download={true}
          href="/gaay-apk-1.0.0.apk"
          className="bg-white text-[#229799] px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition duration-300"
        >
          Download the App Now
        </Link>
      </div>
    </section>
  );
}
