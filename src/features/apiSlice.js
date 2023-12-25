import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes:['videos'],
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor:600,
      providesTags:['videos']         //refetch videos api after every 10 min continuously
    }),
    getSingleVideo: builder.query({
      query: (id) => `/videos/${id}`,
    }),
    getRelatedVideosByTitle: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");
        const likes = tags.map((tag) => `title_like=${tag}`);
        const queryString = `/videos?${likes.join("&")}&_limit=3`;
        return queryString;
      },
    }),
    addVideo:builder.mutation({
        query:(data)=>({
            url:"/videos",
            method:"POST",
            body:data,
        }),
        invalidatesTags:['videos']

    })
  }),
});
export const {
  useGetAllVideosQuery,
  useGetSingleVideoQuery,
  useGetRelatedVideosByTitleQuery,
  useAddVideoMutation
} = apiSlice;
