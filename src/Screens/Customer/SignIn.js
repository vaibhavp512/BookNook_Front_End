import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { url } from '../../Common/constants';
import axios from 'axios'
import { signin } from '../../Actions/userAction';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const SignIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)
    const dispatch = useDispatch();

    const history = useHistory()

    const checkUser = () => {
        if (email.length === 0) {
            alert('enter email')
        } else if (password.length === 0) {
            alert('enter password')
        } else {
            const data = new FormData()
            data.append('uemail', email)
            data.append('upassword', password)

            // send the data to the API
            axios.post(url + '/customer/login', data).then((response) => {
                const result = response.data
                if (result.status === 'success') {
                    console.log(result.data)
                    console.log(email, password, loggedIn)
                    console.log(result.data.urole)
                    setLoggedIn(true)
                    dispatch(signin(email, result.data.uId, result.data.ufirstName, result.data.urole))
                    if (result.data.urole === 'delivery') {
                        history.push('/delivery')
                    }
                    if (result.data.urole === 'customer') {
                        history.push('/home')
                    }
                } else {
                    toast.warning('error while login')
                }
            })
        }
    }

    return (
        <div>
            <div className="card card-registration align-items-center signin-div " style={{ backgroundColor: "#F4F9F9" }}>
                <div className="card-body">
                    <div className="form-outline mb-4">
                        <p>Please login to your account</p>

                        <input type="email" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter email" onChange={(e) => {
                                setEmail(e.target.value)
                            }} />
                    </div>

                    <div className="form-outline mb-3">
                        <input type="password" id="form3Example4" className="form-control form-control-lg"
                            placeholder="Enter password" onChange={(e) => {
                                setPassword(e.target.value)
                            }} />
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="button" className="btn btn-primary btn-lg btn-css" onClick={checkUser}>Login</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                            <Link to="/signup">
                                <a className="link-danger">   Register</a>
                            </Link>
                        </p>
                        <Link to="/signinAdmin">
                            <a className="link-info" style={{ "text-align": "center", "display": "block" }}>Admin login</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
