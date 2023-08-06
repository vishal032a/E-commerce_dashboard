import React from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import PrivateComponent from "./PrivateComponent";
import Login from "./Login";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import UpdateProduct from "./UpdateProduct";
// import ProductList from './ProductList';
const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <div className="navbar">
        {auth ? (
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/add">Add Product</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logout} to="/login">
                Logout({JSON.parse(auth).name})
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="nav_right">
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        )}
      </div>
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/update/:id" element={<UpdateProduct />} />
          <Route
            path="/profile"
            element={<h1>here is your profile section</h1>}
          />
          <Route path="/logout" element={<h1>logout from here </h1>} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
export default Nav;
