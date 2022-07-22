import React,{useState} from 'react';
import { useNavigate,useLocation } from "react-router-dom";

const EditContact=(props)=>{
    const location = useLocation();
    let navigate = useNavigate();

    const { id,name, email } = location.state.contact;
   
    const [update_name, setName]=useState(name);
    const [update_email, setEmail]=useState(email);

    const update=(e)=>{
        e.preventDefault();
        if(update_name === "" || update_email === ""){
            alert("All the fields are mandatory!");
            return;
        }
        const state={id, name: update_name, email: update_email}
        props.updateContactHandler(state);
        setName("")
        setEmail("")
        navigate("/")
    };
    return(
        <div className='ui main'>
            <h2>Add Contact</h2>
            <form className='ui form' onSubmit={update}>
                <div className='field'>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" value={update_name} onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" value={update_email} onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <button className='ui button blue'>Update</button>
            </form>
        </div>
    );

}

export default EditContact;