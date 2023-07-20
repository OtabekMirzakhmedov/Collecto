import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const searchService = {
  searchItemsAndCollections: async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Search?query=${query}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default searchService;
