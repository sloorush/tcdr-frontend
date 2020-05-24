import React from 'react'
import './news-card.css'

function getGreenToRed(percent){
    var r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
    var g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
    return 'rgb('+r+','+g+',0)';
}

class NewsCard extends React.Component{
    render() {
        const {title, image,description,time, sourceName, sourceUrl,credibility=50}=this.props
        return(
            <div className='news-card'>
                <img className='news-img' src={image} alt='news-img' />
                <div className='news-card-text'>
                    <div className='news-title'>{title}</div>
                    <div>{description}</div>
                    <div className='news-card-footer'>
                        {time}<br/><br/>
                        <a rel="noopener noreferrer"  target='_blank' href={sourceUrl}>View here at {sourceName}</a>
                        <p style={{color:getGreenToRed(credibility)}}>This article is {credibility}% credible</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsCard