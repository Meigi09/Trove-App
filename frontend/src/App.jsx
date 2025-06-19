import React from 'react';

import LoginPage from './pages/Auth/Login';
import SignupPage from './pages/Auth/Signup';
import CustomerPage from './pages/Customers/CustomersPage';
import SupplierDashboard from './pages/Suppliers/SupplierDashboard';

function App() {
  return (
    <div>
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
      {/* <CustomerPage/> */}
      <SupplierDashboard/>
    </div>
  );
}

export default App;