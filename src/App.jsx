import LogIn from "./components/LogIn.jsx";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserDetails from "./components/UserDetails.jsx";
import About from "./components/About.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Tasks from "./components/Tasks.jsx";

function App() {
  const userLoggedIn = localStorage.getItem("LoggedIn");


  if (userLoggedIn == null) {
    localStorage.setItem("LoggedIn", false);
  }
  return (
    <>
      <BrowserRouter>
        <>
          <NavBar LoggedIn={userLoggedIn} />

          <Routes>
            {userLoggedIn === "false" && (
              <>
                <Route path="/login" element={<LogIn />} />
                <Route path="/" element={<Navigate to={"/login"} />} />
              </>
            )}

            <Route element={<ProtectedRoute />}>
              <Route path="/login" element={<Navigate to="/" />} />

              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/profile" element={<UserDetails />} />
              <Route path="/todos" element={<Tasks />} />
            </Route>

            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
