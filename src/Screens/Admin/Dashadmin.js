import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Publisher from './Publisher';
import Category from './Category';

const Dashadmin = () => {
    const adSignIn = useSelector((store) => store.adminSignIn)

    console.log(adSignIn)

    return (
        <div>

            {!adSignIn.logged && (
                <div>
                    <h2 className="text-center">You are not logged in!</h2>
                    <hr />
                </div>)}
            {adSignIn.logged && (
                <div>
                    <br />
                    <h2 className="text-center" style={{ fontFamily: 'Ubuntu', color: '#BD4B4B' }}>Welcome {adSignIn.aname}</h2>
                    <br />
                    <div className="row"  >
                        <div className="col-md-2" style={{ marginLeft: 10 }} >
                            <div className="col-md-12">
                                <table className="table table-hover table-bordered pallette">
                                    <tbody>
                                        <tr><td> <Link to="/book" style={{ textDecoration: 'none', color: '#000' }}><strong><a>View Books</a></strong></Link></td></tr>
                                        <tr><td> <Link to="/author" style={{ textDecoration: 'none', color: '#000' }}><strong><a >View Authors</a></strong></Link></td></tr>
                                        <tr><td><Link to="/publisher" style={{ textDecoration: 'none', color: '#000' }}><strong><a>View Publishers</a></strong></Link></td></tr>
                                        <tr><td> <Link to="/category" style={{ textDecoration: 'none', color: '#000' }}><strong><a>View Categories</a></strong></Link></td></tr>
                                        <tr><td><Link to="/searchcust" style={{ textDecoration: 'none', color: '#000' }}><strong><a>Customer order status</a></strong></Link></td></tr>
                                        <tr><td> <Link to="/signupdelivery" style={{ textDecoration: 'none', color: '#000' }}><strong><a>Register Delivery Man</a></strong></Link></td></tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="col-md-8" style={{
                            backgroundsize: 100, width: 1200, height: 700,

                            backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-QXcZMm78XJGKHOQ0MKohqeIUKnkY_7fNWw&usqp=CAU")`
                        }}>
                            {/* <img src="" style = {{ height:400 ,width:400}}></img> */}
                        </div>
                    </div>

                    {/* <Link to="/author"><a>Author</a></Link>
                <br></br>
                <Link to="/publisher"><a>Publisher</a></Link>
                <br></br>
                <Link to="/category"><a>Category</a></Link>
                <br></br>
                <Link to="/book"><a>Books</a></Link> */}
                </div>
            )}

        </div>
    )
}

export default Dashadmin
