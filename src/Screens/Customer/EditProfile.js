import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../Common/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { SignInReducer } from './../../Reducers/userReducer';
import { edit } from './../../Actions/userAction';

const EditProfile = () => {

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [gender, setGender] = useState('')
    const [contact, setContact] = useState('')
    const [addr, setAddr] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pincode, setPincode] = useState(0)
    const [email, setEmail] = useState('')

    const history = useHistory()
    const id1 = localStorage.getItem("id")
    const [user, getUser] = useState({})

    const dispatch = useDispatch()

    const custSignIn = useSelector((store) => store.custSignIn)

    useEffect(() => {
        // const currentUser=JSON.parse(localStorage.getItem("user"))
        // getUser(currentUser)
        // if(currentUser){
        //     setFirstName(currentUser.ufirstName)
        //     setLastName(currentUser.ulastName)
        //     setGender(currentUser.ugender)
        //     setContact(currentUser.ucontactNo)
        // }
        axios.get(url + '/customer/getCustomer' + `/${custSignIn.uid}`).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                // setFirstName(result.data.ufirstName)
                // setLastName(result.data.ulastName)
                // setGender(result.data.ugender)
                // setContact(result.data.ucontactNo)
                // setAddr(result.data.uaddr)
                // setCity(result.data.ucity)
                // setState(result.data.ustate)
                // setPincode(result.data.upinCode)
                getUser(result.data)
                setFirstName(result.data.ufirstName)
                setLastName(result.data.ulastName)
                setGender(result.data.ugender)
                setContact(result.data.ucontactNo)
                setAddr(result.data.uaddr)
                setCity(result.data.ucity)
                setState(result.data.ustate)
                setPincode(result.data.upinCode)
                setEmail(result.data.uemail)
            }
            else {
                alert("error While Editing Profile")
            }
        })
    }, [])

    const UpdateProfile = () => {
        console.log(gender)
        if(firstName.length === 0)
            alert('Enter First Name')
        else if(lastName.length === 0)
            alert('Enter Last Name')
        else if(gender.length === 0)
            alert('Enter gender')
        else if(contact.length === 0)
            alert('Enter contact')
        else{
            const data = { uId: custSignIn.uid, ufirstName: firstName, ulastName: lastName, ugender: gender, ucontactNo: contact, urole: "customer"};
            axios.put(url+'/customer/edit',data).then((response) =>{
                const result = response.data
                if(result.status === 'success')
                {
                    console.log("user" + result.data)
                    dispatch(edit(email, result.data.uId, result.data.ufirstName, result.data.urole))
                } 
                else{
                    alert("error While Editing cust!!!")
                }
            })
            console.log("cust put done")
            const data1 = { uid: custSignIn.uid, uaddr: addr, ucity : city, ustate : state, upinCode : pincode }
            axios.post(url + '/customer/address', data1).then((response) => {
                console.log("addr post called")
                const result = response.data
                if (result.status === 'success') {
                    console.log("address" + result.data)
                    history.push('/home')
                }
                else {
                    alert("error While Editing addr!!!")
                }
            })
        }
    }
    console.log(user.ufirstName)
    return (
        <div className="div-style">
        <div className="card card-registration align-items-center signup-div " style={{ backgroundColor: "#F4F4F4" }}>
            <div className="card-body p-4 p-md-5">
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">edit Form</h3>
            <form>

                <div className="row">
                <div className="col-md-6 mb-4">

                    <div className="form-outline">
                    <input type="text" id="firstName" className="form-control form-control-lg" onChange={(e) => {
                        setFirstName(e.target.value)
                    }} defaultValue={user.ufirstName} name="firstName"/>
                    <label className="form-label" for="firstName">First Name</label>
                    </div>

                </div>
                <div className="col-md-6 mb-4">

                    <div className="form-outline">
                    <input type="text" id="lastName" className="form-control form-control-lg" onChange={(e) => {
                        setLastName(e.target.value)
                    }} defaultValue={user.ulastName} name="lastName"/>
                    <label className="form-label" for="lastName">Last Name</label>
                    </div>

                </div>
                </div>

                <div className="row">
                <div className="col-md-6 mb-4">

                    <div className="form-outline">
                    <input type="text" id="gender" className="form-control form-control-lg" onChange={(e) => {
                        setGender(e.target.value)
                    }} defaultValue={user.ugender} name="gender"/>
                    <label className="form-label" for="gender">Gender</label>
                    </div>

                </div>
                <div className="col-md-6 mb-4">

                    <div className="form-outline">
                    <input type="text" id="contact" className="form-control form-control-lg" onChange={(e) => {
                        setContact(e.target.value)
                    }} defaultValue={user.ucontactNo} name="contact"/>
                    <label className="form-label" for="contact">contact</label>
                    </div>

                </div>
                </div>

                <div className="row">
                <div className="col-md-6 mb-4">

                    <div className="form-outline">
                        <input type="text" id="address" className="form-control form-control-lg" onChange={(e) => {
                        setAddr(e.target.value)
                    }} defaultValue={user.uaddr} name="address" />
                    <label className="form-label" for="address">Address</label>
                    </div>

                </div>
                <div className="col-md-6 mb-4">

                    <div className="form-outline">
                        <input type="text" id="city" className="form-control form-control-lg" onChange={(e) => {
                            setCity(e.target.value)
                        }} defaultValue={user.ucity} name="city" />
                        <label className="form-label" for="city">City</label>
                    </div>

                </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-4">

                        <div className="form-outline">
                            <input type="text" id="state" className="form-control form-control-lg" onChange={(e) => {
                                setState(e.target.value)
                            }} defaultValue={user.ustate} name="state" />
                            <label className="form-label" for="state">State</label>
                        </div>

                    </div>
                    <div className="col-md-6 mb-4">

                        <div className="form-outline">
                            <input type="text" id="pincode" className="form-control form-control-lg" onChange={(e) => {
                                setPincode(e.target.value)
                            }} defaultValue={user.upinCode} name="pincode" />
                            <label className="form-label" for="pincode">Pin code</label>
                        </div>

                    </div>
                </div>

                <div className="mt-4 pt-2">
                <button type="button" className="btn btn-primary btn-lg btn-css" onClick={UpdateProfile}>Update</button>
                </div>

            </form>
            </div>
        </div>

        </div>
        // <div>
        //     edit
        //     <p>please fisplay this page</p>
        // </div>
    )
}

export default EditProfile
