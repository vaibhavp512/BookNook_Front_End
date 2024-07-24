import React from 'react'
import {BrowserRouter, Link, Route, Switch} from "react-router-dom"
import AboutUs from './Components/AboutUs';
import Home from './Screens/Customer/Home';
import Plans from './Components/Plans';
import SignUp from './Screens/Customer/SignUp';
import "./App.css";
import ChangePassword from './Screens/Customer/ChangePassword';
import Dashboard from './Components/Dashboard';
import Dashadmin from './Screens/Admin/Dashadmin';
import Navbar from './Components/Navbar';
import SignIn from './Screens/Customer/SignIn';
import SignInAdmin from './Screens/Admin/SignInAdmin';
import CatBooks from './Screens/Customer/CatBooks';
import Footer from './Components/Footer';
import EditProfile from './Screens/Customer/EditProfile';
import OrderReview from './Screens/Customer/OrderReview';
import CustPlan from './Screens/Customer/CustPlan';
import { ToastContainer } from 'react-toastify';
import Order from './Screens/Customer/Order';
import Author from './Screens/Admin/Author';
import AddAuthor from './Screens/Admin/AddAuthor';
import Publisher from './Screens/Admin/Publisher';
import AddPublisher from './Screens/Admin/AddPublisher';
import Category from './Screens/Admin/Category';
import AddCategory from './Screens/Admin/AddCategory';
import Books from './Screens/Admin/Books';
import AddBook from './Screens/Admin/AddBook';
import InfoEdit from './Screens/Admin/InfoEdit';
import SearchCust from './Screens/Admin/SearchCust';
import SignUpDelivery from './Screens/Admin/SignUpDelivery';
import Delivery from './Screens/Delivery Boy/Delivery';
import DeliveriesList from './Screens/Delivery Boy/DeliveriesList';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <ToastContainer />
          <Switch>
            <Route path="/navbar" component={Navbar} />
            <Route path="/home" component={Home} />
            <Route path="/plans" component={Plans} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/changePassword" component={ChangePassword} />
            <Route path="/edit" component={EditProfile} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/dashadmin" component={Dashadmin} />
            <Route path="/signinAdmin" component={SignInAdmin} />
            <Route path="/cat-books" component={CatBooks} />
            <Route path="/cart" component={OrderReview} />
            <Route path="/orders" component={Order} />
            <Route path="/buyplan" component={CustPlan} />

            <Route path="/author" component={Author} />
            <Route path="/addAuthor" component={AddAuthor} />
            <Route path="/publisher" component={Publisher} />
            <Route path="/addPublisher" component={AddPublisher} />
            <Route path="/category" component={Category} />
            <Route path="/addCategory" component={AddCategory} />
            <Route path="/book" component={Books} />
            <Route path="/addBook" component={AddBook} />
            <Route path="/infoedit" component={InfoEdit} />
            <Route path="/searchcust" component={SearchCust} />
            <Route path="/signupdelivery" component={SignUpDelivery} />
            <Route path="/delivery" component={Delivery} />
          <Route path="/deliveries" component={DeliveriesList} />
          </Switch>
          {/* <Footer/> */}
      </BrowserRouter>
    </div>
  )
}

export default App;
