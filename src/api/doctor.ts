import api from "../services/api";

export const APIGetDoctorsDetails = async (id: any) => {
    const response = await api.get(`/doctors/${id}`);
    return response;
  };