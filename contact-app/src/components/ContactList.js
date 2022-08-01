import React,{useRef, useContext} from 'react';
import {Link} from 'react-router-dom';
import ContactCard from './ContactCard';
import ContactContext from "../contexts/ContactContext";

const ContactList=(props)=>{
    console.log("props",props);
    const {contacts}  = useContext(ContactContext);
    console.log("Context contacts => ", contacts);
    const inputEl=useRef("");

    const deleteContactHandler=(id)=>{
        props.getContactId(id)
    };

    const renderContactList=props.contacts.map((contact)=>{
        return(
            <ContactCard contact={contact} clickHandler={deleteContactHandler}></ContactCard>
        )
    });
    const getSearchTerm=()=>{
      props.searchKeyword(inputEl.current.value);
    };

    return (
        <div className="main">
          <div>
          <h2>
            Contact List
            <Link to="/add">
              <button className="ui button blue topright" style={{float: 'right'}}>Add Contact</button>
            </Link>
          </h2>
          <div className='ui search'>
            <div className='ui icon input'>
              <input ref={inputEl} type="text" placeholder='Search Contacts' className='prompt' value={props.term} onChange={getSearchTerm}/>
              <i className='search icon'></i>
            </div>
          </div>
          </div>
          <div className="ui celled list">{renderContactList.length > 0 ? renderContactList : "No contacts available" }</div>
        </div>
      );
}

export default ContactList;