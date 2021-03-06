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

// AUTH ROUTES


//register end point
router.post('/register', async (req,res)=> {


    // const confirm = await User.find({Username : req.body.username ,email : req.body.email})
     //confirm && res.status(400).json('this user or email exist');
     try {
     const salt = await bcrypt.genSalt(10);
     const hashedPass = await bcrypt.hash(req.body.password, salt);
 
 const savedPost = await new User({
         username: req.body.username,
         email: req.body.email,
         password : hashedPass       
 
 })
 
      const resultPost = await savedPost.save()
 
      res.status(200).json(resultPost);
   } catch (error) {
      res.status(500).json(error); 
   }
 
 })
 
 
 //login endpoint
 router.post('/login', async (req,res)=>{
 
     try {
         const user = await User.findOne({username : req.body.username});
         !user && res.status(400).json('wrong user');
 
         const validate = await bcrypt.compare(req.body.password,user.password);
         !validate && res.status(400).json('wrong password');
 
         const {password, ...others} = user._doc;
 
         res.status(200).json(others);
 
 
     } catch (error) {
        res.status(500).json(error); 
     }
 
 
 
 
 })









router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
  })


module.exports = router;