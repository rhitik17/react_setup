import { api } from "../api";

interface LoginData {
  email: string;
  password: string;
  connectedTo?: string;
}

export const loginApi = async (formData: LoginData) => {
  try {
    const response = await api.post("systemuser/login", formData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

interface RegisterData {
  affiliateName: string;
  contactPerson: string;
  phone: string;
  password: string;
}

export const registerApi = async (formData: RegisterData) => {
  try {
    const response = await api.post("systemuser/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

interface OtpData {
  otp: string;
}

export const otpVerify = async (formData: OtpData) => {
  try {
    const response = await api.post("/systemuser/otpverify", formData, {});
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const resendOtp = async (formData: any) => {
  try {
    const response = await api.post("/otpverify", formData, {});
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

interface ForgetPasswordData {
  input: string;
}

export const forgetPassowrd = async (formData: ForgetPasswordData) => {
  try {
    const response = await api.post("/systemuser/forgetPassword", formData, {});
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};
