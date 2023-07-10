import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const itemService = {
  createItem: async (itemDto, collectionId, token) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Item/create-item?collectionId=${collectionId}`, itemDto);
      console.log(response.data);
      return response.data;
     
    } catch (error) {
      throw error;
    }
  },

  fetchTags: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Tag/tags`);
      console.log(response.data);
      return response.data;

    } catch (error) {
      throw error;
    }
  },

  getItemsByCollectionId: async (collectionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Item/get-items?collectionId=${collectionId}`);
      console.log(collectionId);
      console.log('response data', response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


};

export default itemService;
