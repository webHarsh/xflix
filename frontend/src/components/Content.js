import './Content.css';
import VideoCard from './VideoCard';
import {useState, useEffect} from 'react'
import axios from "axios";
import { config } from '../App';
import Genre from './Genre';
import Header from './Header';
import Modal from './Modal';

const Content = () => {

    const [allVideos, setAllVideos] = useState([]);
    const [currentFilter, setCurrentFilter] = useState({genre:[], rating:0, title:''});
    const [modalOpen, setModalOpen] = useState(false);




    useEffect(() => {
        const runLanding = async() =>{
            await getVideos();
        }
        runLanding();
        
    }, [])



    const filterClickRating = (e) => {
        
        document.getElementById('rating'+currentFilter.rating).className = '';
        e.target.className = 'selectedliRating';
        
        setCurrentFilter(prev => {
            return {...prev, rating:e.target.value}
        })

        urlBuilder(currentFilter.genre, e.target.value)
    }



   const checkFilter = (e) => {

       let text = e.target.getAttribute('id');
       let tempGenre = []; 
       

        
        if(text === 'all'){
            setCurrentFilter(prev => {
                prev.genre.forEach(item => {
                    document.getElementById(item).className = ''})
                return {...prev, genre:[]}
            })
            e.target.className = 'selectedli'
            
        }


        else if(currentFilter.genre.includes(text)){
            e.target.className = "";
            
            setCurrentFilter(prev => {
                tempGenre = prev.genre.filter(item => item != text);
                return {...prev, genre: tempGenre}
            })

        }

        else{
            
            if(!currentFilter.genre.length){
                e.target.className = 'selectedli'
                tempGenre = [text];
                document.getElementById('all').className = '';
                setCurrentFilter(prev => {
                    return {...prev, genre:tempGenre}
                })
            }
            else{
                tempGenre = [...currentFilter.genre, text];
                e.target.className = 'selectedli'
                setCurrentFilter(prev => {
                    return {...prev, genre: tempGenre}
                })
                }
            }
        
        urlBuilder(tempGenre, currentFilter.rating);
   } 


   


   const urlBuilder = (currentGenre = currentFilter.genre, 
                    currentRating=currentFilter.rating,
                     currentTitle='') => {
        
        
        let genre = '';
        
        
        let url = '';
        
        
        if(currentTitle){
            url = 'title='+currentTitle;
            setCurrentFilter(prev => {
                return{...prev, title: currentTitle}
            })
        }        

        
        if(currentGenre.length){
            if(currentTitle){
                url = url+'&genres='+currentGenre[0];
            }
            
            else{
                url = url+'genres='+currentGenre[0]
            }

            for(let i=1;i<currentGenre.length;i++){
                genre = genre+","+currentGenre[i];
                url = url+','+currentGenre[i];
            }
        }

        if(currentRating){
            if(currentTitle || currentGenre.length){
                url = url+'&contentRating='+currentRating+'%2B'
            }

            else{
                
                url = url+'contentRating='+currentRating+'%2B'
            }
            
        }

        
        
       
        // let URL = '/v1/videos?title=top&genres=Education&contentRating=12%2B'
        getVideos(url)
   }



   const sortBy =(by)=>{
    let tempV = allVideos
    if(by === 'view count'){
        
        tempV = tempV.sort((item1, item2) => {
            if(item1.viewCount > item2.viewCount){
                return -1
            }

            else if(item1.viewCount < item2.viewCount){
                return 1
            }

            else{return 0}
        })
    }

    else if(by === 'release-date'){
        tempV = tempV.sort((item1, item2) => {
            let date1 = new Date(item1.releaseDate).getTime();
            let date2 = new Date(item2.releaseDate).getTime();
            if(date1 > date2){return -1;}
            else if(date1 < date2){return 1}
            else{return 0}
            
        })
    }
    setAllVideos(prev => [...tempV]);
   }


   

   const getVideos = async (url = '') => {
    let filter = '';
    

    try {
        const videoData = await axios.get(`${config.configip}/v1/videos?`+url);
        setAllVideos(prev => videoData.data.videos);
        
        
        
    } catch (err) {
        console.log('failed')
        console.log(err.massage)
    }
   }




   

    return (

       <> 
       
        {modalOpen && <Modal setModalOpen={setModalOpen}/>}
        <Header urlBuilder={urlBuilder} filterData={currentFilter} fromMain={true} setModalOpen={setModalOpen} />
        {/* {console.log(checkFilter)} */}
        <Genre filterClick={checkFilter} filterClickRating ={filterClickRating} sortBy={sortBy}/>
        <div className="content-container video-tile-link">
            {allVideos.map(video => {
                // {console.log(video._id)}
                return(<VideoCard key={video._id} videoD= {video} />)
            })}
            
        
        </div></>
    )
}

export default Content;