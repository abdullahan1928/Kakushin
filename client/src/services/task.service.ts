import axios from "axios";
import { API_URL } from "../config/config";
import { ITask } from "../interfaces/task.interface";

const authToken = localStorage.getItem("token");

export const createTask = async (data: ITask) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, data, {
      headers: {
        authToken: `${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        authToken: `${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getTask = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${id}`, {
      headers: {
        authToken: `${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateTask = async (id: string, data: ITask) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${id}`, data, {
      headers: {
        authToken: `${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteTask = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: {
        authToken: `${authToken}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
