import React, { useState } from "react";
import Image from "next/image";

import CustomTab from "../CustomTab/CustomTab";
import DataList from "./DataList";

interface MissionLogType {
  data: Array<any>;
}

const MissionLog = ({ data }: MissionLogType) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = data.filter(
      (data) =>
        data.missionNames.toLowerCase().includes(query.toLowerCase()) ||
        data.location.toLowerCase().includes(query.toLowerCase()) ||
        data.returnedItems.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (
    <div className="px-7 pt-5">
      <div className="mb-5 flex justify-between">
        <div>
          <div className="font-primary text-3xl font-semibold text-graystrongest">
            330ml Cans
          </div>
          <div className="font-primary text-base font-normal text-graystrongest opacity-50">
            Worldwide
          </div>
        </div>
        <div className="flex">
          <span className="mr-3 flex h-9 w-fit items-center rounded-2xl border border-lightpurple bg-lightpurple px-3 py-1.5">
            <span className="pr-2 font-primary text-sm font-medium text-purple">
              +12345
            </span>
            <Image
              src={`/assets/images/badge_user.svg`}
              alt="badge"
              width="24"
              height="24"
            />
          </span>
          <span className="flex h-9 w-fit items-center rounded-2xl border border-opacitygreen bg-opacitygreen px-3 py-1.5">
            <span className="pr-2 font-primary text-sm font-medium text-green">
              +5243
            </span>
            <Image
              src={`/assets/images/badge_house.svg`}
              alt="badge"
              width="24"
              height="24"
            />
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-bordergray">
        <div className="flex justify-between border-b border-bordergray p-5">
          <div>
            <div className="font-primary text-lg font-semibold text-graystrongest">
              Log
            </div>
            <div className="font-primary text-base font-normal text-graystrongest opacity-50">
              Keep track of every single item
            </div>
          </div>
          <div className="flex h-6 items-center">
            <span className="mr-2 h-6 rounded-2xl border border-green bg-opacitygreen px-2 py-0.5 font-primary text-xs font-medium text-green">
              12345 Items
            </span>
            <Image
              src={"/assets/images/dropdown.svg"}
              alt="dropdown"
              width="20"
              height="20"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="relative pt-1">
          <div className="absolute right-3 top-2">
            <div className="relative font-primary text-sm font-medium text-graystrongest">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="h-11 w-80 rounded-md border border-bordergraymiddle py-2.5 pl-9 pr-3.5"
              />
              <Image
                src={`/assets/images/search.svg`}
                alt="logo"
                width="20"
                height="20"
                className="absolute left-3 top-3"
              />
            </div>
          </div>
          <CustomTab
            headers={["Scanned (123942)", "Stored (13421)", "Returned (7182)"]}
          >
            <DataList members={filteredData} type="Scanned" />
            <DataList members={filteredData} type="Stored" />
            <DataList members={filteredData} type="Returned" />
          </CustomTab>
        </div>
      </div>
    </div>
  );
};

export default MissionLog;
