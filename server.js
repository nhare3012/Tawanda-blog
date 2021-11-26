var PORT = process.env.PORT || 5000

const express = require('express');
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles')


//  Express App 
const app = express();



app.use(express.static(__dirname + '/public'));

// register view engine
app.set('view engine', 'ejs');


app.use('/articles',articleRouter);




// Routes
app.get('/', (req, res) => {
    const articles = [
    {
        title: 'tawanda',
        createdAt: new Date(),
        description: 'tawanda nahre'

    },
    {
        title: 'tawanda2',
        createdAt: new Date(),
        description: 'tawanda nahre2'

    }
]
    res.render('articles/index', { articles: articles } )

});

// Listen for request
app.listen(PORT);