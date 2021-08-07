const { render } = require('ejs');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThosand')

const controller = {

	index: (req, res) => {
		// res.send(products)
		return res.render('index' , {
			products,
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
