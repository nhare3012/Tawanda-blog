// import { stripHtml } from "string-strip-html";
const mongoose = require('mongoose');
const slugify = require('slugify')
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
// const stripHtml = require('string-strip-html');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,

    },
    createdAt: {
        type: Date,
        default: new Date().toString()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    likes: {
        type: String,
        
    },
    image: {
        type: String,
        
    },
    time : { type : Date, default: Date.now }
   
})






articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }

    next()
})

articleSchema.pre('validate', function (next) {
    //check if there is a description
    if (this.description) {
      this.description = htmlPurify.sanitize(this.description);
      this.snippet = stripHtml(this.description.substring(0, 200)).result;
    }
  
    next();
  });
  

module.exports = mongoose.model('Article', articleSchema);
