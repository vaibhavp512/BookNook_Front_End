import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { url } from './../../Common/constants';

const InfoEdit = () => {

    const [customer, setCustomer] = useState(-1)
    const [customers, setCustomers] = useState([])
    const [status, setStatus] = useState([])

    const stValues = ['ordered', 'returned','issued', 'delivered']

    useEffect(() => {
        getCustomers()
    }, [])
    
    const updateToDb = () =>{
        
    }

    const getCustomers = () =>{
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

    return (
        <div>
            <center>
                <div style={{ width: "40%" }}>
                    <h1 className="page-title">Edit Customer order status</h1>

                    <div className="mb-3">
                        <label htmlFor="">Customer</label>
                        <select
                            onChange={(e) => {
                                setCustomer(e.target.value)
                            }}
                            className="form-control">
                            {customers.map((c) => {
                                console.log(c)
                                return (
                                    <option value={c.uId}>
                                        {c.ufirstName}{c.ulastName}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="">Order Status</label>
                        <select
                            onChange={(e) => {
                                setStatus(e.target.value)
                            }}
                            className="form-control">
                            {stValues.map((s) => {
                                console.log(s)
                                return (
                                    <option value={s}>
                                        {s}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <button onClick={updateToDb} className="btn btn-success">
                            update
                        </button>
                        &nbsp;
                        <Link to="/dashadmin">
                            <a className="btn btn-warning">Back</a>
                        </Link>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default InfoEdit
