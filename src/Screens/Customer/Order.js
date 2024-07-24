import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../Common/constants';
import { toast } from 'react-toastify';

const Order = () => {

    const custSignIn = useSelector((store) => store.custSignIn)
    const [orders, setOrders] = useState([])
    const [check, setCheck] = useState(false)
    const [fresh, setFresh] = useState(true)
    const dispatch = useDispatch()

    const returnBook = (order) => {
        if(order.ostatus==="ordered"){
            toast.warning("You cannot return book after ordering")
        }else{
        axios.put(url + "/order" + `/${order.oid}/${"returned"}`).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                getOrder()
            } else {
                toast.error("some error occurred while returning order", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            }
        })}
    }

    const getOrder = () => {
        axios.get(url + "/order" + `/${custSignIn.uid}`).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setOrders((result.data))
                setCheck((true))
            } if (result.status === 'other') {
                <h2>no orders</h2>
                setCheck((false))
            }
        })
    }

    useEffect(() => {
        getOrder()
        
    }, [])

    

    return (
        <div>
            <center>
            {/* <div className="row"> */}
                <div className="col-md-8 col-sm-8 col-xs-12">
                    <table border="1px solid gray" className="table table-hover bordered" style={{marginTop:"30px"}}>
                    <thead>
                        <tr>
                            <th>Order id</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Order Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {check &&
                        orders.length>0 &&
                        orders.map( order =>{
                            return (
                                <tr>
                                    <td>{order.oid}</td>
                                    <td>
                                        {
                                            order.bookCart.map( o => {
                                                return(
                                                    <tr>
                                                        <img src={url + "/" + o.bfront} style={{ width: 45, height: 60, margin:"10px"}}></img>
                                                        {o.bname}
                                                    </tr>
                                                )
                                            })
                                        }
                                    </td>
                                    <td>{order.ostatus}</td>
                                    <td>{order.odate}</td>
                                    <td>{order.ostatus=="issued" && (
                                        <button
                                            className="btn btn-warn btn-sm" onClick={() => { returnBook(order) }}>
                                            return
                                        </button>
                                    )}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {!check && (
                        <tr>
                            <h3><center>no orders</center></h3>
                        </tr>
                    )}
                    </tbody>
                </table>
                </div>
            {/* </div> */}
            </center>
        </div>
    )
}

export default Order
