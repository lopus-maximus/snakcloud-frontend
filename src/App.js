import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Layout from "./components/layout";
import Upload from "./components/upload";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithOverlay ele={Login} />} />
        <Route path="/login" element={<LayoutWithOverlay ele={Login} />} />
        <Route path="/signup" element={<LayoutWithOverlay ele={Signup} />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

function LayoutWithOverlay(props) {
  return (
    <div className="relative h-screen">
      <Layout />
      <div className="absolute inset-0 flex items-center justify-center">
        <props.ele />
      </div>
    </div>
  );
}

export default App;
