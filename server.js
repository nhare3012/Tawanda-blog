const express = require('express');
const articleRouter = require('./routes/articles');
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
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/articles',articleRouter);

app.get('/', (req, res) => {
    const articles = [
        {
          title: 'My first Article',
          description:'its a long way to freedom',
          createdAt: new Date()
        },
        {
         title: 'My first Article2',
         description:'its a long way to freedom2',
         createdAt: new Date()
       },
       {
         title: 'My first Article3',
         description:'its a long way to freedom3',
         createdAt: new Date()
       },
       {
         title: 'My first Article3',
         description:'its a long way to freedom3',
         createdAt: new Date()
       },
      ]
    res.render('articles/index', {articles: articles});
});



app.listen(5000)
