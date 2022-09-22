import './VideoPage.css';
import Header from './Header';
import Content from './Content';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { config } from '../App';
import VideoCard from './VideoCard';
import { useParams } from 'react-router-dom';
const VideoPage = () =>{
   const  [allVideos, setAllVideos] = useState([]);
    const [pageVideo, setPageVideo] = useState({video:{}, days:''});
    const {id} = useParams();
    const [voteCheck, setVoteCheck] = useState(false);

    useEffect(() => {
        const runLanding = async() =>{
            await getVideos();
        }
        runLanding();
        
    }, [])



    const getDate = (video) =>{
        
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
            days = days+' months ago';
        }

        else{
            days = 'a month ago';
        }
    }

    else{
        days = days+" day ago";
    }
    let temp = video.contentRating.split("")
    temp.splice(temp.length-1, 1);
    temp = temp.join("");
    
    setPageVideo(prev => {
        return {video:video, 
            days:days, rating: temp, 
            upVote: video.votes.upVotes, 
            downVote: video.votes.downVotes}
    })

    
    
    }

    const getVideos = async (url = '') => {
        let filter = '';
        
    
        try {
            const videoData = await axios.get(`${config.configip}/v1/videos?`+url);
            setAllVideos(prev => videoData.data.videos);
            
            
            const video = await axios.get(`${config.configip}/v1/videos/`+id)
            getDate(video.data);
            
            
        } catch (err) {
            console.log('failed')
            console.log(err.massage)
        }
       }


       const voteButton = (n) => {
        if(voteCheck){
            return;
        }
        else{
            if(n === 1){
                setPageVideo(prev => {
                    return {...prev, upVote: prev.upVote+1}
                })
                let ele = document.getElementById('gg1')
                ele.style.backgroundColor = 'rgb(76, 176, 235)'
            }
            else{
                setPageVideo(prev => {
                    return {...prev, downVote: prev.downVote+1}
                })
                let ele = document.getElementById('gg2')
                ele.style.backgroundColor = 'rgb(76, 176, 235)'
            }
            setVoteCheck(true);
        }
       }

    return (
        <>
        
        <Header fromMain={false}/>
        
        <div className="main-frame-container">
        <div className="frame-container"><div className="video-frame">
            <iframe src={`https://${pageVideo.video.videoLink}`} frameBorder="0" id='fr' name='myFrame'></iframe>
            <div className='container-frame-vote'>
                <div>
                    <h2 className="frame-title">{pageVideo.video.title}</h2>
                    <p id="timecount">+{pageVideo.rating} </p> <p> {pageVideo.days}</p>
                </div>
                <div className='vote'>
                    <span onClick={e => voteButton(1)} className='gg' id='gg1'>{pageVideo.upVote}</span>
                    <span onClick={e => voteButton(-1)} className="gg" id='gg2'>{pageVideo.downVote}</span>
                </div>
            </div>
        </div>


        <div className="frame-container-card">
            {allVideos.map(video => {
                // {console.log(video._id)}
                return(<VideoCard key={video._id} videoD= {video} />)
            })}
            
        
        </div></div></div>
        </>
    )
}

export default VideoPage;