import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import Button from "../../Button/Button";
import { BsSearch } from "react-icons/bs";
import StorerCard from "./StorerCard";
import ReactPaginate from "react-paginate";

const storersList = [
  {
    image: "/assets/images/1.jpg",
    name: "Bonza Coffee",
    location: "Collingwood VIC",
    size: "500 m3",
    score: 4.9,
    storedItems: "53234",
    items: "45",
  },
  {
    image: "/assets/images/1.jpg",
    name: "Bonza Coffee",
    location: "Collingwood VIC",
    size: "500 m3",
    score: 4.9,
    storedItems: "53234",
    items: "45",
  },
  {
    image: "/assets/images/1.jpg",
    name: "Bonza Coffee",
    location: "Collingwood VIC",
    size: "500 m3",
    score: 4.9,
    storedItems: "53234",
    items: "45",
  },
  {
    image: "/assets/images/1.jpg",
    name: "Bonza Coffee",
    location: "Collingwood VIC",
    size: "500 m3",
    score: 4.9,
    storedItems: "53234",
    items: "45",
  },
];

const Storers = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState(3);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = storersList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = ({ selected }: any) => {
    setCurrentPage(selected + 1);
  };

  return (
    <Tab.Panel className="px-6">
      <div className="flex items-center gap-3 relative">
        <BsSearch className="absolute top-3 left-3 w-4 h-4 text-darkgray" />
        <input
          type="text"
          className="w-full border border-bordergray rounded-md text-textDarkBlue px-10 text-base py-2 focus:outline-none"
        />
        <Button
          type="button"
          className="bg-primary text-white text-sm rounded-md px-4"
        >
          Search
        </Button>
      </div>
      {currentPosts.map((item, index) => {
        return <StorerCard data={item} key={index} />;
      })}
      <ReactPaginate
        onPageChange={paginate}
        pageCount={Math.ceil(storersList.length / postsPerPage)}
        previousLabel={"Previous"}
        nextLabel={"Next"}
        previousClassName="w-1/2 ml-3"
        nextClassName="w-1/2 text-right mr-3"
        containerClassName={
          "flex items-center justify-center py-2.5 border-t border-bordergray mt-3"
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
    </Tab.Panel>
  );
};

export default Storers;
