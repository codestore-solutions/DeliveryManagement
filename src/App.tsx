import { useEffect } from "react";
import "./App.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard, LandingPage, NotFound } from "./pages";
import ProtectedRoute from "./utils/helpers/ProtectedRoute";
import { useAppSelector } from "./store/hooks/app";
import { userSelector, AuthStateInterface} from "./store/features/Auth/authSlice";
function App() {
  const navigate = useNavigate();
  const {isAuthenticated} = useAppSelector(userSelector) as AuthStateInterface ;
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/");
    }
  }, [isAuthenticated]);

  return (
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
  );
}

export default App;
