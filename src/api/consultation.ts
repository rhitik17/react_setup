import api from "../services/api";

export const APICreateconsultation = async (data: any) => {
  const response = await api.post("doctor-consultations/", data);
  return response;
};
export const APIGetAllDoctors = async () => {
  const response = await api.get("doctors");
  return response;
};
export const APIGetAllConsultations = async () => {
  const response = await api.get("consultations/");
  return response;
};
