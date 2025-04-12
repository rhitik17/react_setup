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

const SingleChat = () => {
  const { userProfile } = useUserStore();
  const [chats, setChats] = useState([]);
  const { id } = useParams();

  const form = useForm({
    initialValues: {
      consultation: id,
      message: "",
    },
    validate: {
      //   doctor: (value) => (!value ? "Please select a doctor" : null),
      message: (value) =>
        value.length > 4 ? "write message of bigger length than 4" : null,
    },
  });

  const handleSendMessage = async (values: typeof form.values) => {
    console.log(values);
    const res = await ApiSendMessage(values);
    console.log(res);
  };

  const fetchAllChatsByConsultation = async () => {
    try {
      const response = await ApiGetAllChatsByConsultation(id);
      setChats(response?.data?.results);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };
  useEffect(() => {
    fetchAllChatsByConsultation();
  }, []);

  return (
    <>
      <div className="max-w-3xl py-4 w-full mx-auto space-y-4">
        {chats.reverse().map((item, index) => (
          <div
            className={` w-full  flex  ${
              item.sender === userProfile.email ? "justify-end" : ""
            }`}
          >
            <div
              className={`p-3 rounded-xl border mb-2 max-w-[80%] shadow-sm border-gray-300  ${
                item.sender === userProfile.email
                  ? "bg-blue-600 text-white"
                  : " bg-gray-300 text-black"
              }`}
            >
              <div>{item?.sender}</div>
              <div> {item?.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* chat box */}
      <Box className="h-auto py-4 border-t flex justify-between w-full max-w-3xl mx-auto">
        <form onSubmit={() => handleSendMessage(form.values)}>
          <TextInput {...form.getInputProps("message")}></TextInput>
        </form>
        <Button
          type="submit"
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 
                               text-white font-medium rounded-xl shadow-xl hover:shadow-2xl 
                               transform hover:scale-102 transition-all duration-300"
        >
          Send
        </Button>
      </Box>
    </>
  );
};

export default SingleChat;
