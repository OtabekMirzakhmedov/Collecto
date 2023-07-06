import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const collectionService = {
  createCollection: async (collectionDto, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Collection/create-collection`, collectionDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCollectionById: async (collectionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Collection/${collectionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchTopics: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Topic/topics`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default collectionService;
