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
    getRelatedVideosByTitle: builder.query({
      query: ({ id, title }) => {
        const tags = title.splits(" ");
        const likes = tags.map((tag) => `title_like=${tag}`);
        const queryString = `/videos?${likes.join("&")}&_limit=3`;
        return queryString;
      },
    }),
  }),
});
export const {
  useGetAllVideosQuery,
  useGetSingleVideoQuery,
  useGetRelatedVideosByTitleQuery,
} = apiSlice;
