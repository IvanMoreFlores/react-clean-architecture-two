import { Route, Routes } from "react-router";
import "./App.css";
import DetailPage from "./pages/detail";
import PageHome from "./pages/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageHome />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="*" element={<PageHome />} />
    </Routes>
  );
}

export default App;
