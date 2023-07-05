import axios from "axios";
import API_BASE_URL from "../apiConfig";

const userService = {
  getUserData: async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const response = await axios.get(`${API_BASE_URL}/User/user`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default userService;

