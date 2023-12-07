import classNames from "classnames";
import { type } from "os";
import React from "react";

import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

const CategoryCard = ({ data }: any) => {
  const { icon, name, value, type, percentage } = data;
  return (
    <div className="border border-bordergray p-4 rounded-lg shadow-sm">
      <img src={icon} className="border border-bordergray p-2 rounded-lg" />
      <div className="text-sm mt-3 text-textDarkBlue font-primary font-semibild">
        {name}
      </div>
      <div className="flex justify-between items-end">
        <div className="text-3xl mt-3 text-textDarkBlue font-primary font-bold">
          {value}
        </div>
        <div className="flex items-center gap-1">
          {type === "up" && <HiTrendingUp className="text-green" />}
          {type === "down" && <HiTrendingDown className="text-red" />}
          <span
            className={classNames(
              "text-sm",
              type === "up" ? "text-green" : "text-red"
            )}
          >
            {percentage}
          </span>
          {type && (
            <span className="text-sm text-textDarkBlue">vs last month</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
