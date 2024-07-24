import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from './../../Common/constants';
import { toast } from 'react-toastify';
import { useHistory, Link } from 'react-router-dom';

const SearchCust = () => {

    const [customer, setCustomer] = useState(-1)
    const [customers, setCustomers] = useState([])
    const [orders, setOrders] = useState([])
    const [status, setStatus] = useState('')
    const [isFetched, setIsFetched] = useState(false)

    const history = useHistory()

    useEffect(() => {
        getCustomers()
    }, [status])

    const getCustomers = () => {
        axios.get(url + '/admin/cust').then((response) => {
            const result = response.data
            if (result.status === 'success') {
                if (result.data.length > 0) {
                    setCustomer(result.data[0].aId)
                    setCustomers(result.data)
                }
            } else {
                alert('error while loading list of authors')
            }
        })
    }

    const fetchOrders = (cusid) => {
        setIsFetched(true)
        console.log(cusid + "this is customer")
        axios.get(url + `/order/custorder/${cusid}`).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setOrders(result.data)
            } else {
                toast.error('error while fetching orders for customer')
            }
        })
    }

    const onSelectedCustomer = (cusid) => {
        console.log("onSelectedCustomer called")
        fetchOrders(cusid)
    }

    // const updateOrder = (oid) => {
    //     console.log("stst cslled")
    //     console.log(status)
    //     var stat = status
    //     console.log(stat)
    //     const data = new FormData()
    //     data.append('status', stat)
    //     axios.post(url + "/order" + `/${oid}`, data).then((response) => {
    //         const result = response.data
    //         if (result.status === 'success') {
    //             alert("updated status")
    //         } else {
    //             toast.error('error while updating order for customer')
    //         }
    //     })
    // }

    return (
        <div>
            <center>
                <div style={{margin: '10px'}}>
                    {
                        // categoryList.length > 0 &&
                        <div className="col-md-3">
                            <strong>Customer</strong>
                            <br />
                            <br />
                            <select
                                onChange={(e) => {
                                    console.log("selected called before calling selected" + e.target.value)
                                    setCustomer(e.target.value)
                                    onSelectedCustomer(e.target.value)
                                    console.log("selected called after calling selected" + e.target.value)
                                }}
                                className="form-control">
                                {customers.map((c) => {
                                    console.log(c)
                                    return (
                                        <option value={c.uId}>
                                            {c.ufirstName} {c.ulastName}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                    }
                </div>
                <br/><br />
                <div className="col-md-9">
                    {
                        orders.length>0 && 
                        <table border="1px solid gray" className="table table-hover bordered" style={{ margin: "40px 40px 20px 20px", textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th>Order id</th>
                                    <th>Order date</th>
                                    <th>Order status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(o => {
                                        return (
                                        <tr>
                                                <td>{o.oid}</td>
                                                <td>{o.odate}</td>
                                                <td>{o.ostatus}</td>
                                        </tr>
                                        )
                                    }
                                    )
                                }
                            </tbody>
                        </table>
                    }
                </div>
                <Link to="/dashadmin">
                    <a className="btn btn-warning">Back</a>
                </Link>
            </center>
        </div>
    )
}

export default SearchCust
