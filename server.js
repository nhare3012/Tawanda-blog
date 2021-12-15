
const express = require('express');
const morgan = require('morgan')
const PORT = process.env.PORT || 5000
const articleRouter = require('./routes/articles');
const Article = require('./models/article.js');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();


//  CONNECT TO MONGODB
const dbURI = 'mongodb+srv://Tumelo:kanyemba@blog.hrnjj.mongodb.net/tawanda-blog?retryWrites=true&w=majority'
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true })
mongoose.connect(dbURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
// useCreateIndex: true,
}).then(() => console.log("DB Connection Successfull"))
.catch((err) => {
console.error(err);
});

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: tawanda-3012,
  api_key: 487432961982727,
  api_secret: q9KKQCVqdmTZbcNQtoaUu2Gxyt0,
}); 


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(morgan('common'))
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/articles',articleRouter);
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
      createdAt: 'desc'
    })
    res.render('articles/index', {articles: articles});
});


app.listen(process.env.PORT || 5000,() => {
  console.log("Server is up at port "+process.env.PORT);
});
