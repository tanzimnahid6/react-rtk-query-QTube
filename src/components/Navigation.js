import { Link } from "react-router-dom";
import logo from "../assets/qtube.png";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase.config";
import { logOutUser } from "../features/authSlice/authSlice";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { toggleDarkMood } from "../features/darkMoodSlice/darkSlice";
const auth = getAuth(app);

export default function Navigation() {
  const { email } = useSelector((state) => state.auth);

  const dispatch = useDispatch();


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        dispatch(logOutUser());
      })
      .catch((error) => {
        // An error happened.
      });
  };
  //dark mood functionality
  const { isDark } = useSelector((state) => state.dark);
  const handleDarkMood = () => {
    dispatch(toggleDarkMood());
  };
  return (
    <nav
      className={`bg-slate-100 shadow-md ${
        isDark ? "bg-[#0F172C]" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-0 flex justify-between py-3 items-center">
        <Link to="/">
          <img className="h-10 scale-110" src={logo} alt="Learn with Sumit" />
        </Link>
        <div className="flex items-center gap-2 cursor-pointer ">
          {isDark ? (
            <div onClick={handleDarkMood}>
              <MdOutlineDarkMode size={28} className="text-white" />
            </div>
          ) : (
            <div onClick={handleDarkMood}>
              <MdDarkMode size={28} />
            </div>
          )}

          {email ? (
            <div onClick={() => handleLogout()}>
              <span className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500 cursor-pointer">
                Logout
              </span>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>
                <span className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500">
                  Login
                </span>
              </Link>
            </div>
          )}

          <Link
            to="/videos/add"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            + Add Video
          </Link>
        </div>
      </div>
    </nav>
  );
}
