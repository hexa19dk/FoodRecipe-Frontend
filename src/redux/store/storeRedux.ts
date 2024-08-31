import { configureStore } from "@reduxjs/toolkit";
import { userAuthReducer } from "../reducerAction/userAuthSlice";
import { recipeReducer } from "../reducerAction/recipeSlice";
import { favoriteReducer } from "../reducerAction/favoriteSlice";
import authApi from "../../api/authApi";
import recipeApi from "../../api/recipeApi";
import userApi from "../../api/userApi";
import favoriteApi from "../../api/favoriteApi";


// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage
// };

// const reducer = combineReducers({
//     // Favorites: favoriteReducer,
//     [favoriteApi.reducerPath]: favoriteApi.reducer
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

const storeRedux = configureStore({
    reducer: {
        userAuthStore: userAuthReducer,
        recipeStore: recipeReducer,
        favoriteStore: favoriteReducer,
        [authApi.reducerPath]: authApi.reducer,
        [recipeApi.reducerPath]: recipeApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [favoriteApi.reducerPath]: favoriteApi.reducer,
        // persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(recipeApi.middleware)
        .concat(userApi.middleware)
        .concat(favoriteApi.middleware),        
});

export type RootState = ReturnType<typeof storeRedux.getState>;

export default storeRedux;