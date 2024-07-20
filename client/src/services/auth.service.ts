import axios from "axios";
import { API_URL } from "../config/config";
import { ILogin } from "../interfaces/login.interface";
import { ISignUp } from "../interfaces/signup.interface";

export const loginUser = async (data: ILogin) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response;
  } catch (error: any) {
    return error.response.data;
  }
};

export const signUpUser = async (data: ISignUp) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    console.log(response);
    return response;
  } catch (error: any) {
    return error.response;
  }
};

export const getUser = async () => {
  try {
    const authToken = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/auth/user`, {
      headers: {
        authToken: `${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
