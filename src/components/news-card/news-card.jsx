import React from 'react'

class NewsCard extends React.Component{
    constructor(params) {
        super();
        this.state={

        }
    }

    componentDidMount() {
        // GET request using fetch with error handling
        fetch('https://gnews.io/api/v3/search?q=corona&token=0371457f5bd5c762285f678b1e0a9df3')
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
    
                this.setState({ data: data.articles })
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        return(
            <div>
            
            </div>
        )
    }
}

export default NewsCard