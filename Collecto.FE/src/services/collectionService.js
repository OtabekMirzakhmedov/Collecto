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
};

export default collectionService;
