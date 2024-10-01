import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "../reducerAction/userAuthSlice";
import { recipeReducer } from "../reducerAction/recipeSlice";
import { favoriteReducer } from "../reducerAction/favoriteSlice";
import { persistReducer, persistStore } from "redux-persist";
import authApi from "../../api/authApi";
import recipeApi from "../../api/recipeApi";
import userApi from "../../api/userApi";
import favoriteApi from "../../api/favoriteApi";
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    favRecipe: favoriteReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const storeRedux = configureStore({
    reducer: {
        userAuthStore: userAuthReducer,
        recipeStore: recipeReducer,
        favoriteStore: favoriteReducer,
        [authApi.reducerPath]: authApi.reducer,
        [recipeApi.reducerPath]: recipeApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [favoriteApi.reducerPath]: favoriteApi.reducer,
        persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware)
        .concat(recipeApi.middleware)
        .concat(userApi.middleware)
        .concat(favoriteApi.middleware),        
});

export const persistor = persistStore(storeRedux);
export type RootState = ReturnType<typeof storeRedux.getState>;
export default storeRedux;