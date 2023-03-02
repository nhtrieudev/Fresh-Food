import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from "../components/Admin/AddProduct";
import HomeAdmin from "../components/Admin/Home";
import Order from "../components/Admin/Order";
import ProductManagement from "../components/Admin/Product";
import UpdateProd from "../components/Admin/UpdateProd";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HomeUser from "../components/User/Home";
import OrderUser from "../components/User/Order";
import Admin from "../pages/Admin";
import Cart from "../pages/Cart";
import Categories from "../pages/Categories";
import Delivery from "../pages/Delivery";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProdDetail from "../pages/ProdDetail";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import SearchResult from "../pages/SearchResult";
import Account from "../pages/User";
import "./style.scss";

function Layouts() {
    return (
      <>
        <div className="wrapper postion-relative">
          <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/:nameProd" element={<ProdDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/search/:keyword" element={<SearchResult />} />
                <Route path="/categories/:nameCate" element={<Categories />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/account" element={<Account />}>
                  <Route path="" element={<HomeUser />} />
                  <Route path="order" element={<OrderUser />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                  <Route path="" element={<HomeAdmin />} />
                  <Route path="order" element={<Order />} />
                  <Route path="add" element={<AddProduct />} />
                  <Route path="product" element={<ProductManagement />} />
                  <Route path="update/:idProd" element={<UpdateProd />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </>
    );
  }
  
  export default Layouts;
  