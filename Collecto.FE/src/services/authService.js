import axios from "axios";
import API_BASE_URL from "../apiConfig";

const authService = {
  login: async (credentials) => {
    try {

        console.log(credentials);

      const response = await axios.post(`${API_BASE_URL}/Auth/login`, credentials);

      console.log(response);
      const { id, jwtToken, role} = response.data;
      console.log(id, jwtToken, role);
      console.log('I am here in login');
      // Return an object containing the user details and additional data
      return {
        id,
        jwtToken,
        role,
      };
    } catch (error) {
      throw error;
    }
  },
  
  // Add other authentication-related API functions here (e.g., register, logout, etc.)
};

export default authService;
