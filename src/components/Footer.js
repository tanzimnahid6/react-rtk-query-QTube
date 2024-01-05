import { useSelector } from "react-redux";

export default function Footer() {
    const { isDark } = useSelector((state) => state.dark);
    return (
        <section className="">
            <div className={`w-full  px-4  py-6 lg:px-8 flex justify-between gap-2 border-t text-sm font-bold text-slate-400  ${isDark?"bg-[#111931]":""}`}>
                <div>Copyright 2023 By Jubayer.</div>
                <div>
                    <a
                        href="https://youtube.com/learnwithsumit"
                        target="_blank"
                        rel="noreferrer"
                    >
                        QTube
                    </a>
                </div>
            </div>
        </section>
    );
}
