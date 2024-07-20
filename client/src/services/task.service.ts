import axios from "axios";
import { API_URL } from "../config/config";
import { ITask } from "../interfaces/task.interface";

export const createTask = async (authToken: string | null, data: ITask) => {
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

export const getTasks = async (authToken: string | null) => {
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

export const getTask = async (authToken: string | null, id: string) => {
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

export const updateTask = async (authToken: string | null, id: string, data: ITask) => {
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

export const deleteTask = async (authToken: string | null, id: string) => {
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
