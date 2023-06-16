import { Routes, Route } from "react-router-dom";
import { SignInForm } from "./components/auth/SignInForm";
import { SignUpForm } from "./components/auth/SignUpForm";
import { ErrorPage } from "./components/ErrorPage";
import { Dashboard } from "./components/dashboard/Dashboard";
import { EditData } from "./components/dashboard/EditData";
import { AuthRoute } from "./components/AuthRoute";
import { AddData } from "./components/dashboard/AddData";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1A5BB7]">
      <div className="w-full flex flex-col">
        <Routes>
          <Route path="/" element={<AuthRoute />} />
          <Route path="/login" element={<SignInForm />} />
          <Route path="/register" element={<SignUpForm />} />
          <Route path="*" element={<ErrorPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:id" element={<EditData />} />
            <Route path="/dashboard/add" element={<AddData />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
