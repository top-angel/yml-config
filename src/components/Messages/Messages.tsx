import React, { useState } from "react";
import UserList from "./UserList";
import ChatHeader from "./ChatHeader";
import MessageDialog from "./MessageDialog";
import MainDiscussion from "../MainDiscussion/MainDiscussion";

interface User {
  avatar: string;
  username: string;
  role: string;
  lasttime: string;
  lasthistory: string;
  onlineStatus: boolean;
}

type MessagesProps = {
  user: User[];
};

const Messages = ({ user }: MessagesProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(user);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const accountId = "0xda5d631dE5F41c4A6Fa53577CB232AD10a31E19a"; 

  return (
    <>
      <MainDiscussion accountId={accountId} />
    </>
  );
};

export default Messages;
