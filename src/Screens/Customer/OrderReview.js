import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { emptyCartAction, removeFromCartAction } from '../../Actions/cartAction';
import { planAction } from '../../Actions/userAction';
import { url } from '../../Common/constants';
import { toast } from 'react-toastify';

const OrderReview = () => {
    const custSignIn = useSelector((store) => store.custSignIn)
    const plan = useSelector((store) => store.plan)
    const cart = useSelector(store => store.cart)
    const dispatch = useDispatch()
    const history = useHistory()

    const [address, setAddress] = useState({})
    const [check, setCheck] = useState(true)
    const [order, setOrder] = useState(false)

    // if(cart.length === 0){
    //     history.push("/cat-books")
    // }

    useEffect(()=>{

        axios.get(url + '/customer/getAddress' + `/${custSignIn.uid}`).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setAddress((result.data))
                console.log(result.data)
                console.log(address)
            } else {
                setCheck(false)
            }
        })

        axios.get(url + "/plans" + `/${custSignIn.uid}`).then((response) => {
            const result = response.data;
            if (result.status == "success") {
                dispatch(planAction(result.data))
                setOrder((true))
                console.log("plan chekc in plan axios 1" + order)
            } else {
            }
        })
    },[])

    const removeFromCart = (c) => {
        dispatch(removeFromCartAction(c))
    }

    const orderBook = () => {
        
        console.log("2")
        if(order){
        if(check){
        if(cart.length<=plan.pblimit){
        const list = cart.map((c)=> c.bId)
        const data = { bookId: list, orders: { uid: custSignIn.uid, ostatus: "ordered"}}
        console.log(data)
        console.log("plan details" + plan.pblimit)
        axios.post(url + '/order', data)
            .then((response) => {
                const result = response.data
                if (result.status === 'success') {
                    alert('order placed')
                    dispatch(emptyCartAction())
                    history.push('/home')
                }else if(result.status === 'other'){
                    toast.warning('You will be able to order again after processing current order')
                }
                else {
                    toast.error('error while placing order')
                }
            })}
            else{
                toast.warning(`You have added ${cart.length} books! You can order ${plan.pblimit} books as per your plan.`)
            }
        }else{
            toast.warning("please add address first")
        }
        }else{
            console.log("3")
            alert("please purchase plan first")
            history.push("/buyplan")
        }
    }
    

    return (
        <div>
            { cart.length>0 && (
                <div>
            <div className="row">
                <div className="col-md-7 Block parent-block">
                    <div className="table-container">
                        <table border="1px solid gray" className="table table-hover bordered" style={{ margin:"40px 40px 20px 20px"}}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((c) => {
                                    return (
                                        <tr>
                                            <td>{c.bname}</td>
                                            <td>{c.authorName}</td>
                                            <td><button
                                                onClick={() => {
                                                    removeFromCart(c)
                                                }}
                                                className="btn btn-warn btn-sm">
                                                Remove
                                            </button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-md-5">
                    <h5 className="text-center">Address</h5>
                    <hr />
                    
                        {check && (
                        
                            <div className="col-md-6 col-sm-6 col-xs-12 order-card">
                                <div className="card parent-block">
                                    <div className="card-body">
                                        <div className="card-title"> <h5>Address is</h5> </div>
                                        <div className="card-text">
                                            <h6>{address.uaddr}</h6>
                                            <span>{address.ucity}</span>
                                            <span className="NextBtn fs-6">-</span>
                                            <span className="NextBtn">{address.upinCode}</span>
                                            <br />
                                            <span>{address.ustate}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} 
                        {!check && (
                            <div className="col-md-6 col-sm-6 col-xs-12 order-card">
                                <div className="card parent-block">
                                    <div className="card-body">
                                        <div className="card-title"> <h5>please add address</h5> </div>
                                        <div className="card-text">
                                            <Link to="/edit"><a>add address</a></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
                </div>
            <div>
                <button onClick={orderBook} className="btn btn-lg btn-css">Order now</button>
            </div>
            </div>
            )
            }
            {
                cart.length ===0 && (
                    <div>
                        <center>
                    <br />
                            <h2 style={{ fontFamily: 'Ubuntu', color: '#BD4B4B' }}>Nothing in cart!</h2>
                        </center>
                    </div>
                )
            }
        </div>
    )
}

export default OrderReview
