import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: () => "/videos",
    }),
    getSingleVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
  }),
});
export const { useGetAllVideosQuery ,useGetSingleVideoQuery} = apiSlice;
