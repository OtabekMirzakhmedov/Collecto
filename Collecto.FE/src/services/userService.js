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

  getAllUsers: async () => {
    try {
      const jwtToken = sessionStorage.getItem("jwtToken");
      const response = await axios.get(`${API_BASE_URL}/User/all-users`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  blockUsers: async (userIds) => {
    try {
      const jwtToken = sessionStorage.getItem("jwtToken");
      const response = await axios.put(
        `${API_BASE_URL}/User/block-users`,
        userIds,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  unblockUsers: async (userIds) => {
    try {
      const jwtToken = sessionStorage.getItem("jwtToken");
      const response = await axios.put(
        `${API_BASE_URL}/User/unblock-users`,
        userIds,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  makeAdmin: async (userIds) => {
    try {
      const jwtToken = sessionStorage.getItem("jwtToken");
      const response = await axios.put(
        `${API_BASE_URL}/User/make-admin`,
        userIds,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  makeUser: async (userIds) => {
    try {
      const jwtToken = sessionStorage.getItem("jwtToken");
      const response = await axios.put(
        `${API_BASE_URL}/User/make-user`,
        userIds,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

};

export default userService;

