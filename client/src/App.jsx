import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";  

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: "40px" }}>
        <Routes>
          <Route path="/" element={<h1>Welcome to PlayGear Nepal</h1>} />
          {/* Replace the old placeholder with the real Products component */}
          <Route path="/products" element={<Products />} /> 
          <Route path="/login" element={<h1>Login / Register</h1>} />
          <Route path="/cart" element={<h1>Your Shopping Cart</h1>} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;