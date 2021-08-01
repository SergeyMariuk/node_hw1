const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve(__dirname , './db/contacts.json')

const listContacts = async () => {
    const data = await fsp.readFile(contactsPath, {encoding: 'utf8'})
    return JSON.parse(data)
  }

  const getContactById = async (contactId) => {
    const tmpData = await listContacts()
    const contactById = tmpData.find(byId => byId.id === Number(contactId))
    return (contactById || null)
  }
  
  const removeContact = async(contactId) => {
    const tmpData = await listContacts()
    const result = tmpData.filter(contact => contact.id != contactId)
    await fsp.writeFile(contactsPath, JSON.stringify(result), {encoding: 'utf8'})
    return `User with id: ${contactId} was removed successfully`
  }

  const addContact = async(name, email, phone) => {
    const tmpData = await listContacts()

    const newContact = {
        id: [...tmpData].pop().id+1,
        "name": name,
        "email": email,
        "phone": phone
    }
    tmpData.push(newContact);
    await fsp.writeFile(contactsPath, JSON.stringify(tmpData))
    return newContact
  }

module.exports = {listContacts, addContact, getContactById, removeContact}