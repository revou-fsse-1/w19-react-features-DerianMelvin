import { Routes, Route } from "react-router-dom";
import { AuthHeader } from "./components/auth/AuthHeader";
import { SignInForm } from "./components/auth/SignInForm";
import { SignUpForm } from "./components/auth/SignUpForm";
import { ErrorPage } from "./components/ErrorPage";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1A5BB7]">
      <div className="w-full flex flex-col">
        <Routes>
          <Route path="/" element={<AuthHeader />}>
            <Route path="login" element={<SignInForm />} />
            <Route path="register" element={<SignUpForm />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
