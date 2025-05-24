"use client";

import Image from "next/image";
import {
  FluentBuildingShop16Regular,
  FluentBuildingSkyscraper24Regular,
  FluentDocumentBulletList16Regular,
  FluentMdl2ViewDashboard,
  FluentShieldAdd48Filled,
  IcBaselineAttractions,
  MaterialSymbolsPersonRounded,
  SolarBellBold,
} from "../icons";
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
      <div
        className={`w-60 h-screen top-0 left-0 fixed z-20 flex md:translate-x-0 bg-white md:bg-transparent ${
          props.isOpen ? "translate-x-0" : "-translate-x-full md:-translate-x-0"
        }`}
      >
        <div className="p-4 w-60">
          <div className="relative w-40 h-40 mx-auto">
            <Image
              fill={true}
              alt="logo"
              src={"/logo.png"}
              className="w-full h-full"
            />
          </div>
          <div className="h-6"></div>

          <MenuTab
            name="Dashboard"
            path={path}
            pathcheck="/dashboard"
            click={() => props.setIsOpen(false)}
            icon={
              <div className="bg-[#f3f6f8] rounded-lg">
                <FluentMdl2ViewDashboard className="text-blue-500 w-6 h-6 p-1" />
              </div>
            }
          />
          <MenuTab
            name="Medical / Health"
            path={path}
            pathcheck="/dashboard/medical"
            click={() => props.setIsOpen(false)}
            icon={
              <div className="bg-[#f3f6f8] rounded-lg">
                <FluentShieldAdd48Filled className="text-blue-500 w-6 h-6 p-1" />
              </div>
            }
          />
          <MenuTab
            name="Market Place"
            path={path}
            pathcheck="/dashboard/marketplace"
            click={() => props.setIsOpen(false)}
            icon={
              <div className="bg-[#f3f6f8] rounded-lg">
                <FluentBuildingShop16Regular className="text-blue-500 w-6 h-6 p-1" />
              </div>
            }
          />
          <MenuTab
            name="Education"
            path={path}
            pathcheck="/dashboard/education"
            click={() => props.setIsOpen(false)}
            icon={
              <div className="bg-[#f3f6f8] rounded-lg">
                <FluentBuildingSkyscraper24Regular className="text-blue-500 w-6 h-6 p-1" />
              </div>
            }
          />
          <MenuTab
            name="Users"
            path={path}
            pathcheck="/dashboard/users"
            click={() => props.setIsOpen(false)}
            icon={
              <div className="bg-[#f3f6f8] rounded-lg">
                <MaterialSymbolsPersonRounded className="text-blue-500 w-6 h-6 p-1" />
              </div>
            }
          />
          <MenuTab
            name="Cow"
            path={path}
            pathcheck="/dashboard/cows"
            click={() => props.setIsOpen(false)}
            icon={
              <div className="bg-[#f3f6f8] rounded-lg">
                <IcBaselineAttractions className="text-blue-500 w-6 h-6 p-1" />
              </div>
            }
          />
          <MenuTab
            name="Reports"
            path={path}
            pathcheck="#"
            click={() => props.setIsOpen(false)}
            icon={
              <div className="bg-[#f3f6f8] rounded-lg">
                <FluentDocumentBulletList16Regular className="text-blue-500 w-6 h-6 p-1" />
              </div>
            }
          />
          <MenuTab
            name="Notifications"
            path={path}
            pathcheck="#"
            click={() => props.setIsOpen(false)}
            icon={
              <div className="bg-[#f3f6f8] rounded-lg">
                <SolarBellBold className="text-blue-500 w-6 h-6 p-1" />
              </div>
            }
          />
        </div>
        <div className="w-[1px] bg-gray-400 my-10"></div>
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
      className={`mx-auto p-1 rounded-lg  flex gap-2 items-center my-2 ${
        props.path == props.pathcheck
          ? "bg-blue-500"
          : "border-2 border-gray-300"
      }`}
    >
      {props.icon}
      <p
        className={`text-lg  ${
          props.path == props.pathcheck
            ? "text-white font-semibold"
            : "text-black font-normal"
        }`}
      >
        {props.name}
      </p>
    </Link>
  );
};
