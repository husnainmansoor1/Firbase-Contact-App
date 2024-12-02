import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactCard from "./components/ContactCard";
import AddandUpdate from "./components/AddandUpdate";
import useDisclosure from "./assets/CustomHook/useDisclosure";
import NotFoundContact from "./components/NotFoundContact";



const App = () => {
  const [Contacts, setContacts] = useState([]);
    const{isOpen,onClose,onOpen}=useDisclosure();
  
  
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db,"Contact");
        onSnapshot(contactsRef,(Snapshot)=>{
          
        const contactList = Snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        });
        setContacts(contactList);
        return contactList;
        })
      } catch (error) {
        console.log(error)
      }
  
    };
    getContacts();
  }, [])
  
  const filterContacts = (e) =>{
    const value = e.target.value;
    
    const contactsRef = collection(db,"Contact");
    onSnapshot(contactsRef,(Snapshot)=>{
      
    const contactList = Snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    const filteredContact = contactList.filter((contact) => 
      contact.name.toLowerCase().includes(value.toLowerCase())
    )
    setContacts(filteredContact);
    return filteredContact;
    })
    
  }
  return (
    <>
    <div className="mx-auto max-w-[480px] px-4">
      <Navbar />
      <div className="flex gap-2 ">
      <div className="flex flex-grow relative items-center ">
        <FiSearch     
        className="absolute  text-white ml-2  text-3xl "/>
        <input onChange={filterContacts} type="text" className="bg-transparent border pl-9 text-white rounded-md border-white h-10 flex-grow " />
      </div>
      <div>
          <FaCirclePlus onClick={onOpen} className="text-white text-5xl cursor-pointer" />

        </div>
        
      </div>

      <div className="mt-4 gap-4 flex flex-col" >
        {Contacts.length<=0 ?(<NotFoundContact/>) :(Contacts.map((contact) => (
          <ContactCard key={contact.id}  contact={contact} />
        ))
      )}   
               
        </div>
      </div>
    <AddandUpdate isOpen={isOpen} onClose={onClose} />
    <ToastContainer />
      </>
  );
};

export default App;
