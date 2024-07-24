import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <div className="list-group" style={{width:"20%"}}>
                <Link to="/edit">
                    <a className="list-group-item list-group-item-action">edit profile</a>
                </Link>
                <Link to="/changePassword">
                    <a className="list-group-item list-group-item-action">change password</a>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard
