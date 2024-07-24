import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from './../../Common/constants';
const Author = () => {
    // maintain the state
    const [authors, setAuthors] = useState([])

    // do something automatically
    // []:
    // - accepts a variable and keeps watching the change
    // - when the variable state changes, the function (1st param) gets called
    // - keep the second param empty to execute something when the component gets loaded
    useEffect(() => {
        console.log(`author component got loaded`)
        getAuthor()
    }, [])

    const getAuthor = () => {
        axios.get(url + '/author').then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setAuthors(result.data)
            } else {
                alert('error while loading list of authors')
            }
        })
    }

    return (
        <div>
            <center>
            <h1 className="page-title">authors</h1>

            <Link to="/addAuthor">
                <a className="btn btn-success">Add author</a>
            </Link>
            <table className="table table-hover bordered" style={{ width: "60%" }}>
                <thead>
                    <tr>
                        <th>SrNo</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => {
                        return (
                            <tr>
                                <td>{author.aId}</td>
                                <td>{author.aname}</td>
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

export default Author
