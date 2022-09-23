import './Genre.css'

const Genre = (filterClick) =>{
    
    
    
    return (
        <div className="container">
            <div className="by-genre">
                <li  className='selectedli .genre-btn'  id='all' onClick={filterClick.filterClick}>All</li>
                <li className='genre-btn' onClick={filterClick.filterClick} id='Education'>Education</li>
                <li className='genre-btn' onClick={filterClick.filterClick} id='Sports'>Sports</li>
                <li className='genre-btn' onClick={filterClick.filterClick} id='Comedy'>Comedy</li>
                <li  className='genre-btn' onClick={filterClick.filterClick} id='Lifestyle'>lifestyle</li>
                <select name="" id="selectFilter" onChange={e => filterClick.sortBy(e.target.value)}>
                    
                    <option className='icon' value="release-date">Release Date</option> 
                    <option value="view count">View Count</option>
                </select>
            </div>

            <div className="by-age">
                <li id="rating0"onClick={filterClick.filterClickRating} className='selectedliRating' value ='0'>Any Age</li>
                <li id="rating7"  onClick={filterClick.filterClickRating} value ='7'>+7</li>
                <li id="rating12"onClick={filterClick.filterClickRating} value ='12'>+12</li>
                <li id="rating16"onClick={filterClick.filterClickRating} value='16'>+16</li>
                <li id="rating18"onClick={filterClick.filterClickRating} value='18'>+18</li>
            </div>
        </div>
    )
}

export default Genre;