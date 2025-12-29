function Login() {
  return (
    <div className="flex justify-center items-center pb-20 pt-32 bg-[#1A2C38]">
      {/* center block */}
      <div className="bg-[#0F212E] w-[600px] rounded-xl border border-white/20">
        {/* top bar */}
        <div className="bg-[#1A2C38] rounded-t-xl p-6 flex items-center gap-3">
          {/* app name */}
          <h2 className="text-white font-bold text-2xl">Prijava</h2>
        </div>

        {/* body */}
        <div className="p-8 flex flex-col gap-8">
          {/* email/username */}
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-3 font-sm text-gray-300 text-base">
              E-naslov ali uporabniško ime <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="email"
              placeholder="janez.novak@gmail.com"
              className="bg-[#0F212E] border border-slate-600 rounded-md p-3 text-white text-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="mb-3 font-medium text-gray-300 text-base"
            >
              Geslo <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="..."
              className="bg-[#0F212E] border border-slate-600 rounded-md p-3 text-white text-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* login button */}
          <button className="bg-teal-600 text-white font-bold py-4 text-lg rounded-md mt-4 hover:bg-teal-700 transition">
            Prijava
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
