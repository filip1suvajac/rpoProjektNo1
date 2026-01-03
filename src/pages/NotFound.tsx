import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#1A2C38] text-white p-8">
      <h1 className="text-5xl font-bold mb-4">Opa!</h1>
      <p className="text-xl mb-6">Imaš napačen naslov ...</p>
      <Link
        to="/"
        className="px-6 py-3 bg-teal-600 rounded-md text-white font-semibold hover:bg-teal-700"
      >
        Idi na pravi naslov
      </Link>
    </div>
  );
}
