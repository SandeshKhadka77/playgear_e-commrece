import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";  
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <Router>
      <Navbar />
    
      <Routes>
        {/* SHOP ROUTES */}
        <Route path="/" element={<div style={{padding: "40px"}}><h1>Welcome to PlayGear Nepal</h1></div>} />
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
      </Routes>
    </Router>
  );
}

export default App;