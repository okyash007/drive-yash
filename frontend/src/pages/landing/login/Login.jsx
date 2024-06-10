import React from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin() {
    const userData = await makePostRequest(`${backendUrl}/user/login`, {
      username: "test",
      password: "test@123",
    });
    console.log(userData);
    if (userData.success === true) {
      localStorage.setItem("access_token", userData.data.token);
      dispatch(setUser(userData.data.user));
      navigate("/drive");
    }
  }

  return (
    <div className="flex flex-col gap-2 my-2">
      <p>Drive</p>
      <input
        className="py-2 px-3 bg-[#ffffff1a] rounded-lg"
        placeholder="username"
        type="text"
      />
      <input
        className="py-2 px-3 bg-[#ffffff1a] rounded-lg"
        placeholder="password"
        type="password"
      />
      <button
        className="py-2 px-3 bg-[#ffffff1a] rounded-lg"
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
