import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { url } from './../../Common/constants';
import { addToCartAction, removeFromCartAction } from './../../Actions/cartAction';

const CatBooks = () => {

    const custSignIn = useSelector((store) => store.custSignIn)
    let category = useSelector(store => store.catSelect)
    const categories = useSelector(store => store.catList)
    const cart = useSelector(store => store.cart)

    const [categoryList, setCategoryList] = useState(categories)
    const [books, setBooks] = useState([])
    const [isFetched, setIsFetched] = useState(false)
    const [isAdded, setIsAdded] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!isFetched && !category) {
    //         fetchBooks(categoryList[0].catname)
    //     }
    //     if (!isFetched && category.catname) {
    //         fetchBooks(category.catname)
    //     }
    // }, [isAdded, isRemoved])

    const fetchBooks = (categoryId) => {
        setIsFetched(true)
        axios.get(url + '/book/category' + `/${categoryId}`).then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setBooks(result.data)
            } else {
                alert('error while fetching category wise books')
            }
        })
    }

    const onSelectCategory = (category) => {
        fetchBooks(category.catId)
        dispatch({
            type: "category-select",
            payload: category
        })
    }

    const onAddToCart = (b) => {
        console.log("called cart" + cart)
        dispatch(addToCartAction(b))
        setIsAdded(true)
    }

    const onRemoveFromCart = (b) => {
        dispatch(removeFromCartAction(b))
        setIsRemoved(true)
    }


    return (
        // <div id="left">
        //     <div>
        //         <h3>Categories</h3>
        //     </div>
        //     <div style={{"display": "block", "height": "auto", "overflow": "auto"}}>
        //         <div>

        //         </div>
        //     </div>
        // </div>

        <div>
            <div className="mb-3 text-center">
                <div className="row">
                    <div className="col-md-2">
                        <strong className="fs-3 form-label" style={{ fontFamily: 'Ubuntu', color: '#BD4B4B'}}>Categories</strong>
                        <br />
                        <br />
                        {
                            categoryList.length > 0 &&
                            <div className="col-md-12" >
                                <table className="table table-hover table-bordered pallette">
                                    <tbody>
                                        {
                                            categoryList.map(category => {
                                                return (
                                                    <tr>
                                                        <td onClick={() => { onSelectCategory(category) }} >
                                                            <h6>{category.catname}</h6>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        }
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {
                                books.length>0 &&
                                books.map(b => {
                                    let isFound = cart.filter(cartItem => cartItem.bId === b.bId).length > 0
                                    //let isFound = false
                                    console.log(isFound)
                                    return (
                                        <div className="col-md-3 col-sm-6 col-xs-12 myCardElement">
                                            <div className="card" >
                                                <div className="card-body text-center">
                                                    <img src={url + "/" + b.bfront} alt="book" className="img-fluid bookImage" />
                                                    <div className="card-title"><h5><span className="text">{b.bname}</span></h5></div>
                                                    <div className="card-text">
                                                        <h5>{b.bprice} &#8377;</h5>
                                                        <h6>Available: {b.bavCopies}</h6>
                                                        <h6>Total: {b.btCopies}</h6>
                                                        <h6><span className="text">Author: {b.authorName}</span></h6>
                                                        <h6><span className="text">Publication: {b.pubName}</span></h6>
                                                        <hr />
                                                        {
                                                            isFound === true &&
                                                            <button onClick={() => { onRemoveFromCart(b) }} className="btn btn-danger">Remove from Cart</button>
                                                        }
                                                        {
                                                            isFound === false &&
                                                            <button onClick={() => { onAddToCart(b) }} disabled={b.bavCopies==0} className="btn btn-success" >Add To Cart</button>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatBooks
