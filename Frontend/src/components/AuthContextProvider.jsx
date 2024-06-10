import { createContext, useState, useEffect } from "react";
import api from "../utility/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [user, setUser] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const res = await api.get("/api/user");
      //   setUser(res.data);
      // } catch (error) {
      //   setUser(null);
      // }

      setUser({ userName: "prashant0829" });
    };
    fetchData();
  }, []);

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      localStorage.clear();
      history("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
export { AuthContext };
