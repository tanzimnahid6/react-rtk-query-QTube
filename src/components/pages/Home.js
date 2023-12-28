import { useSelector } from "react-redux";
import Videos from "../videos/Videos";

export default function Home() {
    const { isDark } = useSelector((state) => state.dark);
   
    return (
        <section className={`pt-6 pb-20 min-h-[calc(100vh_-_157px)] ${isDark ? "bg-[#0F172C]" : "bg-white"}`}>
            <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
                <Videos />
            </div>
        </section>
    );
}
