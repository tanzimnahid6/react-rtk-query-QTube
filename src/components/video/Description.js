import { Link, useNavigate } from "react-router-dom";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import {
  useDeleteVideoMutation,
  useEditVideoMutation,
} from "../../features/apiSlice";
import { useEffect } from "react";
import Error from "../ui/Error";
import { BiLike } from "react-icons/bi";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Description({ video }) {
  const { email } = useSelector((state) => state.auth);
  const { title, date, _id, description, like } = video;
  const navigate = useNavigate();
  const [deleteVideo, { isSuccess, isError, isLoading }] =
    useDeleteVideoMutation();
  const [editVideo, { isSuccess: isLikeSuccess }] = useEditVideoMutation();

  console.log(_id);
  const notify = () =>
    toast.warn("You have to login first", {
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

  const handleLike = () => {
    if (!email) {
      notify();
      return;
    }
    editVideo({
      _id,
      data: {
        like: Number(like) + 1,
      },
    });
  };
  console.log(isLikeSuccess)

  return (
    <div>
      <ToastContainer />
      <h1 className="text-lg font-semibold tracking-tight text-slate-800">
        {title}
      </h1>
      <div className="pb-4 flex items-center space-between border-b gap-4">
        <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
          {date}
        </h2>

        <div className="flex gap-6 w-full justify-end items-center">
          <div className="flex gap-2">
            <span onClick={handleLike}>
              <BiLike
                size={24}
                className="hover:scale-110 cursor-pointer hover:text-green-500"
              />
            </span>
            <span>{like}</span>
          </div>

          <div className="flex gap-1 items-center">
            <div className="shrink-0">
              <Link to={`/videos/edit/${_id}`}>
                <img className="w-5 block" src={editImage} alt="Edit" />
              </Link>
            </div>
            <Link to={`/videos/edit/${_id}`}>
              <span className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                Edit
              </span>
            </Link>
          </div>

          <div onClick={handleDelete} className="flex gap-1 cursor-pointer">
            <div className="shrink-0">
              <img className="w-5 block" src={deleteImage} alt="Delete" />
            </div>
            <div className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
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
