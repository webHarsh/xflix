import './VideoCard.css';
import { Link } from 'react-router-dom';

const VideoCard = (videoD =[]) =>{
    // console.log(video.video, 'echk')
    let video = videoD.videoD;
    
    let date = new Date(video.releaseDate)
    let days = Math.floor((new Date().getTime() - date.getTime())/(1000*3600*24))

    

    if(days > 365){
        days = Math.floor(days/365)
        
        if(days > 1){
            days = days+' years ago'
        }
        else{
            days = days+' year ago'
        }
    }

    else if(days > 30){
        days = Math.floor(days/30);
        if(days > 1){
            days = days+' months ago'
        }

        else{
            days = 'a month ago'
        }
    }

    else{
        days = days+" day ago"
    }

    

    return(
        <div className="video-container">
            <Link to={`/video/${video._id}`}>
            <img src={video.previewImage} alt="" className="card-img" />
            <h3 className="card-title">{video.title}</h3>
            <p>{days}</p>
            </Link>
        </div>

    )
}

export default VideoCard;
