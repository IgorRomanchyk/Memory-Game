import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser, restart } from "../../reducer/actions";
import { Difficulty } from "./Difficulty"
import { CardShirt } from "./CardShirt";
import { useSelector } from "react-redux";
import history from '../../history'

import './style.css'

export let users = JSON.parse(localStorage.getItem("allUsers"));

export function Welcome() {
    const dispatch = useDispatch()
    const [difficulty, setDiff] = useState(36);
    const [icon, setIcon] = useState('numbers');
    const usersNew = useSelector(state => state.users) 
    console.log(usersNew)

    const [inputValues, setState] = useState({
        firstName: '',
        lastName: '',
        emailName: '',
    })

    const onInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            ...inputValues,
            [name]: value
        });
    }

    const onAddClick = () => {
        if(users == null) {
            users = [];
            let newObject = {
                firstName: inputValues.firstName, 
                lastName: inputValues.lastName,
                emailName: inputValues.emailName,
            }
            localStorage.setItem('users', JSON.stringify(newObject));
            users.push(newObject)
            localStorage.setItem('allUsers', JSON.stringify(users));
            
            setState({
                firstName: '',
                lastName: '',
                emailName: '',
            })
            dispatch(addUser(true))
        } 
    }
    return (
        <div className='container'>
            <div className='welcome_page'>
                {users ? <h2 className='welcome_title'>Welcome to MMG {users[0].firstName}</h2> : 
                    <h2 className='welcome_title'>Welcome to MMG</h2>}
                {users ? null : 
                    <form className='form_game'>
                        <label>
                            <input  type="text" 
                                    value={inputValues.firstName} 
                                    onChange={onInputChange} 
                                    placeholder="First Name" 
                                    name="firstName">
                            </input>
                        </label>
                        <label>
                            <input  type="text" 
                                    value={inputValues.lastName} 
                                    onChange={onInputChange} 
                                    placeholder="Last Name"
                                    name="lastName">
                            </input>
                        </label>
                        <label>
                            <input type="email" 
                                    value={inputValues.emailName} 
                                    onChange={onInputChange} 
                                    placeholder="Email Name"
                                    name="emailName">     
                            </input>
                        </label>
                    </form>}
                <Difficulty setDiff={setDiff} />
                <CardShirt setIcon={setIcon}/>
                <button className='welcome_button' 
                        disabled={users ? null : (!inputValues.firstName || !inputValues.lastName || !inputValues.emailName)}
                        onClick={ (e) => {
                            onAddClick(e)
                            dispatch(restart(difficulty, icon))
                            history.push('./game')
                        }}>
                    Start Game
                </button>
            </div>
        </div>
    )   
}
