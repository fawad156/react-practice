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

  const updateContactHandler=async(contact)=>{
    const response = await api.put(`/contacts/${contact.id}`,contact);
    const {id,name,email} = response.data;
    setContacts(
      contacts.map((contact)=>{
        return contact.id === id ? {...response.data} : contact 
      })
    )
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

  const removeContactHandler=async(id)=>{
    await api.delete(`/contacts/${id}`);

    const newContactList = contacts.filter((contact)=>{
      return contact.id !== id
    })
    setContacts(newContactList)
  }

  const searchHandler=(searchTerm)=>{
    setSearchTerm(searchTerm);
    if (searchTerm != ""){
      const newContactList=contacts.filter((contact)=>{
        return Object.values(contact).join(" ").toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
      });
     setSearchResults(newContactList)
    }
    else{
      setSearchResults(contacts);
    }
  };
 
  return (
    <div className='ui container'>
      <ContactContext.Provider value={{contacts, setContacts, searchResults, setSearchResults}}>
      <Router>
        <Header />
        <Routes>
        <Route path="/" element={
         <ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler}/>
        }/>
        <Route path="/add" element={
          <AddContact addContactHandler={addContactHandler}/>
        }/>
        <Route path="/contact/:id" element={<ContactDetails />} />
        <Route path="/edit" element={
          <EditContact updateContactHandler={updateContactHandler}/>
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
