import Login from "./components/login_register/Login";
import Register from "./components/login_register/Register";
import Home from "./components/home_page/Home";
import Profile from "./components/profile_page/Profile";
import CreatePostPage from "./components/create_post_page/CreatePostPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Register />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/home"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/profile/:username"
            element={user ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/createPost"
            element={user ? <CreatePostPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
