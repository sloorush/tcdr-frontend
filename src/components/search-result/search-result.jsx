import React from 'react'
import './search-result.css'

function getGreenToRed(percent){
    var r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
    var g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
    return 'rgb('+r+','+g+',0)';
}

class SearchResult extends React.Component{
    render() {
        const {credibility=50}=this.props
        return(
            <div className=''>
                <div className=''>
                    <div className='news-card-footer'>
                        <p style={{color:getGreenToRed(credibility)}}>This article is {credibility}% credible</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResult