const {Video} = require('../models');
const ApiError = require('../utils/ApiError.js')


const getVideoById = async(id) => {
    try {
        const video = await Video.findById(id);
        return video
    } catch (error) {
        throw new Error('Some error from database');
    }
}

const getAllVideos = async () => {
    
   
    try {       
        const videos = await Video.find({});               
        return videos 
    } catch (error) {
        return new Error(error.message)
    }
}

const sortBy = (sortBy, videos) => {
    
     
    if(sortBy === 'releaseDate'){
        
        videos.sort((a,b) => {
            if(a.releaseDate > b.releaseDate)return -1
            else if(a.releaseDate < b.releaseDate) return 1
            return 0;
            })
    }
    else{
       videos.sort((a,b) => {
        if(a.viewCount > b.viewCount)return -1
        else if(a.viewCount < b.viewCount) return 1
        return 0;
        }); 
    }

    return videos;

    
}


const getFilterVideos = async (query) => {
    const filterChecks = {};
    if(query.genre){
        filterChecks.genre = new RegExp((query.genre.join('|')), "i");
    }
    
    // if(query.contentRating ){
    //     if(query.contentRating.length > 2){
    //         filterChecks.contentRating = {$regex: new RegExp("(^1[0-"+query.contentRating[1]+"])|(^[0-9])\\+$", "g")};        
    //     }else{
    //         filterChecks.contentRating = {$regex: new RegExp("^[0-"+query.contentRating[0]+"]\\+$", "g")};
    //     }
    // }
    if(query.contentRating ){
        filterChecks.contentRating = {$regex: new RegExp(`${query.contentRating}`, "g")};                
    }

    if(query.title){
        filterChecks.title = new RegExp(query.title, 'i'); 
    }
    try {       
        console.log(filterChecks, 'filter' )
        const videos = await Video.find(filterChecks);      
        if(query.sortBy){
           sortBy(query.sortBy, videos);           
        }          
        return videos
    } catch (error) {
        throw new error(error.message);
    } 

   
}   

const addVideo = async (videoBody) => {
    const video = await Video.create({
        videoLink: videoBody.videoLink,
        title: videoBody.title,
        genre: videoBody.genre,
        contentRating: videoBody.contentRating,
        releaseDate: new Date(videoBody.releaseDate),
        previewImage: videoBody.previewImage
    });
    
    
    return video;
}
 

const updateVote = async (id, voteInfo) => {
    
    const video = await Video.findById(id);
   
    if(video){
        if(voteInfo.vote === 'upVote')
            if(voteInfo.change === 'increase')video.votes.upVotes++;
            else video.votes.upVotes--;
        else{
            if(voteInfo.change === 'increase')video.votes.downVotes++;
            else video.votes.downVotes--;
        }
        await video.save();
        return video
    }

    return -1;

}

const updateViews = async (id) => {
    
    const video = await Video.findById(id);
    if(video){
        video.viewCount++;
        await video.save();
        return;
    }
} 


module.exports = {
    getAllVideos,
    getFilterVideos,
    getVideoById,
    addVideo,
    updateVote,
    updateViews
    }