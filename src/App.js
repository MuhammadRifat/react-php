import React, { createContext, Suspense, useState } from "react";
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
const DefaultLayout = React.lazy(() => import("./Admin/layout/DefaultLayout"));

export const userContext = createContext();

function App() {
  const [dataContainer, setDataContainer] = useState({sidebarShow: true});

  return (
    <userContext.Provider value={[dataContainer, setDataContainer]}>
      <Router>
        <Suspense fallback={<AppSkeleton />}>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<DefaultLayout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </Suspense>
      </Router>
    </userContext.Provider>
  );
}

export default App;
