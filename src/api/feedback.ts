import api from "../services/api";


export const APIGetFeedbacks = async () => {
  const response = await api.get(`feedback/`);
  return response;
};
