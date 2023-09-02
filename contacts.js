const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = (callback) => {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      return callback(err, null);
    }
    const contacts = JSON.parse(data);
    callback(null, contacts);
  });
};

const getContactById = (contactId, callback) => {
  listContacts((err, contacts) => {
    if (err) {
      return callback(err, null);
    }
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      return callback(new Error(`contact withID ${contactId} not found`), null);
    }
    callback(null, contact);
  });
};

const removeContact = (contactId, callback) => {
  listContacts((err, contacts) => {
    if (err) {
      return callback(err);
    }
    const updateContacts = contacts.filter((c) => c.id !== contactId);
    const updateContactsJson = JSON.stringify(updateContacts, null, 2);
    fs.writeFile(contactsPath, updateContactsJson, (err) => {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
};

const addContact = (name, phone, email, callback) => {
  listContacts((err, contacts) => {
    if (err) {
      return callback(err);
    }
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    const updateContacts = [...contacts, newContact];
    const updateContactsJson = JSON.stringify(updateContacts, null, 2);

    fs.writeFile(contactsPath, updateContactsJson, (err) => {
      if (err) {
        return callback(err);
      }
      callback(null, newContact);
    });
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
