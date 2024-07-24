import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../Common/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const ChangePassword = () => {

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    
    const history = useHistory()

    const custSignIn = useSelector((store) => store.custSignIn)

    const changePass = () =>{
        if (password.length === 0) {
            toast.warn("Enter old password !", {
                position:"top-center"
            })
        } else if (newPassword.length === 0) {
            toast.warn("Enter new password !", {
                position:"top-center"
            })
        }else {
            const data = new FormData()
            data.append('oldPass', password)
            data.append('newPass', newPassword)
            data.append('id', custSignIn.uid)
            console.log(custSignIn.uid)
            // send the data to the API
            axios.put(url + '/customer/updatePass', data).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                toast.success("successfully changed password")
                history.push('/home')
            } else {
                toast.error("Please ensure you have entered correct password")
            }
            })
        }
    }

    return (
        <div>
            <div className="signin-div">
            <div className="form-outline mb-4">

            <input type="email" id="form3Example3" className="form-control form-control-lg"
                placeholder="Enter old password" onChange={(e) => {
                    setPassword(e.target.value)
                }}/>
            </div>

            <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg"
                placeholder="Enter new password" onChange={(e) => {
                    setNewPassword(e.target.value)
                }}/>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-lg btn-css" onClick={changePass}> Change Password</button>
            </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ChangePassword
