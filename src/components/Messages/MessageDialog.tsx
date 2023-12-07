import React, { useState } from "react";

interface MessageDialogProps {
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

const MessageDialog: React.FC<MessageDialogProps> = ({ selectedUser }) => {
  // Implement message display logic here

  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    // You may want to send the message to the selected user
  };

  return (
    <div>
      <div className="m-5 h-64 overflow-y-auto">
        {/* Display messages here */}
      </div>
      <div className="relative m-5 h-24">
        <textarea
          placeholder={`Send a message to ${selectedUser?.username}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-24 w-full resize-none rounded-xl border border-bordergray bg-white px-3 py-2 text-base font-normal text-darkgray focus:outline focus:outline-1 focus:outline-offset-0 focus:outline-primary"
        />
        <button
          onClick={handleSendMessage}
          className="absolute bottom-3 right-3 cursor-pointer rounded-md bg-green px-3 py-2 font-primary text-sm font-semibold text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageDialog;
