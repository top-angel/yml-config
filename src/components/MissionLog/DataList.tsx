import React, { useState } from "react";
import Table from "../Table/Table";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import AddressCopy from "./AddressCopy";

type props = {
  members: Array<any>;
  type: string;
};

const DataList = ({ members, type }: props) => {
  const rowsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(members.length / rowsPerPage);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, members.length);

  const rows = [];
  for (let i = startIndex; i < endIndex; i++) {
    const e: any = members[i];
    const image = e.image;
    const address = e.address;
    const date = e.date;
    const missionNames = e.missionNames;
    const returnedItems = e.returnedItems;
    const location = e.location;
    const status = e.status;
    const progress = e.progress;
    if (type == "Scanned") {
      rows.push([
        <div
          key={missionNames + "1"}
          className="flex justify-between border-b border-bordergray p-3"
        >
          <div className="flex items-center font-primary text-base font-semibold text-graystrong">
            <Image
              src={`/assets/images/${image}`}
              alt="logo"
              width="28"
              height="28"
              style={{ marginRight: 10 }}
            />
            {missionNames}
          </div>
          <div className="flex items-center">
            <div className="rounded-md border border-bordergray px-1.5 py-0.5 font-primary text-xs font-medium text-graystrong">
              1 Scan
            </div>
            <Image
              src={"/assets/images/dropdown.svg"}
              alt="dropdown"
              width="20"
              height="20"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>,

        <div key={address + "1.5"} className="flex justify-between p-3">
          <AddressCopy address={address} />
          <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
            {date}
          </div>
        </div>,
      ]);
    } else if (type == "Stored") {
      rows.push([
        <div
          key={missionNames + "1"}
          className="flex justify-between border-b border-bordergray p-3"
        >
          <div className="flex items-center font-primary text-base font-semibold text-graystrong">
            <Image
              src={`/assets/images/${image}`}
              alt="logo"
              width="28"
              height="28"
              style={{ marginRight: 10 }}
            />
            {missionNames}
          </div>
          <div className="flex items-center">
            <div className="rounded-md border border-bordergray px-1.5 py-0.5 font-primary text-xs font-medium text-graystrong">
              59 Stored
            </div>
            <Image
              src={"/assets/images/dropdown.svg"}
              alt="dropdown"
              width="20"
              height="20"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>,

        <div key={location + "1.5"} className="flex justify-between p-3">
          <div className="flex items-center font-primary text-sm font-normal text-graystrongest">
            <Image
              src={`/assets/images/mo-garage.svg`}
              alt="logo"
              width="24"
              height="24"
              style={{ marginRight: 10 }}
            />
            <div className="opacity-50">{missionNames}</div>
          </div>
          <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
            {location}
          </div>
        </div>,
      ]);
    } else if (type == "Returned") {
      rows.push([
        <div
          key={missionNames + "1"}
          className="flex justify-between border-b border-bordergray p-3"
        >
          <div className="flex items-center font-primary text-base font-semibold text-graystrong">
            <Image
              src={`/assets/images/${image}`}
              alt="logo"
              width="28"
              height="28"
              style={{ marginRight: 10 }}
            />
            {missionNames}
          </div>
          <div className="flex items-center">
            <div className="rounded-md border border-bordergray px-1.5 py-0.5 font-primary text-xs font-medium text-graystrong">
              1 Scan
            </div>
            <Image
              src={"/assets/images/dropdown.svg"}
              alt="dropdown"
              width="20"
              height="20"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>,

        <div key={date + "1.5"} className="flex justify-between p-3">
          <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
            {date}
          </div>
          <div className="font-primary text-sm font-normal text-graystrongest opacity-50">
            {location}
          </div>
        </div>,
        <div
          key={returnedItems + "2"}
          className="flex justify-center border-t border-bordergray p-3 font-primary text-base font-medium text-green"
        >
          Rewards allocated: ${returnedItems}
        </div>,
      ]);
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Tab.Panel>
      <div className="grid grid-cols-2 gap-5 px-5 pt-5">
        {rows.map((data, i) => {
          return (
            <div
              key={i}
              className="col-span-1 rounded-2xl border border-lightpurple"
            >
              {data}
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-bordergray px-5 py-2">
        <span className="font-primary text-sm font-medium text-graystrong">
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-3 rounded-md border border-bordergraymiddle px-3.5 py-2 font-primary text-sm font-semibold text-graystrong"
          >
            Previous
          </button>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-md border border-bordergraymiddle px-3.5 py-2 font-primary text-sm font-semibold text-graystrong"
          >
            Next
          </button>
        </div>
      </div>
    </Tab.Panel>
  );
};

export default DataList;
