import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../Common/constants';
import { toast } from 'react-toastify';
import { removeFromDelCartAction } from '../../Actions/deliveryAction';
import { addToDelCartAction, emptyDelCartAction } from './../../Actions/deliveryAction';

const Delivery = () => {

    const delcart = useSelector((store) => store.delcart)
    const delman = useSelector((store) => store.custSignIn)
    const [orders, setOrders] = useState([])
    const [check, setCheck] = useState(false)
    const dispatch = useDispatch()

    // const returnBook = (order) => {
    //     axios.put(url + "/order" + `/${order.oid}/${"returned"}`).then((response) => {
    //         const result = response.data
    //         if (result.status === 'success') {
    //         } else {
    //             toast.error("some error occurred while returning order", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
    //         }
    //     })
    // }

    const getOrders = () => {
        axios.get(url + "/delivery/getorder").then((response) => {
            const result = response.data
            if (result.status === 'success') {

                setOrders((result.data))
                setCheck((true))
            }
        })
    }

    const acceptOrder = () => {
        if (delcart.length > 0) {
            const list = delcart.map((o) => o.oid)
            const data = { orderIds: list, ostatus: "dispatched", did: delman.uid }
            axios.post(url + "/delivery", data).then((response) => {
                const result = response.data;
                if (result.status === 'success') {
                    getOrders()
                    toast.success("orders assigned")
                    dispatch(emptyDelCartAction())
                } else {
                    toast.error("some errro occured")
                }
            })
        } else {
            toast.warning("please select order first")
        }
    }

    useEffect(() => {
        getOrders()
    },[])

    
    const onRemoveFromDelcart = (order) => {
        dispatch(removeFromDelCartAction(order))
    }

    const onAddtoDelcart = (order) => {
        dispatch(addToDelCartAction(order))
    }

    const Approval = () => {
        // axios.put(url + "/order" + `/${order.oid}/${"returned"}`).then((response) => {
        //     const result = response.data
        //     if (result.status === 'success') {
        //     } else {
        //         toast.error("some error occurred while returning order", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
        //     }
        // })
    }

    

    return (
        <div>
            <center>
                {/* <div className="row"> */}
                <div className="col-md-8 col-sm-8 col-xs-12">
                    <table border="1px solid gray" className="table table-hover" style={{ marginTop: "30px" }}>
                        <thead>
                            <tr>
                                <th>Order id</th>
                                <th>User id</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        
                            {check &&
                                orders.length > 0 && (
                                    
                                <tbody>
                                {orders.map(order => {
                                    let isFound = delcart.filter(cartItem => cartItem.oid === order.oid).length > 0
                                    return (
                                        <tr>
                                            <td>{order.oid}</td>
                                            <td>{order.uid}</td>
                                            <td>{order.odate}</td>
                                            <td>{order.ostatus}</td>
                                            <td style={{width: "100px"}}>
                                                {/* <button
                                                    className="btn btn-warn btn-sm" onClick={() => { Approval(order) }}>
                                                    Accept
                                                </button> */}
                                                {
                                                    isFound === true &&
                                                    <button onClick={() => { onRemoveFromDelcart(order) }} className="btn btn-danger">Remove</button>
                                                }
                                                {
                                                    isFound === false &&
                                                    <button onClick={() => { onAddtoDelcart(order) }} className="btn btn-success" >Add</button>
                                                }
                                            </td>
                                        </tr>
                                        
                                    )
                                })}
                                <tr>
                                    <td colSpan="5"><button onClick={acceptOrder} className="btn btn-lg btn-css">Accept orders</button></td>
                                </tr>
                                </tbody>
                                // <div>
                                //     <button onClick={acceptOrder} className="btn btn-lg btn-css">Accept orders</button>
                                // </div>
                                )
                            }
                            {orders.length==0 && (
                                <tr>
                                    <h3><center>no orders</center></h3>
                                </tr>
                            )}
                    </table>
                </div>
                {/* </div> */}
            </center>
        </div>
    )
}

export default Delivery
