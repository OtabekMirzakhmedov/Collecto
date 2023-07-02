import axios from "axios";
import API_BASE_URL from "../apiConfig";

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/login`, credentials);
      console.log(response);
      const jwtToken = response.data;
      console.log(jwtToken);
      localStorage.setItem("jwtToken", jwtToken);
      console.log('I am here in login');
      // Return an object containing the user details and additional data
      return jwtToken;
    } catch (error) {
      throw error;
    }
  },

  signup: async (userData) => {
    console.log(userData);
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/register`, userData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
