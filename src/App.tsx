import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;