import React from "react";

interface ChatHeaderProps {
  selectedUser: User | null;
}

interface User {
  avatar: string;
  username: string;
  role: string;
  lasttime: string;
  lasthistory: string;
  onlineStatus: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ selectedUser }) => {
  return (
    <div className="border-b border-bordergray p-5">
      {selectedUser ? (
        <div className="flex items-center">
          <img
            src={selectedUser.avatar}
            alt={`${selectedUser.username}'s avatar`}
            className="mr-4 h-14 w-14 rounded-full"
          />
          <div>
            <div className="font-primary text-lg font-semibold text-graystrongest">
              {selectedUser.username}
            </div>
            <div className="font-primary text-sm font-normal text-graymiddle">
              {selectedUser.role}
            </div>
          </div>
        </div>
      ) : (
        <div className="font-primary text-lg font-semibold text-graystrongest">
          Select a user to start a chat.
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
