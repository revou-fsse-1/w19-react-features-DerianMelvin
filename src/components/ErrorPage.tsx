import { Link } from "react-router-dom";
import { AuthHeader } from "./auth/AuthHeader";

export const ErrorPage = () => {
  return (
    <>
      <AuthHeader />
      <section className="flex flex-col items-center -mt-11 pt-16 rounded-t-[2rem] bg-[#1A5BB7]">
        <div className="w-4/5 min-w-fit max-w-xl flex flex-col items-center gap-6 py-8 px-4 rounded-[2rem] bg-slate-50">
          <h1 className="text-9xl text-gray-400">404</h1>
          <h2 className="text-4xl">Oopsie!</h2>
          <p>The page you're looking for isn't here</p>
          <Link
            to="/"
            className="px-6 py-3 rounded-lg text-white text-xl font-semibold bg-green-700"
          >
            <span>Go Back</span>
          </Link>
        </div>
      </section>
    </>
  );
};
