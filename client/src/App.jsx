import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";  
import Cart from './pages/Cart';
import HomePage from './pages/homepage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminLayout from './components/admin/AdminLayout';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUser';
import AdminAddProductPage from './pages/AdminAddProductPage';
import AdminEditProductPage from './pages/AdminEditProductPage';
import LoginPage from './pages/LoginPage';
import PoliciesPage from './pages/PoliciesPage';
import ContactPage from './pages/ContactPage';
import MyOrdersPage from './pages/MyOrdersPage';
import WishlistPage from './pages/WishlistPage';
import Footer from './components/Footer';
import './index.css';


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

      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/contact" element={<ContactPage />} />

        {/* ADMIN ROUTES  */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout><AdminDashboard /></AdminLayout>
          </AdminRoute>
        } />
        
        <Route path="/admin/products" element={
          <AdminRoute>
            <AdminLayout><AdminProducts /></AdminLayout>
          </AdminRoute>
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
        
          <Route path="/admin/addproduct" element={
            <AdminRoute>
              <AdminLayout><AdminAddProductPage /></AdminLayout>
            </AdminRoute>
          } />

          <Route path="/admin/products/:id/edit" element={
            <AdminRoute>
              <AdminLayout><AdminEditProductPage /></AdminLayout>
            </AdminRoute>
          } />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;