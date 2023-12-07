import React from "react";

import Charts from "../Charts/Charts";
import MissionsList from "src/components/MissionsList/MissionsList";

const data = [
  {
    image: "coca-cola.svg",
    missionNames: "330ml Cans",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Active",
    progress: null,
  },
  {
    image: "coca-cola.svg",
    missionNames: "2,5L Plastic Bottles",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Finish",
    progress: 100,
  },
  {
    image: "coca-cola.svg",
    missionNames: "500ml Glass Bottles",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Waiting",
    progress: 0,
  },
  {
    image: "coca-cola.svg",
    missionNames: "150ml cans",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Waiting",
    progress: 0,
  },
  {
    image: "coca-cola.svg",
    missionNames: "1,5L Plastic Bottles",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Active",
    progress: 30,
  },
  {
    image: "coca-cola.svg",
    missionNames: "250ml Cans",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Waiting",
    progress: 0,
  },
  {
    image: "coca-cola.svg",
    missionNames: "1L Plastic Bottles",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Active",
    progress: 80,
  },
];
const Home = () => {
  return (
    <div>
      <Charts />
      <MissionsList members={data} />
    </div>
  );
};

export default Home;
