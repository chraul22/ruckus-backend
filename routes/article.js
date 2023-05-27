const express = require('express');
const router = express.Router();
const Utils = require('../utils');
const Article = require('../models/Article');
const mongoose = require('mongoose');
const path = require('path')

// POST - create new article
router.post ('/', (req, res) =>{
	if (Object.keys(req.body).length === 0){
		return res.status(400).send({message:"Article content cannot be empty"})
			}
let newArticle =  new articleModel(req.body)
newArticle.save()
	.then(articles => {
		
		return res.status(201).json(articles)
		
		})
	.catch(err => {
		console.log(err)
		return res.status(500).send({
			message: "Problem submitting article",
			error:err
			})
		})
	})


// PUT - Update article
router.put('/:id/approve', (req, res) => {
	const { id } = req.params;
  
	Article.findByIdAndUpdate(id, { status: 'Approved' }, { new: true })
	  .then(updatedArticle => {
		if (!updatedArticle) {
		  return res.status(404).json({ message: 'Article not found' });
		}
  
		res.status(200).json(updatedArticle);
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({ message: 'Problem updating article status', error: err });
	  });
  });


// GET - get all articles
router.get('/', Utils.authenticateToken, (req, res) => {
	Article.find()
	  .populate('articles', '_id, title, content')
	  .then(articles => {
		if (articles == null) {
		  return res.status(404).json({
			message: "No articles found"
		  });
		}
		res.json(articles);
	  })
	  .catch(err => {
		console.log(err);
		res.status(500).json({
		  message: "Problem getting articles"
		});
	  });
  });




// Export
module.exports = router;
