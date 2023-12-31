import { Link, useNavigate } from "react-router-dom";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import {
  useDeleteVideoMutation,
  useEditVideoMutation,
  useGetUsersQuery,
} from "../../features/apiSlice";
import { useEffect, useState } from "react";
import Error from "../ui/Error";
import { BiLike } from "react-icons/bi";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Description({ video }) {
  const { isDark } = useSelector((state) => state.dark);

  const { email } = useSelector((state) => state.auth);
  const { title, date, _id, description, like } = video;
  const navigate = useNavigate();
  const [deleteVideo, { isSuccess, isError, isLoading }] =
    useDeleteVideoMutation();
  const [editVideo, { isSuccess: isLikeSuccess }] = useEditVideoMutation();

  //user liked info

  const { data } = useGetUsersQuery();

  const notify = (text) =>
    toast.warn(text, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const handleDelete = () => {
    deleteVideo(_id);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);
  const { data: user } = useGetUsersQuery();

  const handleLike = () => {
    if (!email) {
      notify("You have to login first");
      return;
    }
   
    editVideo({
      _id,
      data: {
        like: Number(like) + 1,
      },
    });
    
  };

  return (
    <div>
      <ToastContainer />
      <h1 className={`text-lg font-semibold tracking-tight  ${isDark ? "text-white":"text-slate-800"}`}>
        {title}
      </h1>
      <div className="pb-4 flex items-center space-between border-b gap-4 ">
        <h2 className={`text-sm leading-[1.7142857]  w-full ${isDark ? "text-white":'text-slate-600'}`}>
          {date}
        </h2>

        <div className="flex gap-6 w-full justify-end items-center">
          <div className="flex gap-2">
            <span onClick={handleLike}>
              <BiLike
                size={24}
                className={`hover:scale-110 cursor-pointer hover:text-green-500 ${isDark ? "text-white":""}`}
              />
            </span>
            <span className={`${isDark ? "text-white":"text-black"}`}>{like}</span>
          </div>

          <div className="flex gap-1 items-center">
            <div className="shrink-0">
              <Link to={`/videos/edit/${_id}`}>
                <img className="w-5 block"  src={editImage} alt="Edit" />
              </Link>
            </div>
            <Link to={`/videos/edit/${_id}`}>
              <span className={ `text-sm leading-[1.7142857]  cursor-pointer ${isDark ? "text-white":'text-slate-600'}`}>
                Edit
              </span>
            </Link>
          </div>

          <div onClick={handleDelete} className="flex gap-1 cursor-pointer">
            <div className="shrink-0">
              <img className="w-5 block" src={deleteImage} alt="Delete" />
            </div>
            <div className={`text-sm leading-[1.7142857]  cursor-pointer ${isDark ? "text-white":'text-slate-600'}`}>
              Delete
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
        {description}
      </div>

      {isError && <Error></Error>}
    </div>
  );
}
