import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "../src/components/SignupPage"; // Adjust the path if needed
import LoginPage from "./components/LoginPage";
import StaffLoginPage from "../src/pages/Stafflogin";
import StaffDashboard from "../src/pages/StaffDashboard"; // Correct import
import Home from "./pages/Home"; // If you have a home page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/staff-login" element={<StaffLoginPage />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} /> {/* Fix this */}
        <Route path="*" element={<h1>404 Not Found</h1>} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;
