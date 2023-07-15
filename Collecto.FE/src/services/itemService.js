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

  editItem: async (itemId, updatedItemDto, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/Item/edit-item/${itemId}`, updatedItemDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteItem: async (itemId, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/Item/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteItemsByIds: async (itemIds, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/Item/delete-items`, {
        data: itemIds,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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

  getItemById: async (itemId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Item/get-item-by-id/${itemId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Item not found");
        throw new Error("Item not found");
      }
      throw error;
    }
  },

  likeItem: async (itemId, userId, token) => {
    try {
      const likeData = { itemId, userId };
      const response = await axios.post(`${API_BASE_URL}/Like/like`, likeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  unlikeItem: async (itemId, userId, token) => {
    try {
      const likeData = { itemId, userId };
      const response = await axios.delete(`${API_BASE_URL}/Like/like`, {
        data: likeData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  


};

export default itemService;
