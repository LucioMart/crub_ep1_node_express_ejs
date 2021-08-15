const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');

const finalPrice = require('../utils/finalPrice')

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('products', {
			products, 
			toThousand,
			finalPrice
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(product => product.id === +req.params.id)
		// res.send(product)
		return res.render('detail', {
			product,
			toThousand,
			finalPrice
		})
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount, category, description} = req.body
		let product = {
			id : products[products.length - 1].id + 1,
			name, 
			price: +price,
			discount : +discount,
			category,
			description,
			image: 'default-image.png'
		}
		products.push(product)
		// res.send(products)
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf-8')
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(product => product.id === +req.params.id)

		return res.render('product-edit-form', {
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
};

module.exports = controller;