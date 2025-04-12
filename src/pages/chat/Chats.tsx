import React, { useEffect, useState } from "react";
import { ApiGetAllChats, ApiGetAllChatsByConsultation } from "../../api/chat";
import { useUserStore } from "../../stores/tokenStore";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const navigate = useNavigate();
  const { userProfile } = useUserStore();
  const [chats, setChats] = useState([]);
  const fetchAllChats = async () => {
    try {
      const response = await ApiGetAllChats();
      const allChats = response.data.results;

      // Create a map to store latest chat per consultation ID
      const latestChatsMap = new Map();

      allChats.forEach((chat) => {
        const existingChat = latestChatsMap.get(chat.consultation);

        if (
          !existingChat ||
          new Date(chat.created) > new Date(existingChat.created)
        ) {
          latestChatsMap.set(chat.consultation, chat);
        }
      });

      // Convert the map back to an array
      const uniqueChats = Array.from(latestChatsMap.values());

      setChats(uniqueChats);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  useEffect(() => {
    fetchAllChats();
  }, []);

  return (
    <div className="space-y-4">
      {chats?.map((item, index) => (
        <div
          onClick={() => navigate(`/chat/${item.consultation}`)}
          className="space-x-2 p-4 border border-gray-300 rounded-xl flex flex-col"
        >
          {item.consultation}
          <span className="text-primary-500">{item?.sender}</span>
          <span className="ml-">{item?.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Chats;
