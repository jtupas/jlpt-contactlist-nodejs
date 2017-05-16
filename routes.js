const express = require('express')
const router = express.Router()
const contactsController = require('./controller/contact.js')

router.route('/api/contacts')
	.get(contactsController.retrieveAllContacts)
	.post(contactsController.createContact)

router.route('/api/contacts/:id')
	.get(contactsController.searchContact)
	.put(contactsController.updateContact)
	.delete(contactsController.deleteContact)

module.exports = router