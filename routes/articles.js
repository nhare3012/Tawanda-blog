const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
  })
  
  router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
  })
  

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