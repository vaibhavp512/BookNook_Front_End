import axios from 'axios'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { url } from './../../Common/constants';



const AddAuthor = () => {

  const [aname, setAname] = useState('')
  const history = useHistory()

  const addAuthorToDB = () => {
    if (aname.length === 0) {
      alert('select author name')
    } else {


      // send the data to the API
      axios.post(url + '/author', {aname:aname}).then((response) => {
        const result = response.data
        if (result.status === 'success') {
          // go to the list of artists
          history.push('/author')
        } else {
          alert('error while adding author')
        }
      })
    }
  }
    return (
        <div>
        <center>
          <div style={{ width: "40%" }}>
        <h1 className="page-title">Add Author</h1>
        
  
        <div className="mb-3">
          <label htmlFor="">Author Name</label>
          <input
            onChange={(e) => {
              setAname(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
       
  
  
        <div className="mb-3">
          <button onClick={addAuthorToDB} className="btn btn-success">
            Add
          </button>
  
          <Link to="/author">
            <a className="btn btn-warning">Back</a>
          </Link>
        </div>
          </div>
        </center>
      </div>
    )
}

export default AddAuthor
