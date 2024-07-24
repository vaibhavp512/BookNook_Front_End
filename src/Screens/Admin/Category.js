import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { url } from './../../Common/constants';
import { toast } from 'react-toastify';

const Category = () => {
    // maintain the state
    const [categories, setCategories] = useState([])

    // do something automatically
    // []:
    // - accepts a variable and keeps watching the change
    // - when the variable state changes, the function (1st param) gets called
    // - keep the second param empty to execute something when the component gets loaded


    const getCategory = () => {
        axios.get(url + '/categories').then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setCategories(result.data)
            } else {
                alert('error while loading list of category')
            }
        })
    }

    const deleteCategory = (cId) => {

        axios.post(url + `/categories/${cId}`).then((response) => {
            const result = response.data;
            if (result.status == "success") {

            } else {
                toast.error('error while deleting categories')
            }
        })
    }

    useEffect(() => {
        console.log(`category component got loaded`)
        getCategory()
    }, [deleteCategory])

    return (
        <div>
            <center>
                <h1 className="page-title">Category</h1>

                <Link to="/addCategory">
                    <a className="btn btn-success">Add Category</a>
                </Link>
                <table className="table table-hover bordered" style={{ width: "60%" }}>
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Category Name</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((Category) => {
                            return (
                                <tr>
                                    <td>{Category.catId}</td>
                                    <td>{Category.catname}</td>

                                    <td><button
                                        onClick={() => {
                                            deleteCategory(Category.catId)
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

export default Category
