import React from "react";

import { Meta } from "../layouts/Meta";
import { Main } from "../templates/Main";
import MessagesCom from "src/components/Messages/Messages";

const userData = [
  {
    avatar: "https://randomuser.me/api/portraits/med/women/45.jpg",
    username: "Katherine Moss",
    role: "Collector",
    lasttime: "20min ago",
    lasthistory:
      "You: Sure thing, I’ll have a look today. They’re looking great!",
    onlineStatus: false,
  },
  {
    avatar: "https://randomuser.me/api/portraits/med/men/45.jpg",
    username: "Bonza Coffee",
    role: "Storer",
    lasttime: "5min ago",
    lasthistory:
      "Hey Olivia, Katherine sent me over the latest doc. I just have a quick question about the...",
    onlineStatus: false,
  },
  {
    avatar: "https://randomuser.me/api/portraits/med/women/25.jpg",
    username: "Mollie Hall",
    role: "Collector",
    lasttime: "1hr ago",
    lasthistory:
      "I’ve just published the site again. Looks like it fixed it. How weird! I’ll keep an eye on it...",
    onlineStatus: false,
  },
  {
    avatar: "https://randomuser.me/api/portraits/med/women/55.jpg",
    username: "Palo Verde Bistro",
    role: "Storer",
    lasttime: "2hr ago",
    lasthistory:
      "Hey Liv — just wanted to say thanks for chasing up the release for me. Really...",
    onlineStatus: true,
  },
  {
    avatar: "https://randomuser.me/api/portraits/med/men/12.jpg",
    username: "Analah Whitten",
    role: "Collector",
    lasttime: "2hr ago",
    lasthistory:
      "Good news!! Jack accepted the offer. I’ve sent over a contract for him to review but...",
    onlineStatus: true,
  },
  {
    avatar: "https://randomuser.me/api/portraits/med/women/17.jpg",
    username: "Museo Frida Kahlo",
    role: "Storer",
    lasttime: "4hr ago",
    lasthistory: "Thanks! Looks great!",
    onlineStatus: false,
  },
  {
    avatar: "https://randomuser.me/api/portraits/med/men/18.jpg",
    username: "Eva Bond",
    role: "Storer",
    lasttime: "4hr ago",
    lasthistory:
      "The press release went out! It’s been picked up by a few people... Here’s the link if you...",
    onlineStatus: true,
  },
];

const Messages = () => {
  return (
    <Main meta={<Meta title="Recyclium" description="Recyclium front-end" />}>
      <MessagesCom user={userData} />
    </Main>
  );
};

export default Messages;
