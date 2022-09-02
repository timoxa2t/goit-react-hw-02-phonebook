import React, {Component} from "react";
import ContactForm from "./ContactForm";
import ContactsList from "./ContactsList";
import Section from "./Section";
import FilterConstacts from "./FilterConstacts";
import { nanoid } from 'nanoid'


export class App extends Component {

  state = {
    contacts: [],
    filter: ''
  }

  addContact = ({name, number}) => {
    const {contacts} = this.state
    if(contacts.find(item => item.name === name)){
      alert(name + " is already in contacts")
      return false
    }
    const newContacts = [...contacts]
    newContacts.push({name, number, id: nanoid()})
    this.setState({
      contacts: newContacts
    })
    return true
  }



  handleFilterChange = ({target}) => {
    this.setState({
      filter: target.value
    })
  }

  removeContact = (id) => {
    const {contacts} = this.state
    const newContacts = contacts.filter(item => item.id !== id)
    this.setState({
      contacts: newContacts
    })
  }

  render(){
    const {contacts, filter} = this.state
    return (
      <div>
        <Section title="Phonebook">
          <ContactForm 
            addContact={this.addContact} 
          />
        </Section>
        
        <Section title="Contacts">
          <FilterConstacts onFilterChange={this.handleFilterChange}/>
          <ContactsList contacts={filteredContacts(contacts, filter)} removeContact={this.removeContact}/>
        </Section>      
      </div>
    )
  }
};

const filteredContacts = (contacts, filter) => {
    if(!filter) return contacts
    filter = filter.toLowerCase()
    return contacts.filter(({name}) => name.toLowerCase().includes(filter))
}
