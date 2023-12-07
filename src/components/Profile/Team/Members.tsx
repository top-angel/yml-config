import React, { useState } from "react";
import { useRouter } from "next/router";
import Table from "../../Table/Table";
import Checkbox from "src/components/MissionsList/Checkbox";
import ProgressBar from "src/components/ProgressBar/ProgressBar";
import { useAppSelector } from "../../../redux/hooks";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiMonitorFill } from "react-icons/pi";
import { AiOutlineEye } from "react-icons/ai";
import ReactPaginate from "react-paginate";

const Members = () => {
  const router = useRouter();
  const { members } = useAppSelector((s) => ({
    members: s.user.members,
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<any>(members);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = members.filter(
      (member: any) => member?.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMembers(filtered);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredMembers.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }: any) => {
    setCurrentPage(selected + 1);
  };

  const rows = [];
  for (let i = 0; i < currentPosts.length; i++) {
    const e: any = currentPosts[i];
    const gender = e.gender;
    const missionNames = e.email;

    rows.push([
      <div className="text-sm inline-block">
        {gender === "male" ? (
          <div className="bg-slate-200 text-slate-600 border border-slate-400 rounded-xl px-2 flex items-center gap-1">
            <PiMonitorFill /> Admin
          </div>
        ) : (
          <div className="bg-primary bg-opacity-10 border border-primary rounded-xl text-primary px-2 flex items-center gap-1">
            <AiOutlineEye />
            Viewer
          </div>
        )}
      </div>,
      <div
        key={missionNames}
        className="flex items-center font-primary text-sm font-medium text-graystrongest"
      >
        {missionNames}
      </div>,
      <div className="flex items-center justify-end text-red">
        <RiDeleteBin6Line className="w-5" />
      </div>,
    ]);
  }

  let content;

  if (rows.length) {
    content = (
      <>
        <Table
          header={["Role", "Email address", ""]}
          rows={rows}
          onClick={(r) => onClickRow(r)}
        />
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
  return <div>{content}</div>;
};

export default Members;
