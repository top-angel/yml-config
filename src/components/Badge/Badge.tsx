import React from "react";

import classNames from "classnames";

type props = {
  status: string;
};

const Badge = ({ status }: props) => {
  return (
    <div
      className={classNames(
        "font-primary text-sm flex items-center gap-1 border rounded-2xl px-2 font-semibold bg-opacity-10",
        status === "active"
          ? "text-primary bg-primary"
          : status === "finished"
          ? "text-red bg-red"
          : status === "wait"
          ? "text-darkgray bg-darkgray"
          : ""
      )}
    >
      <span className="">&#8226;</span>
      <span>
        {status === "active"
          ? "Active"
          : status === "finished"
          ? "Finished"
          : status === "wait"
          ? "Waiting for verification"
          : ""}
      </span>
    </div>
  );
};

export default Badge;
