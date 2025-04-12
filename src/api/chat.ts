import api from "../services/api";

export const ApiGetAllChats = async () => {
  const response = await api.get("chats/");
  return response;
};
export const ApiSendMessage = async (data: any) => {
  const response = await api.post("chats/", data);
  return response;
};
export const ApiGetAllChatsByConsultation = async (id: string | number) => {
  const response = await api.get(`chats/by-consultation/${id}/`);
  return response;
};
