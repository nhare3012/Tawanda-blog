const express = require('express');
const articleRouter = require('./routes/articles');


const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/articles', articleRouter);


app.get('/',  (req, res) => {
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
     res.render('index', {articles: articles})
  })


app.listen(5000)