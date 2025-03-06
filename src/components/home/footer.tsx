// import Link from "next/link";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#424242] text-white">
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-between gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p>Email: dnhddscst@gmail.com</p>
            <p>Phone: 0260-2642043</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link href="/privacy_policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/tandc" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund_policy" className="hover:underline">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/delete_account" className="hover:underline">
                  Delete Account
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <div>
              DNH DD SC/ST CORPORATION <br />
              2ND FLOOR, B-WING, DISTRICT COLLECTORATE, SILVASSA
              <br />
              DNH & DD.
            </div>
            {/* <div className="flex space-x-4">
              <Link href="#" className="hover:text-green-300">
                Facebook
              </Link>
              <Link href="#" className="hover:text-green-300">
                Twitter
              </Link>
              <Link href="#" className="hover:text-green-300">
                Instagram
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center bg-[#222222] py-4">
        <p>
          &copy; {new Date().getFullYear()} Government Gaay App Portal. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
