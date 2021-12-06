const  express = require('express');
const Article = require('./../models/article');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article()});

});

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')
    res.render('articles/show', { article: article })
  })

router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        postedAt: req.body.date,
        
    })
    try{

     article =  await article.save()
     res.redirect(`/articles/${article.slug}`)
    }catch(err) {
        
        res.render('articles/new', { article: article });

    }
    
})



// POST request for first user
// app.post('/user', (req, res) => {
//     var newUser = new User({
//         name: req.body.name
//     });
//     newUser.save().then(user => {
//         res.send(user);
//     }, (e) => {
//         res.status(400).send(e);
//     });
// });

// POST request for post
// app.post('/:id', (req, res) => {
//     // Create post and saving
//         _id: req.params.id;
//         var post = new Post({
//             title: req.body.title,
//             postedBy: _id,
//             comments: [{
//                 text: req.body.comments[0].text,
//                 postedBy: req.body.postedByUserId
//             }]
//         });
//         post.save().then(post => {
//             res.send(post);
//         }, (e) => {
//             res.status(400).send(e);
//         }
// });


router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
  })


module.exports = router;