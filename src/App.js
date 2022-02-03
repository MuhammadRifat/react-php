import React, { Suspense } from "react";
import { Placeholder } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AppSkeleton from "./components/skeletons/AppSkeleton";

const Home = React.lazy(() => import("./pages/Home/Home"));
const About = React.lazy(() => import("./pages/About/About"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  return (
    <Router>
      <Suspense fallback={<AppSkeleton />}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </Suspense>
    </Router>
  );
}

export default App;
