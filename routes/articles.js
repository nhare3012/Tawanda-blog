const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', {title: 'Create a new Blog '} )

});

router.post('./', (req, res) => {
     
})


module.exports = router;