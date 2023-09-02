const { Command } = require("commander");
const program = new Command();
const chalk = require('chalk'); 

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = ({ action, id, name, email, phone }) => {
  const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  } = require("./contacts");

  switch (action) {
    case "list":
      listContacts((err, contacts) => {
        if (err) {
          console.log("Error al listar", err);
          return;
        }
        console.table( contacts);
      });
      break;

    case "get":
      getContactById(id, (err, contact) => {
        if (err) {
          console.error(`Error al obtener contacto con el ID ${id}`, contact);
          return;
        }
        console.log(chalk.redBright("contacto encontrado"), contact);
      });
      break;

    case "add":
      addContact(name, email, phone, (err, newContact) => {
        if (err) {
          console.error("error al agregar contacto", err);
          return;
        }
        console.log("Nuevo contacto agregado", newContact);
      });
      break;

    case "remove":
      removeContact(id, (err) => {
        if (err) {
          console.error("Error al eliminar el contacto", err);
          return;
        }
        console.log(chalk.blue("Contacto Eliminado con exito"));
      });
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(argv);
