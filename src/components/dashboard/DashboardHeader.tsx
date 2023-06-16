import { Logo } from "../Logo";

export const DashboardHeader = () => {
  return (
    <header className="min-w-fit flex items-center justify-between gap-4 px-5 py-5 pb-16 bg-[#19222E]">
      <Logo />
      <span className="text-center text-white font-medium">Hello, USERNAME</span>
      <button className="px-5 py-2 rounded-lg text-lg font-semibold bg-gray-50">
        Logout
      </button>
    </header>
  );
};
