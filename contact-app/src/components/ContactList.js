import React from 'react';
import {Link} from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList=(props)=>{
    console.log("props",props);

    const deleteContactHandler=(id)=>{
        props.getContactId(id)
    };

    const renderContactList=props.contacts.map((contact)=>{
        return(
            <ContactCard contact={contact} clickHandler={deleteContactHandler}></ContactCard>
        )
    });
    return (
        <div className="main">
          <div>
          <h2>
            Contact List
            <Link to="/add">
              <button className="ui button blue right">Add Contact</button>
            </Link>
          </h2>
          </div>
          <div className="ui celled list">{renderContactList}</div>
        </div>
      );
}

export default ContactList;