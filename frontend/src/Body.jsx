import React, { useEffect, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Drive from "./pages/drive/Drive";
import Cover from "./pages/landing/Cover";
import Login from "./pages/landing/login/Login";
import Signup from "./pages/landing/signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import { makeGetRequest } from "./apis/makeGetRequest";
import { backendUrl } from "./utils/constants";
import { setUser } from "./store/userSlice";
import Folder from "../src/pages/folder/Folder";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);
  const [loading, setLoading] = useState(true);

  console.log(user);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to={"drive"} /> : <Navigate to={"/login"} />,
    },
    {
      path: "/drive",
      element: user ? <Drive /> : <Navigate to={"/login"} />,
    },
    {
      path: "/drive/*",
      element: <Folder />,
    },
    {
      path: "/login",
      element: user ? (
        <Navigate to={"/drive"} />
      ) : (
        <Cover>
          <Login />
        </Cover>
      ),
    },
    {
      path: "/signup",
      element: user ? (
        <Navigate to={"/drive"} />
      ) : (
        <Cover>
          <Signup />
        </Cover>
      ),
    },
  ]);

  async function auth() {
    const data = await makeGetRequest(`${backendUrl}/user/auth`);

    if (data.success === true) {
      setLoading(false);
      dispatch(setUser(data.data));
    }
  }

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      auth();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default Body;