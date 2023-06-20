import { lazy, useEffect, Suspense } from "react";
import "./App.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
// Code Splitting Using Lazy loading Feature of React
const Dashboard = lazy(() =>import('./pages/Dashboard/Dashboard'));
const LandingPage = lazy(() =>import('./pages/LandingPage/LandingPage'));
const SuspenseFallback = lazy(() =>import('./pages/Spinner/Spinner'));
const NotFound = lazy(() =>import('./pages/NotFoundPage/NotFound'));

import ProtectedRoute from "./utils/helpers/ProtectedRoute";
import { useAppSelector } from "./store/hooks/app";
import { userSelector, AuthStateInterface} from "./store/features/Auth/authSlice";


function App() {
  const navigate = useNavigate();
  const {isAuthenticated} = useAppSelector(userSelector) as AuthStateInterface ;
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/management");
    }
  }, [isAuthenticated]);
  
  return (
    <Suspense fallback={<SuspenseFallback />}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute
            redirectPath="/"
            isAuthenticated={isAuthenticated}
            children={<Dashboard />}
          />
        }
      ></Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
  );
}

export default App;
