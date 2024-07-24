import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { url } from './../../Common/constants';
import { useDispatch } from 'react-redux';
import { planAction } from '../../Actions/userAction';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const CustPlan = () => {
    const custSignIn = useSelector((store) => store.custSignIn)
    const plan = useSelector((store) => store.CustPlan)
    const [plans, setPlans] = useState([])
    const [check, setCheck] = useState(false)
    const [currentplan, setCurrentplan] = useState([])
    const [selplan, setSelplan] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(()=>{
        axios.get(url + "/plansDetails").then((response)=>{
            const result = response.data;
            if (result.status === 'success') {
                setPlans(result.data)
            } else {
                alert('error while fetching plans')
            }
        })

        axios.get(url + "/plans" + `/${custSignIn.uid}`).then((response)=>{
            const result = response.data;
            if(result.status == "success"){
                dispatch(planAction(result.data))
                console.log(result.data)
                setCurrentplan(result.data)
                setCheck(true)
            }else{
            }
        })
    }, [])

    const selectPlan = (p) =>{
        const data= {uid:custSignIn.uid, plid: p.plid, pactive: 1}
        axios.post(url + "/plans",data).then((response) => {
            const result = response.data;
            if (result.status === 'success') {
                dispatch(planAction(result.data))
                toast.success("Plane purchased successfully", { autoClose: 1500, position: toast.POSITION.TOP_RIGHT })
                history.push("/home")
            } else {
                toast.error("Error occurred while purchasing plan", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT })
            }
        })
    }

    return (
        <div className="text-center">
            <br />
            {
                !custSignIn.logged &&(
                    <div>
                        <h2>You are not logged in</h2>
                    </div>
                )
            }            
            <div className="row">
                {!check && custSignIn.logged &&(  
                    plans.map((p) => {
                        return (
                            <div className="pricing-column col-lg-4 col-md-6">
                                <div className="card" style={{ marginLeft: 20, marginRight: 20, marginTop: 100 }}>
                                    <div className="card-header">
                                        <h3>{p.pname}</h3>
                                    </div>
                                    <div className="card-body">
                                        <h2 className="price-text">{p.pamount}</h2>
                                        <p>issue limit is {p.pblimit} per order</p>
                                        <p>Unlimited App Usage</p>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value="gpay"
                                                    id="gpayoption"
                                                    name="radiobutton"
                                                    onChange={(e) => {
                                                        setSelplan(e.target.value)
                                                    }}
                                                />
                                                <label className="form-check-label" for="gpayoption">Gpay</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value="debitcard"
                                                    id="debitcardoption"
                                                    name="radiobutton"
                                                    onChange={(e) => {
                                                        setSelplan(e.target.value)
                                                    }}
                                                />
                                                <label className="form-check-label" for="debitcardoption">Debit card</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    value="creditcard"
                                                    id="creditcardoption"
                                                    name="radiobutton"
                                                    onChange={(e) => {
                                                        setSelplan(e.target.value)
                                                    }}
                                                />
                                                <label className="form-check-label" for="creditcardoption">Credit card</label>
                                            </div>
                                        </div>
                                        <br />
                                        <button onClick={() => { selectPlan(p) }} className="btn btn-lg btn-outline-dark">
                                            Purchase
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )                
                }
            </div>
        
            {check && custSignIn.logged &&(
                    <div>
                        <h2>plan already purchased</h2>
                        <div class="pricing-column col-lg-4 col-md-6">
                            <div class="card">
                                <div class="card-header">
                                <h3>{currentplan.pname}</h3>
                                </div>
                                <div class="card-body">
                                    <h2 class="price-text">{currentplan.pamount}</h2>
                                    <p>Plan activated on:{currentplan.pstartDate}</p>
                                    <p>Plan expires on:{currentplan.pexpDate}</p>
                                    <p>Book issue limit per order:{currentplan.pblimit}</p>
                                        <Link className="btn btn-lg btn-outline-dark" to="/home">
                                            Back
                                        </Link>
                                </div>
                            </div>
                        </div>
                    </div>
            )
            }
        </div>    
    )
}

export default CustPlan
