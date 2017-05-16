
const express = require('express')
const pg = require('pg')
const global = require('../config/config')

const tableName = 'contacts'

const app = express()

function retrieveAllContacts(req, res) {
	pg.connect(global.conString, function (err, client) {
		if (err) {res.send(err)}
		client.query('SELECT * FROM contacts;', [], function (err, result) {
			if (err) {res.send(err)}
			else {res.json({data : result.rows})}
		})
	})
}

function createContact(req, res) {
	const contact = req.body
	console.log(contact)
	pg.connect(global.conString, function(err, client) {
		if (err) {res.send(err)}
		client.query('INSERT INTO contacts (first_name,last_name,address,contact_number,email_address) VALUES ($1,$2,$3,$4,$5);',
			[contact.first_name,contact.last_name,contact.address,contact.contact_number,contact.email_address], function(err, result) {
			if (err) {res.send(err)}
			else {res.json({data : {isSuccessful : true,
							  userDetails : req.body}})}
		})
	})
}

function searchContact(req, res) {
	var id = req.params.id
	pg.connect(global.conString, function(err, client) {
		if (err) {res.send(err)}
		client.query('SELECT * FROM contacts WHERE _id=$1',[id],function(err, result) {
			if (err) {res.send(err)}
			else {res.json({data : result.rows})}
		})
	})
}

function updateContact(req, res) {
	const contact = req.body
	var id = req.params.id
	console.log(contact)
	pg.connect(global.conString, function(err, client) {
		if (err) {res.send(err)}
		client.query('UPDATE contacts SET (first_name,last_name,address,contact_number,email_address) = ($1,$2,$3,$4,$5) WHERE _id=$6;',
			[contact.first_name,contact.last_name,contact.address,contact.contact_number,contact.email_address,id], function(err, result) {
			if (err) {res.send(err)}
			else {res.json({data : {isSuccessful : true,
							  userDetails : req.body}})}
		})
	})
}

function deleteContact(req, res) {
	var id = req.params.id
	pg.connect(global.conString, function(err, client) {
		if (err) {res.send(err)}
		client.query('DELETE FROM contacts WHERE _id=$1',[id],function(err, result) {
			if (err) {res.send(err)}
			else (res.json({data : {isSuccessful : true}}))
		})
	})
}

module.exports = {retrieveAllContacts, createContact, searchContact, updateContact, deleteContact}