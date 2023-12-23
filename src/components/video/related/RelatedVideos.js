import { useGetRelatedVideosByTitleQuery } from "../../../features/apiSlice";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({id,title}) {
    //TODO:set up backend for like search
    const {data:relatedVideo,isLoading} = useGetRelatedVideosByTitleQuery({id,title})

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            <RelatedVideo />
        </div>
    );
}
