import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { url } from './../../Common/constants';


const AddPublisher = () => {
    const [pubname, setPubname] = useState('')
  const history = useHistory()

  const addPublisherToDB = () => {
    if (pubname.length === 0) {
      alert('select publisher name')
    } else {


      // send the data to the API
      axios.post(url + '/publisher', {pubname:pubname}).then((response) => {
        const result = response.data
        if (result.status === 'success') {
          history.push('/publisher')
        } else {
          alert('error while adding publisher')
        }
      })
    }
  }
    return (
        <div>
        <center>
          <div style={{ width: "40%" }}>

        <h1 className="page-title">Add Publisher</h1>
  
        <div className="mb-3">
          <label htmlFor="">Publisher Name</label>
          <input
            onChange={(e) => {
                setPubname(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
       
  
  
        <div className="mb-3">
          <button onClick={addPublisherToDB} className="btn btn-success">
            Add
          </button>
  
          <Link to="/publisher">
            <a className="btn btn-warning">Back</a>
          </Link>
        </div>
        </div>
        </center>
      </div>
    )
}

export default AddPublisher
