import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import CustomerPage from './pages/Customers/CustomersPage';
import LandingPage from './pages/LandingPage';
import SupplierDashboard from './pages/Suppliers/SupplierDashboard';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/suppliers" element={<SupplierDashboard />} />
        {/* Add a default route if needed */}
        <Route path="/" element={<LandingPage />} />{" "}
        {/* or whichever page you want as default */}
      </Routes>
    </div>
  );
}

export default App;