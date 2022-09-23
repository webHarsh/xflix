import './Header.css'
import { useState } from 'react'
const Header = (urlBuilder, fromMain = true) =>{
    const [funcRun, setFuncRun] = useState(0);
    
    const searchKeyword = (e) =>{
        let filterData = urlBuilder.filterData
        setFuncRun(prev => {
            clearTimeout(prev);
            setTimeout(() => urlBuilder.urlBuilder(filterData.genre, 
                filterData.rating,e.target.value ), 500)
        });
    }
    
    

    return (
        <nav className="navbar">
            <div className="brand">
                <span>X </span>
                <span>Flix</span>
            </div>

            {urlBuilder.fromMain && <div className="search">
            <input type="text" className="input" placeholder='Search'onChange={searchKeyword}/>
            <span></span>
            </div>}

            {urlBuilder.fromMain && <div onClick={e => urlBuilder.setModalOpen(true)} id='upload-btn' className="upload-btn"> 
            <span  >Upload</span>  
            </div>}
            
        </nav>
    )


}

export default Header;