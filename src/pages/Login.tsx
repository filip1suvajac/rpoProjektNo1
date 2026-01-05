/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();


  const { login } = useAuth();

  const handleLogin = async () => {
    try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
      if (error) setError(error.message);
      else setError(null);
    } catch (err) {
      setError("Napaka pri prijavi");
    }
    navigate("/")
  };

  return (
    <div className="flex justify-center items-center pb-20 pt-32 bg-[#1A2C38]">
      <div className="bg-[#0F212E] w-[600px] rounded-xl border border-white/20 p-8 flex flex-col gap-6">
        <h2 className="text-white font-bold text-2xl">Prijava</h2>

        <input
          type="text"
          placeholder="E-naslov ali uporabniško ime"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#0F212E] border border-slate-600 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="password"
          placeholder="Geslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#0F212E] border border-slate-600 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="bg-teal-600 text-white font-bold py-4 text-lg rounded-md hover:bg-teal-700 transition"
        >
          Prijava
        </button>
      </div>
    </div>
  );
}

export default Login;
