import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loading } from "../Loading";
import axios from "axios";
import { AuthHeader } from "./AuthHeader";

export const SignInForm = () => {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });
  const [inputValid, setInputValid] = useState({
    email: false,
    password: false,
  });
  const [displayError, setDisplayError] = useState({
    email: false,
    password: false,
  });
  const [loading, setLoading] = useState(false);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!inputForm.email.match(emailRegex)) {
      setInputValid((prev) => ({
        ...prev,
        email: false,
      }));
      setDisplayError((prev) => ({
        ...prev,
        email: true,
      }));
    } else {
      setInputValid((prev) => ({
        ...prev,
        email: true,
      }));
      setDisplayError((prev) => ({
        ...prev,
        email: false,
      }));
    }
  };

  const validatePassword = () => {
    if (inputForm.password.length < 5) {
      setInputValid((prev) => ({
        ...prev,
        password: false,
      }));
      setDisplayError((prev) => ({
        ...prev,
        password: true,
      }));
    } else {
      setInputValid((prev) => ({
        ...prev,
        password: true,
      }));
      setDisplayError((prev) => ({
        ...prev,
        password: false,
      }));
    }
  };

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (!inputValid.email || !inputValid.password) {
      console.log("Not valid");
    } else {
      setLoading(true);
      signInUser();
    }
  };

  const signInUser = async () => {
    try {
      const response = await axios.post(
        "https://mock-api.arikmpt.com/api/user/login",
        {
          email: inputForm.email,
          password: inputForm.password,
        }
      );

      localStorage.setItem("token", response.data.data.token);
      setLoading(false);

      navigate("/dashboard");
    } catch (error: any) {
      console.log(error.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
      <section className="flex flex-col items-center -mt-11 pt-16 rounded-t-[2rem] bg-[#1A5BB7]">
        <div className="w-3/5 min-w-fit max-w-lg flex flex-col items-center gap-6 py-8 px-4 rounded-[2rem] bg-slate-50">
          <h2 className="text-4xl font-semibold">Login</h2>

          <form className="w-4/5 flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-lg">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="myemail@gmail.com"
                className="px-3 py-2 rounded-lg border-2 border-gray-300"
                onChange={(e) => handleFormInput(e)}
                onBlur={() => validateEmail()}
              />
              <span
                className={`text-rose-600 text-sm ${
                  !displayError.email && "invisible"
                }`}
              >
                Invalid email
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                className="px-3 py-2 rounded-lg border-2 border-gray-300"
                onChange={(e) => handleFormInput(e)}
                onBlur={() => validatePassword()}
              />
              <span
                className={`text-rose-600 text-sm ${
                  !displayError.password && "invisible"
                }`}
              >
                Password needs at least 5 characters
              </span>
            </div>

            <div className="flex flex-col mt-3">
              <button
                type="submit"
                className="px-4 py-3 rounded-lg text-white text-lg font-semibold bg-[#19222E]"
                onClick={(e) => handleFormSubmit(e)}
              >
                Login
              </button>
            </div>
            {loading && <Loading />}
          </form>

          <div className="flex flex-col items-center">
            <p>Don't have an account yet?</p>
            <Link to="/register" className="text-lg text-sky-600">
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
