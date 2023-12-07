import React from "react";

import MissionLog from "src/components/MissionLog/MissionLog";

const dummydata = [
  {
    image: "coca-cola.svg",
    address: "0xf7NdoiNln58SSjEsggsin",
    date: "Jan 4, 2022",
    missionNames: "330ml Cans",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Active",
    progress: null,
  },
  {
    image: "coca-cola.svg",
    address: "0xf7NdoiNln58SSjEsggsin",
    date: "Jan 4, 2022",
    missionNames: "2,5L Plastic Bottles",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Finish",
    progress: 100,
  },
  {
    image: "coca-cola.svg",
    missionNames: "500ml Glass Bottles",
    address: "0xf7NdoiNln58SSjEsggsin",
    date: "Jan 4, 2022",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Waiting",
    progress: 0,
  },
  {
    image: "coca-cola.svg",
    address: "0xf7NdoiNln58SSjEsggsin",
    date: "Jan 4, 2022",
    missionNames: "150ml cans",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Waiting",
    progress: 0,
  },
  {
    image: "coca-cola.svg",
    address: "0xf7NdoiNln58SSjEsggsin",
    date: "Jan 4, 2022",
    missionNames: "1,5L Plastic Bottles",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Active",
    progress: 30,
  },
  {
    image: "coca-cola.svg",
    address: "0xf7NdoiNln58SSjEsggsin",
    date: "Jan 4, 2022",
    missionNames: "250ml Cans",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Waiting",
    progress: 0,
  },
  {
    image: "coca-cola.svg",
    address: "0xf7NdoiNln58SSjEsggsin",
    date: "Jan 4, 2022",
    missionNames: "1L Plastic Bottles",
    returnedItems: "140,000",
    location: "Worldwide",
    status: "Active",
    progress: 80,
  },
];

const MissionDetail = () => {
  return (
    <div>
      <div className="bg-[url('/assets/images/colabg.svg')] h-44 bg-no-repeat bg-cover"></div>
      <MissionLog data={dummydata} />
    </div>
  );
};

export default MissionDetail;
