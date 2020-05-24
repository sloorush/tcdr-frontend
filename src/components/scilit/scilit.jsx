import React from 'react'

class SciLit extends React.Component{
    render() {
        const {title,description, sourceUrl}=this.props
        return(
            <div className='news-card'>
                <div className='news-card-text'>
                    <div className='news-title'>{title}</div>
                    <div>{description}</div>
                    <div className='news-card-footer'>
                        <a rel="noopener noreferrer"  target='_blank' href={sourceUrl}>View here</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default SciLit