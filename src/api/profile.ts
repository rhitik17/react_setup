import api from "../services/api";

export const APIGetProfileDetails = async () => {
  const response = await api.get(`/users/me/`);
  return response;
};
export const APIGetAllUsers = async () => {
  const response = await api.get(`/users/`);
  return response;
};
