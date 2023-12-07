import React, { useEffect, useState } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";

import { API_URI } from "src/api/auth";

import { useAuthContext } from "src/context/AuthProvider";

import ViewBatchModal from "./ViewBatchModal";

type props = {
  data: any;
  onSelect: (item: any) => void;
  selected: any;
};

const Batch = ({ data, onSelect, selected }: props) => {
  return (
    <div
      className={`p-4 border rounded-lg shadow-sm  border-bordergray cursor-pointer data. ${
        data._id === selected?._id && `border-primary bg-primary bg-opacity-10`
      }`}
      onClick={() => onSelect(data)}
    >
      <div className="flex items-center gap-4">
        <img
          src={`${API_URI}/api/v1/product/${data._id}/example_image`}
          className="w-12 p-2 border rounded-lg border-bordergray"
        />
        <div className="text-sm text-textDarkBlue">
          {data?.material_size}L {data?.material_type} {data.name}
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-4">
        {/* <div className="inline-flex items-center px-2 py-1 rounded-lg bg-gray">
          <MdOutlineQrCodeScanner className="w-5 h-5 text-blue-400" />
          <div className="text-sm text-blue-400">100</div>
        </div> */}
        <ViewBatchModal data={data} />
      </div>
    </div>
  );
};

export default Batch;
