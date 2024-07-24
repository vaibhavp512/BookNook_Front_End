
import React from 'react';
import './css/Cards.css';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Card, Carousel } from 'react-bootstrap';
import { url } from './../Common/constants';



function Cards() {
    const [book, setBooks] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [count, setCount] = useState(1)

    useEffect(() => {
        console.log(`books component got loaded`)
        getBooks()
    }, [])

    const getBooks = () => {
        axios.get(url + '/book/latest').then((response) => {
            const result = response.data
            if (result.status === 'success') {
                setBooks(result.data)
                setLoaded(true)
            } else {
                alert('error while loading list of books')
            }
        })
    }


    return (
        <div className='center'>
            <div>
                <Carousel style={{ width: "90%" }}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 "
                            src="http://ceb.ac.in/knowledge-center/images/banner.jpg"
                            width="90%" height="400"
                            alt=""
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://cdn.mos.cms.futurecdn.net/nyfCUQTzVLYeCipAWbSn5V-1024-80.jpg.webp"
                            width="50%" height="400"
                            alt=""
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1474149609615-ce5628f98c80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fHNsaWRlciUyMGJvb2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                            width="90%" height="400"
                            alt=""
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <br></br>
            <br></br>
            <div style={{ overflowX: 'auto', fontSize: '14px', marginLeft: 88, marginRight: 88 }}>
                {loaded && (
                    <li className='cards__item'>
                        {book.map((b) => {
                            return (
                                <div>
                                    <Card style={{ width: '17rem', margin: '2px 12px 12px 12px', height: '30rem', }}>
                                        <Card.Img variant="top" src={url + "/" + b.bfront} className="img-fluid bookImage" />
                                        <Card.Body>
                                            <Card.Title>{b.bname}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                    </li>
                )}
            </div>
        </div>
    );
}

export default Cards;