import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from './../Common/constants';

const Plans = () => {
    const [plans, setPlans] = useState([])

    useEffect(() => {

        console.log(`plans component got loaded`)
        getPlans()
    }, [])

    const getPlans = () => {
        axios.get(url + '/plansDetails').then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setPlans(result.data)
            } else {
                alert('error while loading list of plans')
            }
        })
    }

    return (
        <div>
            <center>
                <br></br>
                <h3 className="page-title" style={{ fontFamily: 'Ubuntu', color: '#BD4B4B' }}>Plan Details</h3>
                <br></br>


                <table border="1px solid gray" className="table table-hover bordered" style={{width:"60%"}}>
                    <thead>
                        <tr>
                            <th>Plan Name</th>
                            <th>Plan Amount</th>
                            <th>Books Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan) => {
                            return (
                                <tr>
                                    <td>{plan.pname}</td>
                                    <td>
                                        {plan.pamount}
                                    </td>
                                    <td>{plan.pblimit}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                
            </center>
        </div>
    )
}

export default Plans
