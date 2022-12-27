const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    videoLink: {
        type:String,
        validate(value) {
            if (!value.match(/youtube.com\/embed\/\S{11}$/)) {
              throw new Error("provide valid youtube link");
            }
          }
    },

    title:{
        type:String,
        required: true,
    },

    genre:{
        type:String,
        enum:["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All" ]
    },

    contentRating:{
        type:String,
        enum:["Anyone", "7+", "12+", "16+", "18+"],
    },
    
    releaseDate:{
        type:Date,
        default: () => Date.now(),
    },

    previewImage:{
        type:String,
    },

    votes:{
        upVotes:Number,
        downVotes:Number,
    },

    viewCount:{
        type:Number,
        default:0,
    },
    

    
})
const  Video =  mongoose.model('Video', videoSchema)

module.exports = Video