import { useNavigate, useParams } from "react-router-dom";
import { DashboardHeader } from "./DashboardHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../Loading";
import { FetchError } from "./FetchError";

type InputFormType = {
  name: string;
  is_active: boolean;
};

type InputValidationType = {
  name: boolean;
};

export const EditData = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
  const [fetchError, setFetchError] = useState(false);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
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
      updateData();
    }
  };

  const fetchCurrentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://mock-api.arikmpt.com/api/category/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setInputForm({
        name: response.data.data.name,
        is_active: response.data.data.is_active,
      });
      setLoading(false);
    } catch (error) {
      setFetchError(true);
      setLoading(false);
    }
  };

  const updateData = async () => {
    try {
      await axios.put(
        "https://mock-api.arikmpt.com/api/category/update",
        {
          ...inputForm,
          name: inputForm.name.trim(),
          id: id,
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

  useEffect(() => {
    fetchCurrentData();
  }, []);

  return (
    <>
      <DashboardHeader />
      <section className="flex flex-col items-center -mt-11 pt-16 rounded-t-[2rem] bg-[#1A5BB7]">
        <div className="w-4/5 max-w-5xl flex flex-col items-left gap-6 py-8 px-10 overflow-auto rounded-[2rem] bg-slate-50">
          {loading ? (
            <Loading />
          ) : fetchError ? (
            <FetchError />
          ) : (
            <>
              <h2 className="text-4xl font-semibold">Edit Data</h2>

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
                    value={inputForm.name}
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
                    checked={inputForm.is_active}
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
                    type="submit"
                    className="px-6 py-3 rounded-lg text-white text-lg font-semibold bg-[#19222E]"
                    onClick={(e) => handleFormSubmit(e)}
                  >
                    Update Data
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
