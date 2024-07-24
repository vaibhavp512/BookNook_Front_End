import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../Common/constants';

const DeliveriesList = () => {

    const delman = useSelector((store) => store.custSignIn)
    const[orders, setOrders] = useState([])
    const [check, setCheck] = useState(false)
    const dispatch = useDispatch()

    const getOrders = () => {
        axios.get(url + "/delivery/mydeliveries/" + `${delman.uid}`).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setOrders((result.data))
                setCheck((true))
            }
        })
    }

    const updateOrder = (oid) => {
        axios.post(url + "/delivery/" + `${oid}`).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                getOrders()
            }
        })
    }


    useEffect(() => {
        getOrders()
    }, [])



    return (
        <div>
            <center>
            {
                orders.length>0 ? (
                    <div className="col-md-8 col-sm-8 col-xs-12" >
                        <div className="table-container">
                            <table border="1px solid gray" className="table table-hover bordered" style={{ margin: "40px 40px 20px 20px", textAlign:'center' }}>
                                <thead>
                                    <tr>
                                        <th>Order id</th>
                                        <th>Customer id</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((o) => {
                                        return (
                                            <tr>
                                                <td>{o.oid}</td>
                                                <td>{o.uid}</td>
                                                <td><button
                                                    onClick={() => {
                                                        updateOrder(o.oid)
                                                    }}
                                                    className="btn btn-sm btn-css">
                                                    Delivered
                                                </button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <h1>No orders to deliver !</h1>
                )
            }
            </center>
        </div>
    )
}

export default DeliveriesList
