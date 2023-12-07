import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";

import Home from "../components/Home/Home";

const Index = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Home />
    </Main>
  );
};

export default Index;
