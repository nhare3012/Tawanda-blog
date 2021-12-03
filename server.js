
const express = require('express');
const PORT = process.env.PORT || 5000
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

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
   

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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



app.listen(PORT)
