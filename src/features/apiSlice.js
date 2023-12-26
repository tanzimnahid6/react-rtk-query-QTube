import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "videoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["videos", "video", "relatedVideos"],
  endpoints: (builder) => ({
    getAllVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["videos"], //refetch videos api after every 10 min continuously
    }),

    getSingleVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, arg) => [{ type: "video", id: arg }],
    }),

    getRelatedVideosByTitle: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(" ");
        const likes = tags.map((tag) => `title_like=${tag}`);
        const queryString = `/videos?${likes.join("&")}&_limit=3`;

        return queryString;
      },
      providesTags: (result, error, arg) => [
        { type: "relatedVideos", id: arg.id },
      ],
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),

    editVideo: builder.mutation({
      query: ({ _id: id, data }) => ({
        url: `/videos/edit/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        "videos",
        { type: "video", id: arg.id },
        { type: "relatedVideos", id: arg.id },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => ["videos"],
    }),

   
  }),
});
export const {
  useGetAllVideosQuery,
  useGetSingleVideoQuery,
  useGetRelatedVideosByTitleQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
