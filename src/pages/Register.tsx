/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import DatePicker from "../components/DatePicker";
import { supabase } from "../supabaseClient";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const [birthDate, setBirthDate] = useState<Date | undefined>();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { login } = useAuth(); // opcijsko, če želiš samodejno login

  const handleRegister = async () => {
    setError(null);

    if (password !== repeatPassword) {
      setError("Gesli se ne ujemata");
      return;
    }

    try {
      // 1️⃣ Registracija v Supabase Auth
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            birth_date: birthDate?.toISOString().split("T")[0],
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      // 2️⃣ Ustvari zapis v tabeli 'profiles'
      if (signUpData?.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: signUpData.user.id,
              username,
              birth_date: birthDate?.toISOString().split("T")[0],
            },
          ]);

        if (profileError) {
          setError(profileError.message);
          return;
        }
      }

      // 3️⃣ Po želji: samodejno prijavi ali preusmeri
      // await login(email, password);
      alert("Uspešna registracija! Preusmerjam na prijavo...");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Prišlo je do napake pri registraciji.");
    }
  };

  return (
    <div className="flex justify-center items-center pb-20 pt-32 bg-[#1A2C38]">
      <div className="bg-[#0F212E] w-[600px] rounded-xl border border-white/20 p-8 flex flex-col gap-6">
        <h2 className="text-white font-bold text-2xl">Registracija</h2>

        <input
          type="email"
          placeholder="E-naslov"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-[#0F212E] border border-slate-600 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="text"
          placeholder="Uporabniško ime"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-[#0F212E] border border-slate-600 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="password"
          placeholder="Geslo"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-[#0F212E] border border-slate-600 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="password"
          placeholder="Ponovi geslo"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="bg-[#0F212E] border border-slate-600 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <div className="flex flex-col gap-3">
          <label className="text-gray-300">
            Datum rojstva <span className="text-red-500">*</span>
          </label>
          <DatePicker value={birthDate} onChange={setBirthDate} />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleRegister}
          className="bg-teal-600 text-white font-bold py-4 text-lg rounded-md hover:bg-teal-700 transition"
        >
          Registracija
        </button>
      </div>
    </div>
  );
}

export default Register;
