import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import ErrorPage from "../pages/error/ErrorPage";

const RouterComponent = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello</div>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterComponent;
