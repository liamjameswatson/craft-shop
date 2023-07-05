import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import "./App.css";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

function App() {
  return (
    <Router>
      <RenderRoutes />
    </Router>
  );
}

function RenderRoutes() {
  const location = useLocation();

  // Check if the current route is the login page
  const isLoginPage = location.pathname === "/login";

  // Render the Navbar and sidebar only if the current route is not the login page
  const renderNavbar = !isLoginPage && <Navbar />;
  const renderSidebar = !isLoginPage && <Sidebar />;

  let isAdmin = false;
  try {
    const localStorageData = localStorage.getItem("persist:root");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      const user = JSON.parse(parsedData.user);
      if (
        user &&
        user.currentUser &&
        user.currentUser.otherInfo.role === "admin"
      ) {
        isAdmin = true;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      {renderNavbar}
      <div className="container">
        {renderSidebar}
        <Routes>
          {isAdmin ? (
            <>
              <Route exact path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
            </>
          ) : (
            <Route path="/login" element={<Login />} />
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
