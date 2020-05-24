import React from 'react'
import './news-card.css'

class NewsCard extends React.Component{
    render() {
        const {title, image,description,time, sourceName, sourceUrl}=this.props
        return(
            <div className='news-card'>
                <img className='news-img' src={image} alt='news-img' />
                <div className='news-card-text'>
                    <div className='news-title'>{title}</div>
                    <div>{description}</div>
                    <div className='news-card-footer'>
                        {time}<br/><br/>
                        <a rel="noopener noreferrer"  target='_blank' href={sourceUrl}>View here at {sourceName}</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsCard