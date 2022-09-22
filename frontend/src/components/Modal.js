import "./Modal.css";
import { useState } from "react";
import axios from "axios";
import { config } from "../App";

const Modal = (setModalOpen) =>{

    const [formData, setFormData] = useState({genre: "", age: ""});

    const getDate = (e) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' }
        const date  = new Date(e.target.value).toLocaleDateString('en-us', options);
        let tempM = [...date.split(',')]
        tempM = tempM[0].split(' ')
        let fDate = tempM[1]+' '+tempM[0]+date.split(',')[1];
        setFormData(prev => ({...prev, date:fDate}))
        

    }


    const submitData = async () => {
        const res = await axios.post(`${config.configip}/v1/videos`, formData).then(res => res)
                                    .catch(res => console.log(res));

        setModalOpen.setModalOpen(false);
    }



    return(
        <div className="modal-container-parent">

        <div className="modal-container">
            
            <div className="close-button">
                <span >Upload Video</span>
                <span onClick={e => setModalOpen.setModalOpen(false)} className="close">X</span>

            </div>

            <div className="input-container">
                <input type="text" onChange={e => setFormData(prev => ({...prev, videoLink:'youtube.com/embed/'+e.target.value.split('=')[1]}))} className="input-block" placeholder="Video Link"/>
                <p className="input-block-text">
                    This link will be used to derive the video
                </p>
            </div>
            <div className="input-container">
                <input type="text" className="input-block" onChange={e => setFormData(prev => ({...prev, imageLink:e.target.value}))} placeholder="Thumbnail Image Link"/>
                <p className="input-block-text">
                    This link will be used to preview the thumbnail image
                </p>
            </div>
            <div className="input-container">
                <input type="text" className="input-block" onChange={e => setFormData(prev => ({...prev, title:e.target.value}))} placeholder="Title"/>
                <p className="input-block-text">
                    The title will be representative text for the video
                </p>
            </div>
            <div className="input-container">
            <select name="" id="odalselect" value={formData.genre} onChange={e => setFormData(prev => ({...prev, genre:e.target.value}))} className="input-block modal-select">
                    <option value=""  disabled>Genre</option>
                    <option value="education">Education</option>
                    <option value="sports">Sport</option>
                    <option value="comedy">Comedy</option>
                    <option value="lifestyle">Lifestyle</option>

            </select>
                <p className="input-block-text">
                    Genre will help in catograzing videos
                </p>
            </div>
            <div className="input-container">
            <select name="" value={formData.age} id="odalselect" onChange={e => setFormData(prev => ({...prev, age:e.target.value}))} className="input-block modal-select">
                    <option value='' disabled >Suitable age group for the clip</option>
                    <option value='7' >+7</option>
                    <option value='12'>+12</option>
                    <option value='16'>+16</option>
                    <option value='18'>+18</option>

            </select>
                <p className="input-block-text">
                    This will be used to filter video on age group suitability
                </p>
            </div>

            

            <div className="input-container">
                <input type="text" className="input-block" onChange={getDate} placeholder="Release date" onFocus={(e) => e.target.type = 'date'}/>
                <p className="input-block-text">
                This will be used to sort video
                </p>
            </div>

            <div className="upload-button">
                <span id="uploadvideo" onClick={submitData}>Upload Video</span>
                <span className="close" onClick={e => setModalOpen.setModalOpen(false)} >Cancel</span>

            </div>
            

        </div></div>

    )
}

export default Modal;