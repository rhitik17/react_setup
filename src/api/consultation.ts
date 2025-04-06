import api from "../services/api";

export const APICreateconsultation = async (data: any) => {
  const response = await api.post("doctor-consultations/", data);
  return response;
};
