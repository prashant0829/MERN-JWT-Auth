import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthContext } from "./components/AuthContextProvider";

const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      {!user && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Register />} />
        </>
      )}
      <Route path="/user" element={<ProtectedRoute element={<UserPage />} />} />
      <Route path="/" element={<Home />} />
      {/* Default route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
