import "./App.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/Register";
import Basket from "./pages/Basket";
import LoginPage from "./pages/LoginPage";
// import CategoryPage from "./pages/Products/:category";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        {/* <Route path="/products/:category" element={<CategoryPage />} /> */}
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
