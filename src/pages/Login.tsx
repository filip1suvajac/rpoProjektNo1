import React from "react";

function Login() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* center block */}
      <div className="bg-white w-[400px] rounded-xl shadow-lg">
        {/* top bar */}
        <div className="bg-gray-500 rounded-t-xl p-4 flex items-center gap-2">
          {/* logo za enkrat prazno */}
          <div className="w-8 h-8 bg-white rounded-full"></div>
          {/* app name */}
          <h2 className="text-white font-bold text-lg">MyApp</h2>
        </div>

        {/* body */}
        <div className="p-8 flex flex-col gap-4">
          {/* email/username */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email or username"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
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

          {/* login button */}
          <button className="bg-gray-500 text-white font-bold py-2 rounded-md mt-4 hover:bg-gray-600 transition">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
