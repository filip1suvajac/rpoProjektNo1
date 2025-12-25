function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-700">
      {/* center block */}
      <div className="bg-slate-800 w-[800px] rounded-xl shadow-2xl">
        {/* top bar */}
        <div className="bg-slate-800 rounded-t-xl p-8 flex items-center gap-3">
          {/* logo za enkrat prazno */}
          <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
          {/* app name */}
          <h2 className="text-white font-bold text-3xl">MyApp</h2>
        </div>

        {/* body */}
        <div className="p-10 flex flex-col gap-8">
          {/* email/username */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-3 font-medium text-gray-300 text-base">
              Email or Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email or username"
              className="bg-slate-900 border border-slate-600 rounded-md p-5 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-3 font-medium text-gray-300 text-base"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="bg-slate-900 border border-slate-600 rounded-md p-5 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* login button */}
          <button className="bg-teal-600 text-white font-bold py-4 text-lg rounded-md mt-4 hover:bg-teal-700 transition">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
