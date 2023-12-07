import classNames from "classnames";
import Link from "next/link";
import React from "react";

import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import Badge from "src/components/Badge/Badge";

const PayoutCard = ({ data }: any) => {
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
      <div className="px-4 py-3 text-sm  font-semibold border-b border-bordergray">
        <div className="flex justify-between">
          <div className="flex">
            <div>$481.03</div>
            <div className="text-darkgray">/10,000 Distributed to</div>
          </div>
          <div className="text-primary">1425 Storers</div>
        </div>
      </div>
      <div className="px-4 py-3 text-sm  font-semibold">
        <div className="flex justify-between">
          <div className="flex">
            <div>$3,372.8</div>
            <div className="text-darkgray">/15,000 Distributed to</div>
          </div>
          <div className="text-darkgray">1425 Collectors</div>
        </div>
      </div>
    </div>
  );
};

export default PayoutCard;
