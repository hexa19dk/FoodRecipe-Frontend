import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5128/api/",
  }),
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getFavoriteByUserId: builder.query({
      query: (userId) =>
        userId
          ? {
              url: `favorite/get-favoriteBy-userId/${userId}`,
            }
          : {
              url: "favorite/get-favoriteBy-userId",
            },
      providesTags: ["Favorites"],
    }),
    addRemoveFavorite: builder.mutation({
      query: ({ data }) => ({
        url: "favorite/add-remove",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetFavoriteByUserIdQuery,
  useAddRemoveFavoriteMutation,
} = favoriteApi;
export default favoriteApi;