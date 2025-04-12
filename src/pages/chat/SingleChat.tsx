import React, { useEffect, useState } from "react";
import {
  ApiGetAllChats,
  ApiGetAllChatsByConsultation,
  ApiSendMessage,
} from "../../api/chat";
import { useUserStore } from "../../stores/tokenStore";
import { useParams } from "react-router-dom";
import { Box, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { Icons } from "../../assets/icons";

interface ChatMessage {
  id?: string;
  sender: string;
  message: string;
  isTemporary?: boolean;
}

const SingleChat = () => {
  const { userProfile } = useUserStore();
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const { id } = useParams();

  const form = useForm({
    initialValues: {
      message: "",
    },
    validate: {
      message: (value) =>
        value.length < 4 ? "Write a message longer than 4 characters" : null,
    },
  });

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userProfile?.email) return;

    const messageText = form.values.message;
    if (!messageText) return;

    // Create temporary message
    const tempMessage: ChatMessage = {
      sender: userProfile.email,
      message: messageText,
      isTemporary: true,
    };

    // Add temporary message to chats array at the beginning since display is reversed
    setChats((prev) => [tempMessage, ...prev]);

    // Clear the input
    form.setFieldValue("message", "");

    try {
      const payload = {
        consultation: id,
        message: messageText,
      };
      const res = await ApiSendMessage(payload);

      // Update the temporary message with the actual response
      setChats((prev) =>
        prev.map((msg) =>
          msg.isTemporary ? { ...res.data, isTemporary: false } : msg
        )
      );

      toast.success("Message Sent");
    } catch (error: any) {
      // Remove the temporary message if API call fails
      setChats((prev) => prev.filter((msg) => !msg.isTemporary));
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  const fetchAllChatsByConsultation = async () => {
    if (!id) return;
    try {
      const response = await ApiGetAllChatsByConsultation(id);
      setChats(response?.data?.results || []);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  useEffect(() => {
    fetchAllChatsByConsultation();
  }, [id]);

  return (
    <>
      <div className="w-full flex gap-6 px-8">
        {/* left image */}
        {userProfile?.role === "Doctor" ? (
          <div className="w-3/12 flex items-center justify-center">
            <Icons.User className="size-32" />
          </div>
        ) : (
          <div className="w-3/12 flex items-center justify-center">
            <Icons.Stethescope className="size-32" />
          </div>
        )}

        <div className="w-6/12">
          <div className="w-full py-4 h-[78vh] overflow-y-auto  mx-auto space-y-4">
            {[...chats].reverse().map((item, index) => (
              <div
                key={item.id || index}
                className={`w-full flex ${
                  item.sender === userProfile?.email ? "justify-end" : ""
                }`}
              >
                <div
                  className={`p-3 rounded-xl border mb-2 max-w-[80%] shadow-sm border-gray-300 ${
                    item.sender === userProfile?.email
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-black"
                  } ${item.isTemporary ? "opacity-70" : ""}`}
                >
                  <div>{item.sender}</div>
                  <div>{item.message}</div>
                </div>
              </div>
            ))}
          </div>

          <Box className="py-6 border-t flex justify-between w-full max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage} className="w-full flex gap-4">
              <TextInput
                {...form.getInputProps("message")}
                className="w-full"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 
                               text-white font-medium rounded-xl shadow-xl hover:shadow-2xl 
                               transform hover:scale-102 transition-all duration-300 w-1/4"
              >
                Send
              </Button>
            </form>
          </Box>
        </div>

        {/* right image */}
        {userProfile?.role === "Doctor" ? (
          <div className="w-3/12 flex items-center justify-center">
            <Icons.Stethescope className="size-32" />
          </div>
        ) : (
          <div className="w-3/12 flex items-center justify-center">
            <Icons.User className="size-32" />
          </div>
        )}
      </div>
    </>
  );
};

export default SingleChat;
