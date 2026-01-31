import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";  
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminLayout from './components/admin/AdminLayout';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUser';
import AdminAddProduct from './pages/AdminAddProduct';


//  SECURITY PROTECTOR COMPONENT
const AdminRoute = ({ children }) => {
  // We check localStorage for user data (saved during Login)
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  // If user is logged in AND is an admin, show the page
  // Otherwise, kick them back to the login page
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
    
      <Routes>
        {/* SHOP ROUTES */}
        <Route path="/" element={<div style={{padding: "40px"}}><h1>Welcome to PlayGear Nepal</h1></div>} />
        <Route path="/" element={<HomePage />} index />
        <Route path="/products" element={<div style={{padding: "40px"}}><Products /></div>} /> 
        <Route path="/login" element={<div style={{padding: "40px"}}><h1>Login / Register</h1></div>} />
        <Route path="/product/:id" element={<div style={{padding: "40px"}}><ProductDetail /></div>} />
        <Route path="/cart" element={<div style={{padding: "40px"}}><Cart /></div>} />

        {/* ADMIN ROUTES  */}
        <Route path="/admin" element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        } />
        
        <Route path="/admin/products" element={
          <AdminLayout>
            <AdminProducts />
          </AdminLayout>
        } />

        <Route path="/admin/orders" element={
          <AdminRoute>
            <AdminLayout><AdminOrders /></AdminLayout>
          </AdminRoute>
        } />

        <Route path="/admin/users" element={
          <AdminRoute>
            <AdminLayout><AdminUsers /></AdminLayout>
          </AdminRoute>
        } />
        
        <Route path="/admin">
           <Route path="addproduct" element={<AdminAddProduct />} />
           </Route> 
      </Routes>
    </Router>
  );
}

export default App;