import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5128/api/",
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `user/${id}`,
      }),
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: "user/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;
export default userApi;
