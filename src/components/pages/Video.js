import { useParams } from "react-router-dom";
import { useGetSingleVideoQuery } from "../../features/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import Error from "../ui/Error";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import { useSelector } from "react-redux";




export default function Video() {
    const { isDark } = useSelector((state) => state.dark);
    const { videoId } = useParams();
    const { data: video, isLoading, isError } = useGetSingleVideoQuery(videoId);
    let content = null;
    
    if (isLoading) {
        content = (
            <>
                <PlayerLoader />
                <DescriptionLoader />
            </>
        );
    }

    if (!isLoading && isError) {
        content = <Error message="There was an error!" />;
    }

    if (!isLoading && !isError && video?._id) {
        content = (
            <>
                <Player link={video.link} title={video.title} />
                <Description video={video} />
            </>
        );
    }
//bg-[#111931]
    return (
        <section className={`pt-6 pb-20 min-h-[calc(100vh_-_157px)]  ${
            isDark ? "bg-[#0F172C]" : "bg-white"
          } `}>
            <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
                <div className="grid grid-cols-3 gap-2 lg:gap-8">
                    <div className="col-span-full w-full space-y-8 lg:col-span-2">
                        {content}
                    </div>

                    {video?._id ? (
                        <RelatedVideos id={video._id} title={video.title} />
                    ) : isLoading ? (
                        <>
                            <RelatedVideoLoader />
                            <RelatedVideoLoader />
                            <RelatedVideoLoader />
                        </>
                    ) : (
                        <Error message="There was an error!" />
                    )}
                </div>
            </div>
        </section>
    );
}
