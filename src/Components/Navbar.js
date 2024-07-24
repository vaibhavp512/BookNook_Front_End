import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../Actions/userAction';
import { emptyCartAction } from './../Actions/cartAction';
import { signoutAdmin } from '../Actions/adminAction';

const Navbar = () => {

    const check = useSelector((store) => store.custSignIn)
    const checka = useSelector((store) => store.adminSignIn)


    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(signout())
        dispatch(signoutAdmin())
        dispatch(emptyCartAction())
    }

    return (
        <div>
            <nav class="navbar navbar-static-top navbar-expand-lg navbar-dark">
        <img src="https://www.pinclipart.com/picdir/big/577-5778485_transparent-reading-book-clipart-girl-reading-book-clipart.png" alt="logo" height="80px" width="55px" className="logo" style={{marginLeft: "2%"}}></img>
        <a class="navbar-brand" href="/home">BookNook</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">

            <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                {(check.logged && check.urole==="customer") && (
                    <Link className="nav-link" to="/home">
                        Home
                    </Link>
                )}
                {(check.logged && check.urole==="delivery") && (
                    <Link className="nav-link" to="/delivery">
                        Home
                    </Link>
                )}
                {checka.logged && (
                    <Link className="nav-link" to="/dashadmin">
                        Home
                    </Link>
                )}
                {(!check.logged && !checka.logged)&&(
                    <Link className="nav-link" to="/home">
                        Home
                    </Link>
                )}
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/aboutus">
                    About us
                </Link>
            </li>
            <li class="nav-item">
                {check.urole==="customer" && (
                    <Link className="nav-link" to="/Plans">
                        Plans
                    </Link>
                )}
            </li>
            <li class="nav-item">
                {(check.logged && check.urole==="customer")&&(
                <Link className="nav-link" to="/cart">
                    View cart
                </Link>
                )}
            </li>
            <li class="nav-item">
                {(check.logged && check.urole==="customer")&&(
                <Link className="nav-link" to="/orders">
                    My Orders
                </Link>
                )}
            </li>
            <li class="nav-item">
                {check.urole === "delivery" && (
                    <Link className="nav-link" to="/deliveries">
                        My deliveries
                    </Link>
                )}
            </li>
            <li class="nav-item">
                {check.logged || checka.logged ? (

                    <Link className="btn btn-outline-light btn-lg button-class" to="/home">
                        <a onClick={signOut} >Sign Out</a>
                    </Link>
                    ) : (
                    <Link className="btn btn-outline-light btn-lg button-class" to="/signin">
                        Sign In
                    </Link>
                )}
            </li>
            </ul>
        </div>
        </nav>
        </div>
    )
}

export default Navbar
