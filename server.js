const express = require('express');
const articleRouter = require('./routes/articles')

//  Express App 
const app = express();

app.use(express.static(__dirname + '/public'));

// register view engine
app.set('view engine', 'ejs');


app.use('/articles',articleRouter);




// Routes
app.get('/', (req, res) => {
    const articles = [{
        title: 'tawanda',
        createdAt: Date.now(),
        decription: 'tawanda nahre'

    }]
    res.render('articles/index', { articles: articles } )

});

// Listen for request
app.listen(5000);