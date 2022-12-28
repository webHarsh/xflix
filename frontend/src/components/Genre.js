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
                <select name="" id="selectFilter" className='sort-select' onChange={e => filterClick.sortBy(e.target.value)}>
                    
                    <option id='release-date-option' className='icon' value="release-date">Release Date</option> 
                    <option id='view-count-option' value="view count">View Count</option>
                </select>
            </div>

            <div className="by-age">
                <li className="content-rating-btn selectedliRating" id="rating0"onClick={filterClick.filterClickRating}  value ='0'>Any Age</li>
                <li className="content-rating-btn" id="rating7"  onClick={filterClick.filterClickRating} value ='7'>+7</li>
                <li className="content-rating-btn" id="rating12"onClick={filterClick.filterClickRating} value ='12'>+12</li>
                <li className="content-rating-btn" id="rating16"onClick={filterClick.filterClickRating} value='16'>+16</li>
                <li className="content-rating-btn" id="rating18"onClick={filterClick.filterClickRating} value='18'>+18</li>
            </div>
        </div>
    )
}

export default Genre;