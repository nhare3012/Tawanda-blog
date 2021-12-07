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
    
    time : { type : Date, default: Date.now }
   
})


// const UserSchema = new mongoose.Schema({    
//     name: { 
//       type: String,
//       required: true, 
//       minlength : 2,     
//       maxlength: 20,      
//       trim : true,
//        }
//     });

// const PostSchema = new mongoose.Schema({ 
//     title:{
//       type: String,
//       required: true, 
//       minlength : 2 ,  
//       maxlength: 20,    
//       trim : true
//     },
//     postedBy: {       
//       type: mongoose.Schema.Types.ObjectId,        
//       ref: 'User'    
//     },    
//     comments: [{        
//       text: String,        
//       postedBy: {            
//         type: mongoose.Schema.Types.ObjectId,           
//         ref: 'User'        
//       }        
//     }]
// })



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
// module.exports = mongoose.model('Article', UserSchema);
// module.exports = mongoose.model('Article', PostSchema);