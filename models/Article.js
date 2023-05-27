// dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Utils = require('../utils')



// schema

const articleSchema = new mongoose.Schema({
	title: {
	  type: String,
	  required: true
	},
	content: {
	  type: String,
	  required: true
	},

	createdAt: {
	  type: Date,
	  default: Date.now,
	},

	heroImage: {
		type: String,
	},

	status: {
		type: String,
	}

  });
  
  const articleModel = mongoose.model('articles', articleSchema);

  // export
module.exports = articleModel