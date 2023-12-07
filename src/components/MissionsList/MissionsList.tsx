import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/router";
import Table from "../Table/Table";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import Checkbox from "./Checkbox";

import ReactPaginate from "react-paginate";

type props = {
  members: Array<any>;
};

const MissionsList = ({ members }: props) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState(members);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredMembers.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }: any) => {
    setCurrentPage(selected + 1);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = members.filter(
      (member) =>
        member.missionNames.toLowerCase().includes(query.toLowerCase()) ||
        member.location.toLowerCase().includes(query.toLowerCase()) ||
        member.returnedItems.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const rows = [];
  for (let i = 0; i < currentPosts.length; i++) {
    const e: any = currentPosts[i];
    const image = e.image;
    const missionNames = e.missionNames;
    const returnedItems = e.returnedItems;
    const location = e.location;
    const status = e.status;
    const progress = e.progress;

    rows.push([
      <div
        key={missionNames}
        className="flex items-center font-primary text-sm font-medium text-graystrongest"
      >
        <Image
          src={`/assets/images/${image}`}
          alt="logo"
          width="40"
          height="40"
          style={{ marginRight: 10 }}
        />
        {missionNames}
      </div>,

      <div
        key={returnedItems}
        className="font-primary text-sm font-normal text-graymiddle"
      >
        {returnedItems}
      </div>,

      <div
        key={location}
        className="font-primary text-sm font-normal text-graymiddle"
      >
        {location}
      </div>,

      <div
        key={status}
        className="font-primary text-xs font-normal text-darkgray"
      >
        {status == "Active" && (
          <Image
            src={`/assets/images/missionlist_active.svg`}
            alt="active"
            width="61"
            height="22"
          />
        )}
        {status == "Finish" && (
          <Image
            src={`/assets/images/missionlist_finish.svg`}
            alt="finish"
            width="72"
            height="22"
          />
        )}
        {status == "Waiting" && (
          <Image
            src={`/assets/images/missionlist_waiting.svg`}
            alt="finish"
            width="152"
            height="22"
          />
        )}
      </div>,

      <div
        key={progress}
        className="flex justify-between font-primary text-xs font-normal text-darkgray"
      >
        <ProgressBar percent={progress} />
        <Checkbox />
      </div>,
    ]);
  }

  let content;

  if (rows.length) {
    content = (
      <>
        <Table
          header={[
            "Mission Names",
            "Returned Items",
            "Location",
            "Status",
            "Progress",
          ]}
          rows={rows}
          onClick={(r) => onClickRow(r)}
        />
      </>
    );
  } else {
    content = (
      <div className="border-t border-bordergray p-5 font-primary text-sm font-medium text-graystrongest">
        No List.
      </div>
    );
  }

  const onClickRow = (props: any) => {
    router.push("/mission/1");
  };

  return (
    <div className="px-7 pt-5">
      <div className="rounded-xl border border-bordergray">
        <div className="flex items-center justify-between p-5">
          <div className="font-primary text-lg font-semibold text-graystrongest">
            All Missions
          </div>
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
        {content}
        <ReactPaginate
          onPageChange={paginate}
          pageCount={Math.ceil(filteredMembers.length / postsPerPage)}
          previousLabel={"Previous"}
          nextLabel={"Next"}
          previousClassName="w-1/2 ml-3"
          nextClassName="w-1/2 text-right mr-3"
          containerClassName={
            "flex items-center justify-center py-2.5 border-t border-bordergray"
          }
          pageClassName={"w-12"}
          pageLinkClassName="font-primary text-textDarkBlue text-sm px-2 py-1 rounded-md hover:border-none hover:bg-bordergray hover:bg-opacity-10"
          previousLinkClassName={
            "border border-bordergray text-sm px-3 py-1 rounded-md text-textDarkBlue hover:border-bordergray"
          }
          nextLinkClassName={
            "border border-bordergray text-sm px-3 py-1 rounded-md text-textDarkBlue hover:border-bordergray"
          }
          activeLinkClassName={"bg-bordergray"}
        />
      </div>
    </div>
  );
};

export default MissionsList;
