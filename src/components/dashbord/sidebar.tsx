"use client";

import Image from "next/image";
import { ClarityBlocksGroupLine, FluentMdl2ViewDashboard } from "../icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  role: string;
}

const Sidebar = (props: SidebarProps) => {
  const path = usePathname();

  return (
    <>
      <div className="border-2 w-60 h-screen fiex top-0 left-0 fixed gap-1 z-20 p-4">
        <div className="relative w-40 h-40 mx-auto">
          <Image
            fill={true}
            alt="logo"
            src={"/logo.png"}
            className="w-full h-full"
          />
        </div>
        <div className="h-6"></div>
        <div className="mx-auto p-1 rounded-lg border-2 border-gray-500 flex gap-2 items-center">
          <ClarityBlocksGroupLine className="text-xl grid place-items-center" />
          <p className="text-lg font-semibold">Dashboard</p>
        </div>

        <MenuTab
          name="Dashboard"
          path={path}
          pathcheck="/dashboard"
          click={() => props.setIsOpen(false)}
          icon={<FluentMdl2ViewDashboard className="text-gray-300 w-6" />}
        />
      </div>
    </>
  );
};
export default Sidebar;

interface MenuTabProps {
  click: () => void;
  name: string;
  path: string;
  pathcheck: string;
  icon: React.ReactNode;
}

const MenuTab = (props: MenuTabProps) => {
  return (
    <Link
      onClick={props.click}
      href={props.pathcheck}
      className={`flex gap-1 px-1 items-center py-2 ${
        props.path == props.pathcheck
          ? "border-l-2 border-blue-500 bg-white bg-opacity-10"
          : ""
      }`}
    >
      {props.icon}
      <p
        className={` text-sm ${
          props.path == props.pathcheck
            ? "font-medium text-white"
            : " font-normal text-gray-400"
        }`}
      >
        {props.name}
      </p>
    </Link>
  );
};
