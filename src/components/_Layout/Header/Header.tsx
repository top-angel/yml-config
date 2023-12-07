import Image from "next/image";
import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import { useAppSelector } from "../../../redux/hooks";

import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import classNames from "classnames";
import CreateMissionModal from "src/components/CreateMissionModal/CreateMissionModal";

type props = {
  logout: () => void;
};

const Header = ({ logout }: props) => {
  const router = useRouter();

  const { address } = useAppSelector((s) => ({
    address: s.user?.user?.email?.address,
  }));

  return (
    <div className="fixed flex items-center justify-between w-full mx-auto bg-white border-b p-7 border-bordergray z-1">
      <div className="flex items-center gap-8">
        <Link
          href="/profile"
          className="flex items-center justify-center gap-3 font-primary hover:border-0"
        >
          <div className="h-9 w-9">
            <Image
              src={"/assets/images/coca-cola.svg"}
              alt="logo"
              width={36}
              height={36}
              unoptimized
            />
          </div>
          <div className="text-base font-medium text-textDarkBlue">
            {address}
          </div>
        </Link>
      </div>
      <div className="flex gap-6">
        <Link
          href="/"
          className={classNames(
            "font-primary text-textDarkBlue hover:bg-primary hover:bg-opacity-5 hover:border-0 px-2.5 py-1.5 rounded-lg text-sm font-medium",
            router.pathname === "/" && "bg-primary bg-opacity-10"
          )}
        >
          Home
        </Link>
        <Link
          href="/missions"
          className={classNames(
            "font-primary text-textDarkBlue hover:bg-primary hover:bg-opacity-5 hover:border-0 px-2.5 py-1.5 rounded-lg text-sm font-medium",
            router.pathname === "/missions" && "bg-primary bg-opacity-10"
          )}
        >
          Missions
        </Link>
        <Link
          href="/messages"
          className={classNames(
            "font-primary text-textDarkBlue hover:bg-primary hover:bg-opacity-5 hover:border-0 px-2.5 py-1.5 rounded-lg text-sm font-medium",
            router.pathname === "/messages" && "bg-primary bg-opacity-10"
          )}
        >
          Messages
        </Link>
        <Link
          href="/products"
          className={classNames(
            "font-primary text-textDarkBlue hover:bg-primary hover:bg-opacity-5 hover:border-0 px-2.5 py-1.5 rounded-lg text-sm font-medium",
            router.pathname === "/products" && "bg-primary bg-opacity-10"
          )}
        >
          Products
        </Link>

        {/* <Link
          href="/components"
          className={classNames(
            "font-primary text-textDarkBlue hover:bg-primary hover:bg-opacity-5 hover:border-0 px-2.5 py-1.5 rounded-lg text-sm font-medium",
            router.pathname === "/components" && "bg-primary bg-opacity-10"
          )}
        >
          Components
        </Link> */}
      </div>
      <div className="flex items-center gap-5 text-darkgray">
        <CreateMissionModal />
        <IoNotificationsOutline
          className="text-xl cursor-pointer"
          onClick={logout}
        />
      </div>
    </div>
  );
};

export default Header;
