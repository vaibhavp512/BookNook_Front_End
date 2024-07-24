import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { url } from './../../Common/constants';
import { useDispatch } from 'react-redux';
import { signinAdmin } from './../../Actions/adminAction';
import { toast } from 'react-toastify';



const SignInAdmin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    
    const history = useHistory()

    const checkUser = () =>{
        if (email.length === 0) {
            alert('enter email')
        } else if (password.length === 0) {
            alert('enter password')
        }else {
            const data = new FormData()
            data.append('ademail', email)
            data.append('adpassword', password)

            // send the data to the API
            axios.post(url + '/admin/login', data).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                localStorage.setItem('admin',JSON.stringify(result.data))
                dispatch(signinAdmin(email, result.data.adId, result.data.adname))
                history.push('/dashadmin')
            } else {
                toast.error('error while login')
            }
            })
        }
    }

    return (
        <div>
            <div className="card card-registration align-items-center signin-div " style={{ backgroundColor: "#F4F9F9" }}>
            <div className="card-body">
            <div className="form-outline mb-4">
            <center><h3>Admin login</h3></center>

            <input type="email" id="form3Example3" className="form-control form-control-lg"
                placeholder="Enter email" onChange={(e) => {
                    setEmail(e.target.value)
                }}/>
            </div>

            <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
                placeholder="Enter password" onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-lg btn-css" onClick={checkUser}>Login</button>
            </div>
            </div>
            </div>
        </div>
    )
}

export default SignInAdmin
