const  express = require('express');
const Article = require('./../models/article');
const Auth = require('./../models/Auth')
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(request, file,callback){
        callback(null,'./public/uploads/images')
    },

    filename:function(request, file,callback){
        callback(null,Date.now() + file.originalname)
    },


})

const upload = multer({
    storage:storage,
    limit:{
        fieldSize:1024 * 1024 * 3
    }
})

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article()});

});

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
  })

router.post('/',upload.single('image'), async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        time : req.body.time ,
        likes: req.body.likes,
        image: req.file.filename,
        
    })
    try{

     article =  await article.save()
     res.redirect(`/articles/${article.slug}`)
    }catch(err) {
        
        res.render('articles/new', { article: article });

    }
    
})




router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
  })


module.exports = router;