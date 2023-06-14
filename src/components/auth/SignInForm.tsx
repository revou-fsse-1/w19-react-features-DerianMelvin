export const SignInForm = () => {
  return (
    <section className="flex flex-col items-center -mt-11 pt-16 rounded-t-[2rem] bg-[#1A5BB7]">
      <div className="w-3/5 min-w-fit max-w-lg flex flex-col items-center gap-6 py-8 px-4 rounded-[2rem] bg-slate-50">
        <h2 className="text-4xl font-semibold">Sign In</h2>

        <form className="w-4/5 flex flex-col gap-6">
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
            />
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
            />
          </div>
          <div className="flex flex-col">
            <button
              type="submit"
              className="px-4 py-3 rounded-lg text-white text-lg font-semibold bg-[#19222E]"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center">
          <p>Don't have an account yet?</p>
          <a href="#" className="text-lg text-sky-600">
            Sign Up
          </a>
        </div>
      </div>
    </section>
  );
};
