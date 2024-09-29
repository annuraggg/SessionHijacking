import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Attack1 from "./pages/Attack1";
import Attack2 from "./pages/Attack2";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attack1" element={<Attack1 />} />
          <Route path="/attack2" element={<Attack2 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
