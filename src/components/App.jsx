import React, {useState} from "react";
import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";
import Section from "./Section";
import FilterConstacts from "./FilterConstacts";
import { nanoid } from 'nanoid'

export const App = () => {

  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'}
  ])

  const [filter, setFilter] = useState('')

  const addContact = ({name, number}) => {
    if(contacts.find(item => item.name === name)){
      alert(name + " is already in contacts")
      return Promise.reject()
    }
    const newContacts = [...contacts]
    newContacts.push({name, number, id: nanoid()})
    setContacts(newContacts)
    return Promise.resolve()
  }



  const handleFilterChange = ({target}) => {
    setFilter(target.value)
  }

  const removeContact = (id) => {
    const removeIndex = contacts.findIndex(item => item.id === id)
    if(removeIndex < 0) return
    setContacts([...contacts.slice(0, removeIndex), ...contacts.slice(removeIndex + 1, contacts.length)])
  }


  return (
    <div>
      <Section title="Phonebook">
        <ContactForm 
          addContact={addContact} 
        />
      </Section>
      
      <Section title="Contacts">
        <FilterConstacts onFilterChange={handleFilterChange}/>
        <ContactsList contacts={filteredContacts(contacts, filter)} removeContact={removeContact}/>
      </Section>      
    </div>
  );
};

const filteredContacts = (contacts, filter) => {
    if(!filter) return contacts
    filter = filter.toLowerCase()
    return contacts.filter(({name}) => name.toLowerCase().includes(filter))
}
