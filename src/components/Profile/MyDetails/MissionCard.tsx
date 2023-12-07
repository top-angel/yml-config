import classNames from "classnames";
import Link from "next/link";
import React from "react";

import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import Badge from "src/components/Badge/Badge";

const MissionCard = ({ data }: any) => {
  const { icon, name, value, status, percentage } = data;
  return (
    <div className="border border-bordergray  rounded-lg shadow-sm">
      <div className="flex items-start justify-between pb-12 p-4 border-b border-bordergray">
        <div className="flex items-start gap-4">
          <img src={icon} className="w-10 h-10" />
          <div className="">
            <div className="font-primary text-base font-semibold">{name}</div>
            <div className="font-primary text-sm text-darkgray">{value}</div>
          </div>
        </div>
        <div>
          <Badge status={status} />
        </div>
      </div>
      <div className="text-right px-4 py-3 text-sm text-primary font-semibold cursor-pointer">
        View project
      </div>
    </div>
  );
};

export default MissionCard;
