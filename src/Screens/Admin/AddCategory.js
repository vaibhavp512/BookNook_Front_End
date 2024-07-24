import React from 'react'
import { url } from './../../Common/constants';
import {Link, useHistory } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';


const AddCategory = () => {
    const [catname, setCatname] = useState('')
    const history = useHistory()
  
    const addCategoryToDB = () => {
      if (catname.length === 0) {
        toast.warning('select category name')
      } else {
  
  
        // send the data to the API
        axios.post(url + '/categories', {catname:catname}).then((response) => {
          const result = response.data
          if (result.status === 'success') {
            history.push('/category')
          } else {
            alert('error while adding category')
          }
        })
      }
    }
      return (
          <div>
          <center>
            <div style={{ width: "40%" }}>
          <h1 className="page-title">Add Category</h1>
    
          <div className="mb-3">
            <label htmlFor="">Category Name</label>
            <input
              onChange={(e) => {
                setCatname(e.target.value)
              }}
              type="text"
              className="form-control"
            />
          </div>
         
    
    
          <div className="mb-3">
            <button onClick={addCategoryToDB} className="btn btn-success">
              Add
            </button>
    
            <Link to="/category">
              <a className="btn btn-warning">Back</a>
            </Link>
          </div>
          </div>
          </center>
        </div>
      )
}

export default AddCategory
