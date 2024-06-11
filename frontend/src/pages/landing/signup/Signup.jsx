import React, { useState } from "react";
import { makePostRequest } from "../../../apis/makePostRequest";
import { backendUrl } from "../../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../../../store/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    const userData = await makePostRequest(`${backendUrl}/user/signup`, {
      username: formData.username,
      password: formData.password,
    });
    console.log(userData);
    setLoading(false);
    if (userData.success === true) {
      localStorage.setItem("access_token", userData.data.token);
      toast.success("Login success", {
        duration: 4000,
        position: "bottom-right",
        // Customizing the toast with Tailwind CSS classes
        className: "toast-success",
        // Or you can use a custom icon
        icon: "✔️",
      });
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
            handleSignup();
          }}
        >
          Sign up
        </button>
      )}
      <div className="flex items-center gap-2">
        <p className="text-xs">already a user then</p>
        <Link
          to={"/login"}
          className="text-xs p-1 px-2 rounded-md bg-[#ffffff1a]"
        >
          login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
