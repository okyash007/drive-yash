import React, { useState } from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/userSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    console.log(formData);
    const userData = await makePostRequest(`${backendUrl}/user/login`, {
      username: formData.username,
      password: formData.password,
    });
    console.log(userData);
    setLoading(false);
    if (userData.success === true) {
      toast.success("Login success", {
        duration: 4000,
        position: "bottom-right",
        // Customizing the toast with Tailwind CSS classes
        className: "toast-success",
        // Or you can use a custom icon
        icon: "✔️",
      });
      localStorage.setItem("access_token", userData.data.token);
      dispatch(setUser(userData.data.user));
      navigate("/drive");
    } else {
      toast.error(
        userData.message ? userData.message : "something went wrong",
        {
          duration: 4000,
          position: "bottom-right",
          // Customizing the toast with Tailwind CSS classes
          className: "toast-error",
          // Or you can use a custom icon
        }
      );
    }
  }

  return (
    <div className="flex flex-col gap-2 w-72 h-screen justify-center">
      <input
        className="py-2 px-3 bg-[#ffffff1a] rounded-lg"
        placeholder="username"
        type="text"
        onChange={(e) => {
          setFormData((prev) => {
            return { ...prev, username: e.target.value };
          });
        }}
      />
      <input
        className="py-2 px-3 bg-[#ffffff1a] rounded-lg"
        placeholder="password"
        type="password"
        onChange={(e) => {
          setFormData((prev) => {
            return { ...prev, password: e.target.value };
          });
        }}
      />
      {loading ? (
        <button className="bg-[#ffffff1a] rounded-lg py-2 flex justify-center items-center">
          <l-ring
            size="20"
            stroke="3"
            bg-opacity="0"
            speed="1.5"
            color="white"
          ></l-ring>
        </button>
      ) : (
        <button
          className="py-2 px-3 bg-[#ffffff1a] rounded-lg"
          onClick={() => {
            setLoading(true);
            handleLogin();
          }}
        >
          Login
        </button>
      )}
      <div className="flex items-center gap-2">
        <p className="text-xs">create am account</p>
        <Link
          to={"/signup"}
          className="text-xs p-1 px-2 rounded-md bg-[#ffffff1a]"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
