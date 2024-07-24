import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../Common/constants';


const SignUp = () => {

  const [firstName, setfirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState("customer")

  const history = useHistory()

  const registerUser = () => {
    if (email.length === 0) {
      alert('enter email')
    } else if (password.length === 0) {
      alert('enter password')
    } else {

      // send the data to the API
      axios.post(url + '/customer/register', { ufirstName: firstName, ulastName: lastName, ugender: gender, uemail: email, ucontactNo: contactNo, upassword: password, urole: role })
        .then((response) => {
          const result = response.data
          if (result.status === 'success') {
            alert('successfully registered. Please login to continue.')
            history.push('/signin')
          } else {
            alert('error while registering')
          }
        })
    }
  }



  return (
    <div className="div-style">

      <div className="card card-registration align-items-center signup-div " style={{ backgroundColor: "#F4F9F9" }}>
        <div className="card-body p-4 p-md-5">
          <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
          <form>

            <div className="row">
              <div className="col-md-6 mb-4">

                <div className="form-outline">
                  <input type="text" id="firstName" className="form-control form-control-lg" onChange={(e) => {
                    setfirstName(e.target.value)
                  }} />
                  <label className="form-label" for="firstName">First Name</label>
                </div>

              </div>
              <div className="col-md-6 mb-4">

                <div className="form-outline">
                  <input type="text" id="lastName" className="form-control form-control-lg" onChange={(e) => {
                    setLastName(e.target.value)
                  }} />
                  <label className="form-label" for="lastName">Last Name</label>
                </div>

              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="form-outline">
                  <input type="text" id="lastName" className="form-control form-control-lg" onChange={(e) => {
                    setPassword(e.target.value)
                  }} />
                  <label className="form-label" for="lastName">Password</label>
                </div>

              </div>
              <div className="col-md-6 mb-4">

                <h6 className="mb-2 pb-1">Gender: </h6>

                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Female"
                      name="flexRadioDefault" 
                      onChange={(e) => {
                        setGender(e.target.value)
                      }}
                    />
                    <label className="form-check-label" for="femaleGender">Female</label>
                  </div>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="Male"
                      name="flexRadioDefault" 
                      onChange={(e) => {
                        setGender(e.target.value)
                      }}
                    />
                    <label className="form-check-label" for="maleGender">Male</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-4 pb-2">

                <div className="form-outline">
                  <input type="email" id="emailAddress" className="form-control form-control-lg" onChange={(e) => {
                    setEmail(e.target.value)
                  }} />
                  <label className="form-label" for="emailAddress">Email</label>
                </div>

              </div>
              <div className="col-md-6 mb-4 pb-2">

                <div className="form-outline">
                  <input type="tel" id="phoneNumber" className="form-control form-control-lg" onChange={(e) => {
                    setContactNo(e.target.value)
                  }} />
                  <label className="form-label" for="phoneNumber">Phone Number</label>
                </div>

              </div>
            </div>
            <div className="col-md-6 mb-4 pb-2">

              <div className="form-outline">
                <input type="text" id="role" className="form-control form-control-lg"
                  defaultValue={role} disabled hidden/>
                {/* <label className="form-label" for="role">Role</label> */}
              </div>

            </div>
            <div className="mt-4 pt-2">
              <button type="button" className="btn btn-primary btn-lg btn-css" onClick={registerUser}>Register</button>
            </div>

          </form>
        </div>
      </div>

    </div>
  )
}

export default SignUp



