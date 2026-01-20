import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";  
import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: "40px" }}>
        <Routes>
          <Route path="/" element={<h1>Welcome to PlayGear Nepal</h1>} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/login" element={<h1>Login / Register</h1>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;