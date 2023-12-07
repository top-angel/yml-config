import React from "react";
import CategoryCard from "./CategoryCard";
import MissionCard from "./MissionCard";
import { Tab } from "@headlessui/react";

const categories = [
  {
    icon: "/assets/images/user.svg",
    name: "Collectors",
    value: "12,420",
    type: "up",
    percentage: "20%",
  },
  {
    icon: "/assets/images/house.svg",
    name: "Storers",
    value: "1,210",
    type: "down",
    percentage: "15%",
  },
  {
    icon: "/assets/images/money-recive.svg",
    name: "Total Payouts",
    value: "$342,420",
  },
];

const missions = [
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

const MyDetails = () => {
  return (
    <Tab.Panel className="px-6">
      <div className="grid grid-cols-3 gap-5">
        {categories.map((item, index) => {
          return <CategoryCard data={item} key={index} />;
        })}
      </div>
      <div className="text-xl py-4 font-primary font-semibold">Missions</div>
      <div className="grid grid-cols-3 gap-5">
        {missions.map((item, index) => {
          return <MissionCard data={item} key={index} />;
        })}
      </div>
    </Tab.Panel>
  );
};

export default MyDetails;
