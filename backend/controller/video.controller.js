
const {videoService} = require("../services");
const {videoValidation} = require('../validations');
const catchAsync = require('../utils/catchAsync');
const ApiError = require("../utils/ApiError");
 


const getAllVideos = catchAsync(async (req, res) => {
    if(req.query){
        
        if(req.query.genre) req.query.genre = req.query.genre.split(',');       
        const {value, error} = videoValidation.validateVideo(req.query);
        if(error) return res.status(400).send(error.message);
        const videos = await videoService.getFilterVideos(value);
        
        // console.log(videos)
        return res.status(200).send(videos);

    }

    const videos = await videoService.getAllVideos();
    res.status(200).send(videos);
})

const getVideoById = catchAsync(async (req, res) => {
    const {value, error} = videoValidation.validateId(req.params);
    if(error) return res.status(404).send('Invalid Video Id');
    const video = await videoService.getVideoById(req.params.videoid); 
    res.status(200).send(video)
});    

const addVideo = catchAsync(async (req, res) => {
    if(req.body){
        const {value, error} = videoValidation.validateVideoBody(req.body);
        if(error) throw new ApiError(400, error.message); 
        const video = await videoService.addVideo(value);
        return res.status(201).send(video);  
    } 
 
    res.status(400).send('missing video info');
    
});

const videoVoteUpdate = catchAsync(async (req,res) => {

    if(req.params){
        const {error} = videoValidation.validateId(req.params);
        if(error) return res.status(400).send(error);   
        const {error:err} = videoValidation.validateVoteBody(req.body);
        if(err){throw new ApiError(400, err.message)}
        const video = await videoService.updateVote(req.params.videoid, req.body);
        return res.sendStatus(204);   
    } 

    res.status(400).send('no id ');
})

const videoViewsUpdate = catchAsync(async (req, res)=>{
    if(req.params){
        const {error} = videoValidation.validateId(req.params);
        if(error) throw new ApiError(400, error.message);  
        await videoService.updateViews(req.params.videoid);
        return res.sendStatus(204);
    }
    res.status(400).send('no id') 
})

module.exports = { 
    getAllVideos,
    getVideoById, 
    addVideo,
    videoVoteUpdate,
    videoViewsUpdate
}