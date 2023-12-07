import React from "react";

import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";
import MissionCreation from "src/components/MissionCreation/MissionCreation";

const Creators = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <MissionCreation />
    </Main>
  );
};

export default Creators;
