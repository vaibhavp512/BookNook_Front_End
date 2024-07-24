import React from 'react'
import Shweta from '../images/Shweta.jpeg'
import Rasika from '../images/Rasika.jpeg'
import Vaibhav from '../images/Vaibhav.jpeg'
import Tushar from '../images/Tushar.jpeg'
import abt from '../images/abt.png'

const AboutUs = () => {
    return (
        <div className="center-col">
            <div className="bg-white py-3">
                <div className="container py-5">
                    <div className="row align-items-center mb-5">
                        <div className="col-lg-6 order-2 order-lg-1">
                            <h1 className="font-weight-light">Know more about us </h1>

                            <p className="font-italic text-muted mb-4">
                                <h4>The main objective of BookNook is to connect with people who want to get their favourite books at doorstep.
                                    In this pandemic, without going to library, you can still continue with your reading habbits.
                                    We are providing facility for our customer to order
                                    books and then return books according to membership plans. You can
                                    choose subscription plan according to number of books allowed to be ordered,
                                    duration of plan.</h4>
                            </p>
                        </div>
                        <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2 setting" style={{ alignSelf: 'center' }}> <img src={abt} alt="" width="300" height="300" alignSelf="center"/></div>
                    </div>
                </div>
            </div>

            <div className="bg-light py-5">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-lg-5">
                            <h2 className="display-4 font-weight-italic">Our team:</h2>
                        </div>
                    </div>

                    <div className="row text-center">

                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src={Shweta} alt="" width="200" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Shweta Bhangale</h5><span className="small text-uppercase text-muted">CEO - Founder</span>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src={Rasika} alt="" width="200" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Rasika Shrirao</h5><span className="small text-uppercase text-muted">CEO - Founder</span>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src={Vaibhav} alt="" width="200" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Vaibhav Patil</h5><span className="small text-uppercase text-muted">CEO - Founder</span>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4"><img src={Tushar} alt="" width="200" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" />
                                <h5 className="mb-0">Tushar Manore </h5><span className="small text-uppercase text-muted">CEO - Founder</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
