import { ReactNode } from "react";

import { useState } from "react";
import { Tab } from "@headlessui/react";

import classNames from "classnames";
import MyDetails from "./MyDetails/MyDetails";
import Payouts from "./Payouts/Payouts";
import Team from "./Team/Team";
import Reports from "./Reports/Reports";
import Storers from "./Storers/Storers";

const headers = [
  "My Details",
  "Payouts",
  "Team",
  "Reports",
  "Storers",
];

type props = {
  onTabClick?: (index: number) => void;
};

const Profile = ({ onTabClick }: props) => {
  return (
    <div className="w-full">
      <div className="h-44 bg-[url('/assets/images/colabg.svg')] bg-cover bg-no-repeat"></div>

      <div className="px-6 py-5 font-primary text-2xl font-semibold">
        Coca Cola
      </div>
      <div className="">
        <Tab.Group defaultIndex={0}>
          <Tab.List className="mx-6  flex w-fit justify-between space-x-1 ">
            {headers.map((header: string, index: number) => (
              <Tab
                key={index}
                className={({ selected }) =>
                  classNames(
                    "px-4 py-2.5 font-primary text-sm font-semibold leading-5 text-graystrong focus-visible:outline-none",
                    selected &&
                      "rounded-md bg-primary bg-opacity-10 font-semibold text-primary focus-visible:outline-none",
                  )
                }
                onClick={() => onTabClick && onTabClick(index)}
              >
                {header}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <MyDetails />
            <Payouts />
            <Team />
            <Reports />
            <Storers />
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Profile;
