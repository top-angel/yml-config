import React from "react";
import { Meta } from "../../layouts/Meta";
import { Main } from "../../templates/Main";
import MissionDetail from "../../components/MissionDetail/MissionDetail";

const Mission = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <MissionDetail />
    </Main>
  );
};

export default Mission;
