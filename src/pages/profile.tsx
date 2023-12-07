import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";

import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <Profile />
    </Main>
  );
};

export default ProfilePage;
