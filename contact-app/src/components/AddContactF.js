import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const AddContact=(props)=>{

    const [state, setState]=useState({name: "",email: ""});
    let navigate = useNavigate();
    const add=(e)=>{
        e.preventDefault();
        if(state.name === "" || state.email === ""){
            alert("All the fields are mandatory!");
            return;
        }
        props.addContactHandler(state);
        setState({name: "", email: ""})
        console.log("props",props);
        navigate("/")
    };
    return(
        <div className='ui main'>
            <h2>Add Contact</h2>
            <form className='ui form' onSubmit={add}>
                <div className='field'>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" value={state.name} onChange={(e)=>setState({name: e.target.value})}></input>
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" value={state.email} onChange={(e)=>setState({email: e.target.value})}></input>
                </div>
                <button className='ui button blue'>Add</button>
            </form>
        </div>
    );
}

export default AddContact;