import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import { v4 as uuid } from "uuid";
import './App.css';
import Header from './Header';
//import AddContact from './AddContact';
import AddContact from './AddContactF';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
function App() {
  const LOCAL_STORAGE_KEY="contacts"

  const [contacts, setContacts]=useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []
  );

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))
  },[contacts]);
  

  const addContactHandler = (contact)=>{
    console.log(contact);
    setContacts([...contacts, {id: uuid(), ...contact}])
  };

  const removeContactHandler=(id)=>{
    const newContactList = contacts.filter((contact)=>{
      return contact.id !== id
    })
    setContacts(newContactList)
  }
 
  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={
         <ContactList contacts={contacts} getContactId={removeContactHandler}/>
        }/>
         <Route path="/add" element={
          <AddContact addContactHandler={addContactHandler}/>
        }/>
        <Route path="/contact/:id" element={<ContactDetails />} />
        </Routes>
        </Router>
         {/* simple one page component render */}
      {/* <Header />
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
    </div>
  );
}

export default App;
