import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./constants/style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import PanelistHistory from "./pages/user/side-nav/PanelistHistory";

// Lazy Load Components
const SignUp = lazy(() => import("./pages/user/SignUp"));
const Login = lazy(() => import("./pages/user/Login"));
const PanelistLogin = lazy(() => import("./pages/panelist/PanelistLogin"));
const UserLanding = lazy(() => import("./pages/user/UserLanding"));
const Landing = lazy(() => import("./pages/Landing"));
const PanelistLanding = lazy(() => import("./pages/panelist/PanelistLanding"));
const CreatePoll = lazy(() => import("./pages/panelist/side-nav/CreatePoll"));
const PollStatus = lazy(() => import("./pages/panelist/side-nav/PollStatus"));
const VoteCount = lazy(() => import("./pages/panelist/side-nav/VoteCount"));
const AddPanelist = lazy(() => import("./pages/admin/side-nav/AddPanelist"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLanding = lazy(() => import("./pages/admin/AdminLanding"));
const ActivePanelist = lazy(() =>
  import("./pages/admin/side-nav/ActivePanelist")
);
const ActivePolls = lazy(() => import("./pages/admin/side-nav/ActivePolls"));
const AddByPanelist = lazy(() =>
  import("./pages/panelist/side-nav/AddByPanelist")
);
const UserInfo = lazy(() => import("./pages/admin/side-nav/UserInfo"));

// Private Route for User
const PrivateUserRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

// Private Route for Panelist
const PrivatePanelistRoute = ({ element }) => {
  const panelistToken = localStorage.getItem("panelist_token");
  return panelistToken ? element : <Navigate to="/panelist/login" replace />;
};

const App = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: panelistLoading } = useSelector((state) => state.user);
  const { loading: userLoading } = useSelector((state) => state.panelist);
  const { loading: pollLoading } = useSelector((state) => state.poll);
  const isLoading =
    authLoading || panelistLoading || userLoading || pollLoading;

  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        {/* Global Loader */}
        {isLoading && (
          <div className="loader-wrapper">
            <span className="loader"></span>
          </div>
        )}

        {/* Suspense Wrapper for Lazy Loading */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/panelist/login" element={<PanelistLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Private User Routes */}
            <Route
              path="/user/:id"
              element={<PrivateUserRoute element={<UserLanding />} />}
            />
            <Route
              path="/user/panelist-history"
              element={<PrivateUserRoute element={<PanelistHistory />} />}
            />

            {/* Private Panelist Routes */}
            <Route
              path="/panelist/:id"
              element={<PrivatePanelistRoute element={<PanelistLanding />} />}
            />
            <Route
              path="/panelist/:id/create-poll"
              element={<PrivatePanelistRoute element={<CreatePoll />} />}
            />
            <Route
              path="/panelist/:id/poll-status"
              element={<PrivatePanelistRoute element={<PollStatus />} />}
            />
            <Route
              path="/panelist/:id/vote-count"
              element={<PrivatePanelistRoute element={<VoteCount />} />}
            />
            <Route
              path="/panelist/:id/add-panelist"
              element={<PrivatePanelistRoute element={<AddByPanelist />} />}
            />

            {/* Admin Routes */}
            <Route path="/add-panelist" element={<AddPanelist />} />
            <Route path="/panelist-history" element={<ActivePanelist />} />
            <Route path="/admin" element={<AdminLanding />} />
            <Route path="/admin/poll-info" element={<ActivePolls />} />
            <Route path="/admin/user-info" element={<UserInfo />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
