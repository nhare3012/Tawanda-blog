var PORT = process.env.PORT || 5000
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// connect to the mongodb databases

const dbURI = 'mongodb+srv://Tumelo:kanyemba@blog.hrnjj.mongodb.net/tawanda-blog?retryWrites=true&w=majority'



mongoose.connect(
    dbURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Connection to mongodb database was successful!");
    }
  );
  
  





// middlewares

app.use(express.urlencoded({extend: true}))
app.use(express.static("public"));
app.set("view engine", "ejs")


// routes
app.use(require("./routes/index"))
app.use(require("./routes/compose"))
app.use(require("./routes/blog"))



// Listen for request
app.listen(PORT);