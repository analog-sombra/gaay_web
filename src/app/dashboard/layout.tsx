"use client";

import Sidebar from "@/components/dashbord/sidebar";
import { useState } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="min-h-screen w-full bg-[#f3f6f8] relative">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className={`relative p-0 md:pl-60 min-h-screen flex flex-col`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
