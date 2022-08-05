import React, { useState, useEffect, useContext } from 'react';
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import { v4 as uuid } from "uuid";
import './App.css';
import Header from './Header';
//import AddContact from './AddContact';
import AddContact from './AddContactF';
import ContactList from './ContactList';
import ContactDetails from './ContactDetails';
import EditContact from './EditContact';
import api from "../api/contact";
import ContactContext from "../contexts/ContactContext";
function App() {

  const retrieveContacts=async()=>{
    const response = await api.get("/contacts");
    return response.data;
  };

  
  const [contacts, setContacts]=useState([]);
  const [searchTerm, setSearchTerm]=useState("");
  const [searchResults, setSearchResults]=useState([]);
  
  useEffect(()=>{
    const getAllContacts=async()=>{
      const allContacts= await retrieveContacts();
      if (allContacts) setContacts(allContacts)
    };
    getAllContacts()
  },[]);

 
  return (
    <div className='ui container'>
      <ContactContext.Provider value={{contacts, setContacts, searchResults, setSearchResults, searchTerm, setSearchTerm}}>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={
         <ContactList/>
        }/>
        <Route path="/add" element={
          <AddContact/>
        }/>
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/edit" element={
          <EditContact />
        }/>
        </Routes>
        </Router>
         {/* simple one page component render */}
      {/* <Header />
      <AddContact addContactHandler={addContactHandler}/>
      <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
      </ContactContext.Provider>
    </div>
    
  );
}

export default App;
