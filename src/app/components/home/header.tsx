import Image from "next/image";
// import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#229799] text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* <Link href="/" className="text-2xl font-bold">
          GovCow Portal
        </Link> */}
        <div className="w-20 h-20 relative bg-white rounded-full">
          <Image src="/logo.png" alt="logo" fill={true} />
        </div>
        <div className="grow"></div>

        <div className="text-center text-lg">
          Dadra & Nagar Haveli, Daman and Diu Scheduled Caste / Scheduled <br />
          Tribes, Other Backward Classes and Minorities Financial and <br />
          Development Corporation Ltd.
        </div>
        <div className="grow"></div>
        {/* <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="#about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav> */}
      </div>
    </header>
  );
}
