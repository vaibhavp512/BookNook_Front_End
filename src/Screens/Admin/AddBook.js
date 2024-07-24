import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { url } from './../../Common/constants';

const AddBook = () => {

    const [bname, setName] = useState('')
    const [bpages, setPages] = useState(1)
    const [bprice, setPrice] = useState(1)
    const [bavCopies, setCopies] = useState(1)
    const [btCopies, setTcopies] = useState(1)
    const [bfront, setFront] = useState(undefined)
    const [bback, setBack] = useState(undefined)
    const [brating, setRating] = useState(1)
    const [author,setAuthor] = useState(-1)
    const [authors, setAuthors] = useState([])
    const [publisher,setPublisher] = useState(-1)
    const [publishers, setPublishers] = useState([])
    const [category,setCategory] = useState(-1)
    const [categories, setCategories] = useState([])

    const history = useHistory()

    useEffect(() => {
        getAuthors() ; getCategories(); getPublishers();
    }, [])
  
    const getAuthors = () => {
      axios.get(url + '/author').then((response) => {
        const result = response.data
        if (result.status === 'success') {
          if (result.data.length > 0) {
            // select the first artist from the list
            // select the default artist
            setAuthor(result.data[0].aId)
            setAuthors(result.data)
          }
        } else {
          alert('error while loading list of authors')
        }
      })
    }
  

    const getPublishers = () => {
      axios.get(url + '/publisher').then((response) => {
        const result = response.data
        if (result.status === 'success') {
          if (result.data.length > 0) {
            // select the first artist from the list
            // select the default artist
            setPublisher(result.data[0].pubId)
  
            setPublishers(result.data)
          }
        } else {
          alert('error while loading list of publishers')
        }
      })
    }

    const getCategories = () => {
      debugger;
      axios.get(url + '/categories').then((response) => {
        const result = response.data
        if (result.status === 'success') {
          if (result.data.length > 0) {
            // select the first artist from the list
            // select the default artist
            setCategory((result.data[0].catId))
  
            setCategories((result.data))
          }
        } else {
          alert('error while loading list of Categories')
        }
      })
    }


    // const getCategories = () => {
    //   axios.get(url + '/categories').then((response) => {
    //     const result = response.data
    //     if (result.status === 'success') {
    //       if (result.data.length > 0) {
    //         // select the first artist from the list
    //         // select the default artist
    //         setCategory(result.data[0].id)
  
    //         setCategories(result.data)
    //       }
    //     } else {
    //       alert('error while loading list of categories')
    //     }
    //   })
    // }


    const addBookToDB = () => {
      if (bname.length === 0) {
        alert('enter book name')
      } else if (author === -1) {
        alert('enter author name')
      } else if (publisher === -1) {
        alert('enter publisher name')
      }
      else if (category === -1) {
          alert('enter category name')
      } else if (!bfront) {
        alert('select front cover')
      }
      else if (!bback) {
        alert('select back cover')
      }
      else {
        debugger;
        const data = new FormData()
        data.append('bname', bname)
        data.append('authID', author)
        data.append('pubID', publisher)
        data.append('catID', category)
        data.append('bfront', bfront)
        data.append('bback', bback)
        data.append('bpages', bpages)
        data.append('bprice', bprice)
        data.append('bavCopies', bavCopies)
        data.append('btCopies', btCopies)
        data.append('brating', brating)
  

        console.log(author)
        console.log(publisher)
        console.log(category)
        axios.post(url + '/book', data).then((response) => {
          const result = response.data
          if (result.status === 'success') {
            history.push('/book')
          } else {
            debugger;
            console.log(result.error)
            alert('error while loading list of books, please try again..')
          }
        })
      }
    }
  
    return (
        <div>
        <center>
          <div style={{ width: "40%" }}>
        <h1 className="page-title">Add Book</h1>
  
        <div className="mb-3">
          <label htmlFor="">Name</label>
          <input
            onChange={(e) => {
              setName(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Price</label>
          <input
            onChange={(e) => {
              setPrice(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Pages</label>
          <input
            onChange={(e) => {
              setPages(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Available Copies</label>
          <input
            onChange={(e) => {
              setCopies(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Total Copies</label>
          <input
            onChange={(e) => {
              setTcopies(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Rating</label>
          <input
            onChange={(e) => {
              setRating(e.target.value)
            }}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="">Publisher</label>
          <select
            onChange={(e) => {
              setPublisher(e.target.value)
            }}
            className="form-control">
            {publishers.map((p) => {
              console.log(p)
              return (
                <option value={p.pubId}>
                  {p.pubname} 
                </option>
              )
            })}
          </select>
        </div>
        <div className="mb-3">
        <label htmlFor="">Categories</label>
        <select
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            className="form-control">
            {categories.map((c) => {
              console.log(c)
              return (
                <option value={c.catId}>
                  {c.catname} 
                </option>
              )
            })}
          </select>
  </div>
  
        <div className="mb-3">
          <label htmlFor="">Author</label>
          <select
            onChange={(e) => {
              setAuthor(e.target.value)
            }}
            className="form-control">
            {authors.map((a) => {
              console.log(a)
              return (
                <option value={a.aId}>
                  {a.aname} 
                </option>
              )
            })}
          </select>
        </div>
  
        <div className="mb-3">
          <label htmlFor="">Front Cover</label>
          <input
            onChange={(e) => {
              setFront(e.target.files[0])
            }}
            accept="image/*"
            type="file"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="">Back Cover</label>
          <input
            onChange={(e) => {
              setBack(e.target.files[0])
            }}
            accept="image/*"
            type="file"
            className="form-control"
          />
        </div>
  
        <div className="mb-3">
          <button onClick={addBookToDB} className="btn btn-success">
            Add
          </button>
  
          <Link to="/book">
            <a className="btn btn-warning">Back</a>
          </Link>
        </div>
        </div>
        </center>
      </div>
    )
}

export default AddBook
