import { configureStore, combineReducers } from '@reduxjs/toolkit';
import themeSlice from "./Theme/themeSlice.js";
import userSlice from "./user/userSlice.js";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    theme: themeSlice,
    user: userSlice
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({ serializableCheck: false }),
});

export const persistor = persistStore(store);