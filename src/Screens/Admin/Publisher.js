import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from './../../Common/constants';

const Publisher = () => {
    // maintain the state
    const [publishers, setPublisher] = useState([])

    // do something automatically
    // []:
    // - accepts a variable and keeps watching the change
    // - when the variable state changes, the function (1st param) gets called
    // - keep the second param empty to execute something when the component gets loaded
    useEffect(() => {
        console.log(`publisher component got loaded`)
        getPublisher()
    }, [])

    const getPublisher = () => {
        axios.get(url + '/publisher').then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setPublisher(result.data)
            } else {
                alert('error while loading list of publisher')
            }
        })
    }

    return (
        <div>
            <center>
            <h1 className="page-title">Publisher</h1>

            <Link to="/addPublisher">
                <a className="btn btn-success">Add Publisher</a>
            </Link>
            <table className="table table-hover bordered" style={{ width: "60%" }}>
                <thead>
                    <tr>
                        <th>Sr No</th>
                        <th>Publisher Name</th>
                    </tr>
                </thead>
                <tbody>
                    {publishers.map((publisher) => {
                        return (
                            <tr>
                                <td>{publisher.pubId}</td>
                                <td>{publisher.pubname}</td>
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

export default Publisher
