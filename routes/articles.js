const express = require('express');
const Article = require('./../modules/article');
const router = express.Router();


router.get('/new', (req, res) => {
    res.render('article/new')
  });

router.post('/',(req, res) => {
  const article = new Article({
    
  })
  
})
  




module.exports = router