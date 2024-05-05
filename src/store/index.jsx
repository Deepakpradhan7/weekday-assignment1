import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import jobDataSlice from './jobDataSlice';
import filterSlice from './filterSlice';


const rootReducer = combineReducers({
  jobs : jobDataSlice,
  filter: filterSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); //configure for data persistence 

//redux store configure
export const store = configureStore({   
  reducer: persistedReducer,
});
export const persistor = persistStore(store)