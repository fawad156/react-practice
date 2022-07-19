import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
//import ContactCard from './ContactCard';
import ContactList from './ContactList';
function App() {
  
  const [contacts, setContacts]=useState([]);

  const addContactHandler = (contact)=>{
    console.log(contact);
    setContacts([...contacts, contact])
  };
  const contact_list=[
    {
      id: "1",
      name: "Max",
      email: "max@invozone.com"
    },
    {
      id: "2",
      name: "Jack",
      email: "jack@invozone.com"
    },
    {
      id: "2",
      name: "erick",
      email: "erick@invozone.com"
    }
  ];
  return (
    <div className='ui container'>
      <Header />
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts}/>
    </div>
  );
}

export default App;
