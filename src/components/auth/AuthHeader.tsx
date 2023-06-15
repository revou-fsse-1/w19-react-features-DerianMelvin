import { Outlet } from "react-router-dom";
import { Logo } from "../Logo";

export const AuthHeader = () => {
  return (
    <>
      <header className="flex flex-col items-center px-5 py-5 pb-16 bg-[#19222E]">
        <div className="flex items-center gap-4">
          <Logo />
          <h1 className="text-3xl text-[#1371FF] font-semibold">Minicrate</h1>
        </div>
      </header>
      <Outlet />
    </>
  );
};
