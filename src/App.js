import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";
import Home from "./components/pages/Home";
import Video from "./components/pages/Video";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logInUser } from "./features/authSlice/authSlice";
import app from "./firebase.config";
import PrivetRoute from "./components/PrivetRoute";
import { loadingState } from "./features/onAuthChangedLoader/loaderSlice";

const auth = getAuth(app);

function App() {
  const dispatch = useDispatch();

  //on auth state change -- get previously sign in user =================================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const user = {
        email: currentUser?.email,
        userName: currentUser?.displayName,
      };

      //save user in local state=======
      dispatch(logInUser(user));
      dispatch(loadingState());
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/videos/:videoId" element={<Video />} />
        <Route
          path="/videos/add"
          element={
            <PrivetRoute>
              <Add />
            </PrivetRoute>
          }
        />
        <Route
          path="/videos/edit/:videoId"
          element={
            <PrivetRoute>
              <Edit />
            </PrivetRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
