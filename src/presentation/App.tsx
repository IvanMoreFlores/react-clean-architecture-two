import { Route, Routes } from "react-router";
import "./App.css";
import DetailPage from "./pages/detail";
import PageHome from "./pages/home";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="*" element={<PageHome />} />
    </Routes>
  );
}

export default App;
