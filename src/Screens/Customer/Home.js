import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { url } from '../../Common/constants';
import axios from 'axios'
import Categories from './CatBooks';
import Cards from './../../Components/Cards';


const Home = () => {
    const custSignIn = useSelector((store) => store.custSignIn)
    const [categoryList, setCategoryList] = useState([])

    console.log(custSignIn)
    const history = useHistory()

    const dispatch = useDispatch()

    useEffect(() => {

        axios.get(url + '/categories').then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setCategoryList(result.data)
                dispatch({
                    type: "category-list",
                    payload: result.data
                })
            } else {
                alert('error while fetching list')
            }
        })
    }, [])

    const onSelect = (category) => {
        console.log(category)
        console.log(category)
        dispatch({
            type: "category-select",
            payload: category,
        })
        history.push("/cat-books")
    }




    return (
        <center>
            {/* <h3>welcome to Home page</h3> */}
            {!custSignIn.logged && (
                <div>
                    <center>
                    <br></br>
                    <br></br>
                    <marquee className="marq" direction = "left" loop="" >
                        <div className="geek1"><h2>Welcome to BookNook !</h2></div>
                    </marquee>    
                    </center>
                    <br></br>
                    <br></br>
                    <Cards />
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
                )}
            {custSignIn.logged && (
                <div>
                    <br />
                    <h2 className="text-center" style={{ fontFamily: 'Ubuntu', color: '#BD4B4B' }}>welcome {custSignIn.uname}</h2>
                    <br />
                    <div className="row">
                    <div className="col-md-10 col-sm-8 col-xs-12" >
                    {
                        categoryList.length > 0 && categoryList.map(c => {
                            return (
                                <div className="col-md-5 col-sm-6 col-xs-12 myCardElement home-card" >
                                    <div className="card" onClick={() => { onSelect(c) }}>
                                        <div className="card-body text-center">

                                            <div className="row">
                                                <div className="col-md-9">
                                                    <h5 className="cat-card-title">
                                                        {c.catname}
                                                    </h5>
                                                </div>

                                                <div className="col-md-3">
                                                    <span className="vertical-aligner"></span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-chevron-right NextBtn" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                                                    </svg>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                    <div className="col-md-2 col-sm-4 col-xs-12">
                        <div className="list-group" style={{width:"80%"}}>
                            <Link to="/edit">
                                <a className="list-group-item list-group-item-action">edit profile</a>
                            </Link>
                            <Link to="/changePassword">
                                <a className="list-group-item list-group-item-action">change password</a>
                            </Link>
                                <Link to="/buyplan">
                                <a className="list-group-item list-group-item-action">Buy a plan</a>
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
            )
            }
        </center>
    )
}

export default Home
