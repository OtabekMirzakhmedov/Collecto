import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import collectionReducer from "./slices/collectionSlice"
import itemReducer from "./slices/itemSlice"
import languageReducer from "./slices/languageSlice";
import userReducer from './slices/userSlice';
import tagReducer from './slices/tagSlice'


const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
    item: itemReducer,
    language: languageReducer,
    user: userReducer, 
    tag: tagReducer
  },
});

export default store;