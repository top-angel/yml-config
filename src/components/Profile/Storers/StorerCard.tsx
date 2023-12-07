import React from "react";
import { Rating } from "react-simple-star-rating";

import {
  HiOutlineLocationMarker,
  HiOutlineHome,
  HiOutlineChatAlt,
} from "react-icons/hi";

const StorerCard = ({ data }: any) => {
  return (
    <div className="border border-bordergray p-3 mt-3 rounded-md flex justify-between">
      <div className="flex gap-3">
        <img src={data.image} className="w-44 rounded-md" />
        <div className="flex flex-col justify-between">
          <div className="font-primary text-lg font-semibold">{data.name}</div>
          <div className="flex gap-3 mt-7">
            <div className="font-primary text-sm text-textDarkBlue flex items-center gap-1">
              <HiOutlineLocationMarker className="text-darkgray" />
              {data.location}
            </div>
            <div className="font-primary text-sm text-textDarkBlue flex items-center gap-1">
              <HiOutlineHome className="text-darkgray" />
              {data.size}
            </div>
          </div>
          <div className="flex items-end gap-2 text-sm font-semibold">
            <Rating initialValue={data.score} readonly size={20} /> {data.score}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <div className="bg-primary bg-opacity-10 px-2 rounded-lg border border-primary">
          <HiOutlineChatAlt className="text-primary mb-1" />
        </div>
        <div className="text-sm font-primary text-textDarkBlue mt-7">
          <span className="font-bold mr-1">{data.storedItems}</span>
          <span>Stored Items</span>
        </div>
        <div className="text-sm font-primary text-textDarkBlue">
          <span>Storing</span>
          <span className="font-bold mx-1">{data.items}</span>
          <span>Coca cola items</span>
        </div>
      </div>
    </div>
  );
};

export default StorerCard;
