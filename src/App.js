import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Add from "./components/pages/Add";
import Edit from "./components/pages/Edit";
import Home from "./components/pages/Home";
import Video from "./components/pages/Video";
import Login from "./components/pages/Login";
import SignIn from "./components/pages/SignIn";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logInUser } from "./features/authSlice/authSlice";
import app from "./firebase.config";

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
    });
    return () => unsubscribe();
  }, [dispatch]);
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signIn" element={<SignIn />} />

        <Route path="/videos/:videoId" element={<Video />} />
        <Route path="/videos/add" element={<Add />} />
        <Route path="/videos/edit/:videoId" element={<Edit />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
