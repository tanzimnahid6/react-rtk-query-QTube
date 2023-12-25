import { useGetAllVideosQuery } from "../../features/apiSlice";
import Video from "./Video";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import { useEffect, useState } from "react";

export default function Videos() {
  const [request, setRequest] = useState(false);
  const {
    data: videos,
    isLoading,
    isError,
    refetch,
  } = useGetAllVideosQuery(undefined, {
    refetchOnReconnect: true,
    skip: !request,
  });
  //we get control to request the videos url ,now we can integrate reload button to refetch the videos ,on the overhands we can use refetch to do the same things
  //TODO:set a reload button using redux in home page
  useEffect(() => {
    setRequest(true);
  }, []);

  let content = null;

  if (isLoading) {
    content = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error message="There was an error" />;
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = <Error message="No videos found!" />;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }

  return content;
}
