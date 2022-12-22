import { message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { URL } from "../../App";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";

function AdminLogin() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const login = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        `${URL}/api/portfolio/admin-login`,
        user
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", JSON.stringify(response.data));
        window.location.href = "/admin";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="w-96 flex gap-5 p-5 shadow border border-gray-500 flex-col text-xl bg-white">
        <h1 className="text-center">EstongPogi Login</h1>
        <input
          className="border p-3"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />
        <input
          className="border p-3"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
        <button className="bg-primary text-fourth p-2" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;
