import React  from "react"
import { users } from "../Welcome/Welcome"

import './style.css'

export function Profile() {
    return (
        <div className='profile_page'>
            <div className="profile_data">
                <div>Name: {users[0].firstName}</div>
                <div>LastName: {users[0].lastName}</div>
                <div>Email: {users[0].emailName}</div>
            </div>
        </div>
    )
}