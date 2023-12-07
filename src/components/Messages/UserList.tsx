import React, { useState } from "react";
import Image from "next/image";

interface UserListProps {
  users: User[];
  onUserSelect: (user: User) => void;
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

const UserList: React.FC<UserListProps> = ({
  users,
  onUserSelect,
  selectedUser,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <div className="font-primary text-lg font-semibold text-graystrongest">
          Messages{" "}
          <span className="ml-2 rounded-md border border-bordergray p-1 font-primary text-xs font-medium text-graystrong">
            40
          </span>
        </div>
        <Image
          src={"/assets/images/chatediticon.svg"}
          alt="edit"
          width="40"
          height="40"
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="relative mb-2 items-center px-3">
        <input
          type="text"
          placeholder="Search users by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-1 mt-1 w-full rounded-xl border border-bordergray bg-white px-10 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
        />
        <Image
          src={`/assets/images/search.svg`}
          alt="logo"
          width="20"
          height="20"
          className="absolute left-6 top-4"
        />
      </div>

      <ul className="border-t border-bordergray">
        {filteredUsers.map((user) => (
          <li
            key={user.username}
            onClick={() => onUserSelect(user)}
            className={`hover:bg-gray-200 mb-1 cursor-pointer px-3 py-2 ${
              user.onlineStatus == true
                ? "border-b border-green"
                : "border-b border-bordergray"
            } ${user === selectedUser ? "bg-bordergray" : ""}`}
          >
            <div className="flex justify-between">
              <div className="flex">
                {user.onlineStatus && (
                  <Image
                    src={`/assets/images/onlineicon.svg`}
                    alt="online"
                    width="8"
                    height="8"
                    className="mr-3"
                  />
                )}
                <img
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
                  className={`mr-2 h-10 w-10 rounded-full ${
                    user.onlineStatus == true ? "ml-0" : "ml-5"
                  }`}
                />
                <div>
                  <div className="font-primary text-sm font-semibold text-graystrongest">
                    {user.username}
                  </div>
                  <div className="font-primary text-sm font-normal text-graymiddle">
                    {user.role}
                  </div>
                </div>
              </div>
              <div className="font-primary text-sm font-normal text-graymiddle opacity-50">
                {user.lasttime}
              </div>
            </div>
            <div className="mx-5 my-2 font-primary text-sm font-normal text-graymiddle opacity-50">
              {user.lasthistory}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
