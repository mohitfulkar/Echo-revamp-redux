// services/authService.js
import axios from "axios";
import { baseUrl } from "../constants/env";

export const authService = {
  registerUser: async (payload) => {
    try {
      const response = await axios.post(`${baseUrl}/user/register`, payload); // Your register endpoint
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Registration failed");
    }
  },

  // Login an existing user
  loginUser: async (payload) => {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, payload); // Your login endpoint
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Login failed");
    }
  },
  loginPanelist: async (payload) => {
    try {
      const response = await axios.post(`${baseUrl}/panelist/login`, payload); // Your login endpoint
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "Login failed");
    }
  },
};
