import React, { useEffect, useState } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";

import { API_URI } from "src/api/auth";

import { useAuthContext } from "src/context/AuthProvider";

type props = {
  data: any;
  onSelect: (item: any) => void;
  selected: any;
};

const Batch = ({ data, onSelect, selected }: props) => {
  return (
    <div
      className={`p-4 border rounded-lg shadow-sm  border-bordergray`}
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
      <div className="flex items-center gap-4 mt-4">
        <div className="inline-flex items-center px-2 py-1 rounded-lg bg-gray">
          <MdOutlineQrCodeScanner className="w-5 h-5 text-blue-400" />
          <div className="text-sm text-blue-400">100</div>
        </div>
        <button  onClick={() => onSelect(data)} className="w-full py-1 text-sm font-semibold text-center text-blue-400 border border-blue-300 rounded-lg font-primary cursor-pointer">
          View Batches
        </button>
      </div>
    </div>
  );
};

export default Batch;
