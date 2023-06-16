import { useNavigate } from "react-router-dom";

export const FetchError = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col items-center justify-center gap-5 text-center">
      <h2 className="text-9xl font-semibold text-rose-300">ERROR</h2>
      <p className="text-2xl">Unable to fetch data</p>
      <button
        onClick={() => navigate("../dashboard")}
        className="px-6 py-3 rounded-lg text-white text-xl font-semibold bg-green-700"
      >
        <span>Go Back</span>
      </button>
    </div>
  );
};
