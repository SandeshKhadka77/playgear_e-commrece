import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ padding: "40px" }}>
        <Routes>
          <Route path="/" element={<h1>Welcome to PlayGear Nepal</h1>} />
          <Route path="/products" element={<h1>Products List - Sports, Gym, Gaming</h1>} />
          <Route path="/login" element={<h1>Login / Register</h1>} />
          <Route path="/cart" element={<h1>Your Shopping Cart</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;