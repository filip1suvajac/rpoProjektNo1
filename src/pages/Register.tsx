function Register() {
  return (
    <div className="flex justify-center items-center h-screen bg-slate-700">
      {/* center block */}
      <div className="bg-slate-800 w-[800px] rounded-xl shadow-2xl">
        {/* top bar */}
        <div className="bg-slate-800 rounded-t-xl p-8 flex items-center gap-3">
          {/* logo za enkrat prazno */}
          <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
          {/* app name */}
          <h2 className="text-white font-bold text-3xl">Register</h2>
        </div>

        {/* body */}
        <div className="p-10 flex flex-col gap-8">
          {/* email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-3 font-medium text-gray-300 text-base"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="bg-slate-900 border border-slate-600 rounded-md p-5 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* username */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="mb-3 font-medium text-gray-300 text-base"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="bg-slate-900 border border-slate-600 rounded-md p-5 text-white text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-1 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* repeat password */}
          <div className="flex flex-col">
            <label
              htmlFor="repeat-password"
              className="mb-1 font-medium text-gray-700"
            >
              Repeat Password
            </label>
            <input
              type="password"
              id="repeat-password"
              placeholder="Repeat your password"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* date of birth */}
          <div className="flex flex-col">
            <label
              htmlFor="date-of-birth"
              className="mb-1 font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="date-of-birth"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>

          {/* register button */}
          <button className="bg-gray-500 text-white font-bold py-2 rounded-md mt-4 hover:bg-gray-600 transition">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
