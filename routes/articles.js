const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', {article: new Article()} )

});

router.get('/:id', (req, res) => {
    res.send(req.params.id)
} )

router.post('./', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description
    })
     try{
         article = await article.save()
         res.redirect(`/articles/${aricle.id}`)
     } catch (e) {
         console.log(e)
         res.render('articles/new', {article: article} );
     }
     
})


module.exports = router;