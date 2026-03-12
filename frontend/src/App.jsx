import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Test from "./components/Test";

// Lazily load the components
const Homepage = lazy(() => import("./components/Homepage"));
const VideoPlayer = lazy(() => import("./components/VideoPlayer"));
const Form = lazy(() => import("./components/Form"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const ChannelView = lazy(() => import("./components/ChannelView"));
const NotFound = lazy(() => import("./components/NotFound"));

const router = createBrowserRouter(
  [
    { path: "/", element: <Homepage /> },
    { path: "/video/:id", element: <VideoPlayer /> },
    { path: "/form", element: <Form /> },
    { path: "/userprofile", element: <UserProfile /> },
    { path: "/channel/:id", element: <ChannelView /> },
    { path: "/videos/:id", element: <Test /> },
    { path: "*", element: <NotFound /> },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
