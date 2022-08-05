import React,{useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import ContactContext from "../contexts/ContactContext";
import api from "../api/contact";
import { v4 as uuid } from "uuid";

const AddContact=(props)=>{

    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const {contacts, setContacts}  = useContext(ContactContext);

    let navigate = useNavigate();
    const add=(e)=>{
        e.preventDefault();
        if(name === "" || email === ""){
            alert("All the fields are mandatory!");
            return;
        }
        const state={name, email}
        addContactHandler(state);
        setName("")
        setEmail("")
        console.log("props",props);
        navigate("/")
    };
    const addContactHandler = async(contact)=>{
        console.log(contact);
        const body={
          id: uuid(),
          ...contact
        };
        const response = await api.post("/contacts",body)
        setContacts([...contacts, response.data])
    };
    return(
        <div className='ui main'>
            <h2>Add Contact</h2>
            <form className='ui form' onSubmit={add}>
                <div className='field'>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                </div>
                <div className='field'>
                    <label>Email</label>
                    <input type="text" name="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <button className='ui button blue'>Add</button>
            </form>
        </div>
    );
}

export default AddContact;