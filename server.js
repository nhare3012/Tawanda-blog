var port = process.env.PORT || 5000;
const mongoose = require('mongoose'); 
const express = require('express');

//  CONNECT TO MONGODB
const dbURI = 'mongodb+srv://Tumelo:kanyemba@blog.hrnjj.mongodb.net/tawanda-blog?retryWrites=true&w=majority'
const articleRouter = require('./routes/articles');



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true })
   .then( (results) => app.listen(port))
   .catch((err) => console.log(err) );

//  Express App 
const app = express();

app.use(express.static(__dirname + '/public'));

// register view engine
app.set('view engine', 'ejs');


app.use('/articles',articleRouter);
app.use(express.urlencoded({extended:false}))




// Routes
app.get('/', (req, res) => {
    
    res.render('articles/index', { articles: articles } )

});



// Listen for request
