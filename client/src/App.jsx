import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Trash from "./pages/Trash";

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#C0E4FF] text-gray-900">
        {/* Sidebar */}
        <Navigation />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pt-16"> {/* pt-16 makes space for navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/trash" element={<Trash />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
