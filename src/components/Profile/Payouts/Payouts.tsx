import React from "react";
import PayoutCard from "./PayoutCard";
import { Tab } from "@headlessui/react";

const payouts = [
  {
    icon: "/assets/images/coca-cola.svg",
    name: "330ml Cans",
    value: "140,000 returns",
    status: "active",
  },
  {
    icon: "/assets/images/heinken.svg",
    name: "1.5L Plastic Bottles Cans",
    value: "140,000 returns",
    status: "finished",
  },
  {
    icon: "/assets/images/heinken.svg",
    name: "2.5L Plastic Bottles",
    value: "140,000 returns",
    status: "wait",
  },
  {
    icon: "/assets/images/coca-cola.svg",
    name: "330ml Cans",
    value: "140,000 returns",
    status: "active",
  },
  {
    icon: "/assets/images/heinken.svg",
    name: "1.5L Plastic Bottles Cans",
    value: "140,000 returns",
    status: "finished",
  },
  {
    icon: "/assets/images/heinken.svg",
    name: "2.5L Plastic Bottles",
    value: "140,000 returns",
    status: "wait",
  },
  {
    icon: "/assets/images/coca-cola.svg",
    name: "330ml Cans",
    value: "140,000 returns",
    status: "active",
  },
  {
    icon: "/assets/images/heinken.svg",
    name: "1.5L Plastic Bottles Cans",
    value: "140,000 returns",
    status: "finished",
  },
  {
    icon: "/assets/images/heinken.svg",
    name: "2.5L Plastic Bottles",
    value: "140,000 returns",
    status: "wait",
  },
];

const Payouts = () => {
  return (
    <Tab.Panel className="px-6">
      {" "}
      <div className="text-xl py-4 font-primary font-semibold">Payouts</div>
      <div className="grid grid-cols-3 gap-5">
        {payouts.map((item, index) => {
          return <PayoutCard data={item} key={index} />;
        })}
      </div>
    </Tab.Panel>
  );
};

export default Payouts;
