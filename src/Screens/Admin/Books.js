import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from './../../Common/constants';
import { toast } from 'react-toastify';


const Books = () => {
    // maintain the state
    const [books, setBooks] = useState([])

    const deleteBook = (bId) => {
        console.log(bId + "this is the book id")
        axios.post(url + `/book/${bId}`).then((response) => {
            const result = response.data;
            if (result.status == "success") {

                console.log(result.data)
                console.log(books)

            } else {
                toast.error('error while deleting books')
            }
        })
    }


    useEffect(() => {
        getBooks()


    })

    const getBooks = () => {
        axios.get(url + '/book').then((response) => {
            const result = response.data
            if (result.status == 'success') {
                setBooks(result.data)
                console.log(result.data)
                console.log(books)

            } else {
                alert('error while loading list of Books')
            }

        })
    }







    return (
        <div>
            <center>
                <h1 className="page-title">Books</h1>

                <Link to="/addBook">
                    <a className="btn btn-success">Add Books</a>
                </Link>
                <table className="table table-hover bordered" style={{ width: "60%" }}>
                    <thead>
                        <tr>
                            <th>SrNo</th>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Book Name</th>
                            <th>Price</th>
                            <th>Pages</th>
                            <th>Available Copies</th>
                            <th>Total Copies</th>
                            <th>Rating</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Category</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>

                        {books.map((book) => {
                            return (
                                <tr>
                                    <td>{book.bId}</td>
                                    <td>
                                        <img
                                            src={url + '/' + book.bfront}
                                            alt=""
                                            className="thumbnail-sm"
                                            width="100px"
                                        />
                                    </td>
                                    <td>
                                        <img
                                            src={url + '/' + book.bback}
                                            alt=""
                                            className="thumbnail-sm"
                                            width="100px"
                                        />
                                    </td>
                                    <td>{book.bname}</td>
                                    <td>{book.bprice}</td>
                                    <td>{book.bpages}</td>
                                    <td>{book.bavCopies}</td>
                                    <td>{book.btCopies}</td>
                                    <td>{book.brating}</td>
                                    <td>{book.authorName}</td>
                                    <td>{book.pubName}</td>
                                    <td>{book.catName}</td>
                                    <td><button
                                        onClick={() => {
                                            deleteBook(book.bId)
                                        }}
                                        className="btn btn-danger">
                                        Delete
                                    </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to="/dashadmin">
                    <a className="btn btn-warning">Back</a>
                </Link>
            </center>
        </div>
    )
}

export default Books
