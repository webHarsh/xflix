const Joi = require('joi');
const {objectId, videoLink} = require('./custom.validation')

const videoQuery = Joi.object().keys({
        title: Joi.string(),
        contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+").insensitive(),
        genre: Joi.array().items(Joi.string().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle","All").insensitive()),
        sortBy: Joi.string().valid('releaseDate', 'viewCount').insensitive()
    }).unknown(true); 

const videoId =   Joi.object().keys({
        videoid:Joi.string().custom(objectId),
      })

 
const videoBody = Joi.object().keys({
    videoLink: Joi.string().required().custom(videoLink),
	title: Joi.string().required(),
	genre: Joi.string().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle","All").required().insensitive(),
	contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+").required().insensitive(),
	releaseDate: Joi.string().required(),
    previewImage:Joi.string().required()
})
       
const voteBody = Joi.object().keys({
    vote: Joi.string().valid("upVote", "downVote").insensitive().messages({"string.empty": `vote is required`}),
    change: Joi.string().valid("increase", "decrease").messages({"string.empty": `vote is required`})
})

const validateVoteBody = (vote) =>{
    return voteBody.validate(vote);
}

const validateVideo = (query) => {
    return videoQuery.validate(query);    
};

const validateId = (id) => {
    return videoId.validate(id);
};

const validateVideoBody = (body) => {
    return videoBody.validate(body);
};
 
module.exports = {
    validateVideo,
    validateId,
    validateVideoBody,
    validateVoteBody
}