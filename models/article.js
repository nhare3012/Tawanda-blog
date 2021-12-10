const mongoose = require('mongoose');
const slugify = require('slugify')


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

module.exports = mongoose.model('Article', articleSchema);
