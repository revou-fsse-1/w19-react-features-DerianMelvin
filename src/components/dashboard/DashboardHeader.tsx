import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("../");
  };

  return (
    <header className="min-w-fit flex items-center justify-between gap-4 px-5 py-5 pb-16 bg-[#19222E]">
      <div onClick={() => navigate("../dashboard")} className="cursor-pointer">
        <Logo />
      </div>
      <button
        onClick={() => logoutUser()}
        className="px-5 py-2 rounded-lg text-lg font-semibold bg-gray-50"
      >
        Logout
      </button>
    </header>
  );
};
