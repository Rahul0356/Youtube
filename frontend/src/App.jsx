import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./components/Test";

// Lazily load the components
const Homepage = lazy(() => import("./components/Homepage"));
const VideoPlayer = lazy(() => import("./components/VideoPlayer"));
const Form = lazy(() => import("./components/Form"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const ChannelView = lazy(() => import("./components/ChannelView"));
const NotFound = lazy(() => import("./components/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/video/:id" element={<VideoPlayer />} />
          <Route path="/form" element={<Form />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/channel/:id" element={<ChannelView />} />
          <Route path="/videos/:id" element={<Test />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
