import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { useState } from "react";
import axios from "axios";
import { Loading } from "../Loading";

type InputFormType = {
  name: string;
  is_active: boolean;
};

type InputValidationType = {
  name: boolean;
};

export const AddData = () => {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState<InputFormType>({
    name: "",
    is_active: false,
  });
  const [inputValid, setInputValid] = useState<InputValidationType>({
    name: false,
  });
  const [displayError, setDisplayError] = useState<InputValidationType>({
    name: false,
  });
  const [loading, setLoading] = useState(false);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const validateInput = () => {
    if (inputForm.name.length < 3) {
      setInputValid((prev) => ({
        ...prev,
        name: false,
      }));
      setDisplayError((prev) => ({
        ...prev,
        name: true,
      }));
    } else {
      setInputValid((prev) => ({
        ...prev,
        name: true,
      }));
      setDisplayError((prev) => ({
        ...prev,
        name: false,
      }));
    }
  };

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    validateInput();

    if (!inputValid.name) {
      console.log("Not valid");
    } else {
      setLoading(true);
      createNewData();
    }
  };

  const createNewData = async () => {
    try {
      await axios.post(
        "https://mock-api.arikmpt.com/api/category/create",
        {
          ...inputForm,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoading(false);
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error.response.data.errors);
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardHeader />
      <section className="flex flex-col items-center -mt-11 pt-16 rounded-t-[2rem] bg-[#1A5BB7]">
        <div className="w-4/5 max-w-5xl flex flex-col items-left gap-6 py-10 px-10 overflow-auto rounded-[2rem] bg-slate-50">
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => navigate("../dashboard")}
                  className="px-4 py-2 rounded-lg bg-[#1A5BB7]"
                >
                  <svg
                    width="32"
                    height="31"
                    viewBox="0 0 43 42"
                    className="fill-white"
                  >
                    <path d="M39.6665 18.3338H9.87988L22.8932 5.32042C23.9332 4.28042 23.9332 2.57376 22.8932 1.53376C22.6465 1.28655 22.3535 1.09042 22.0309 0.956603C21.7083 0.822786 21.3625 0.753906 21.0132 0.753906C20.664 0.753906 20.3181 0.822786 19.9956 0.956603C19.673 1.09042 19.3799 1.28655 19.1332 1.53376L1.55988 19.1071C1.31267 19.3538 1.11654 19.6468 0.982727 19.9694C0.84891 20.292 0.780029 20.6378 0.780029 20.9871C0.780029 21.3363 0.84891 21.6822 0.982727 22.0048C1.11654 22.3274 1.31267 22.6204 1.55988 22.8671L19.1332 40.4404C19.3801 40.6873 19.6732 40.8831 19.9958 41.0168C20.3183 41.1504 20.6641 41.2191 21.0132 41.2191C21.3624 41.2191 21.7081 41.1504 22.0307 41.0168C22.3532 40.8831 22.6463 40.6873 22.8932 40.4404C23.1401 40.1935 23.3359 39.9004 23.4696 39.5779C23.6032 39.2553 23.6719 38.9096 23.6719 38.5604C23.6719 38.2113 23.6032 37.8655 23.4696 37.543C23.3359 37.2204 23.1401 36.9273 22.8932 36.6804L9.87988 23.6671H39.6665C41.1332 23.6671 42.3332 22.4671 42.3332 21.0004C42.3332 19.5338 41.1332 18.3338 39.6665 18.3338Z" />
                  </svg>
                </button>
                <h2 className="text-4xl font-semibold">Add Data</h2>
              </div>

              <form className="w-full flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-lg">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="..."
                    required
                    className="px-3 py-2 rounded-lg border-2 border-gray-300"
                    onChange={(e) => handleFormInput(e)}
                    onBlur={() => validateInput()}
                  />
                  <span
                    className={`text-rose-600 text-sm ${
                      !displayError.name && "invisible"
                    }`}
                  >
                    Name needs at least 3 characters
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="isActive" className="text-lg">
                    Is Active
                  </label>
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    className="w-8 h-8 text-xl flex items-center justify-center appearance-none border border-slate-300 rounded-md cursor-pointer checked:bg-slate-200 checked:border-transparent after:checked:content-['✔️']"
                    onChange={(e) =>
                      setInputForm((prev) => ({
                        ...prev,
                        is_active: e.target.checked,
                      }))
                    }
                  />
                </div>

                <div className="w-fit flex flex-col mt-5">
                  <button
                    className="px-6 py-3 rounded-lg text-white text-lg font-semibold bg-[#19222E] z-10"
                    onClick={(e) => handleFormSubmit(e)}
                  >
                    Add New Data
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  );
};
