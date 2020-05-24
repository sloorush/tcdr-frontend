import React from 'react';

import './App.css';

import BigLogo from './images/bigLogo.svg'

import Header from './components/header/header'
import NewsCard from './components/news-card/news-card'

class App extends React.Component{
  constructor(params) {
    super();
    this.state={
        data:[]
    }
  }

  componentDidMount() {
      fetch('https://gnews.io/api/v3/search?q=corona&token=0371457f5bd5c762285f678b1e0a9df3')
      // fetch()
          .then(async response => {
            const rawData = await response.json();

            if (!response.ok) {
                const error = (rawData && rawData.message) || response.statusText;
                return Promise.reject(error);
            }
            this.setState({ rawData: rawData.articles })
              
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({url:this.state.rawData})
            };
            const res = await fetch('localhost:5000/load', requestOptions);
            const data = await res.json();
            this.setState({ data: data });
          })
          .catch(error => {
              this.setState({ errorMessage: error.toString() });
              console.error('There was an error!', error);
          })
  }
  myCallback = (dataFromChild) => {
    console.log(dataFromChild)
    this.setState({predictedNews:dataFromChild.news})
    this.setState({sci:dataFromChild.sci})
}
  render(dataFromChild){
    const {data}=this.state
    return (
      <div className="App">
        <Header className='header' callbackFromParent={this.myCallback} />
        <div className='logo'>
        <img src={BigLogo} alt="React Logo" />
        </div>
        {
          dataFromChild
          ?
          <NewsCard title={this.state.title} image={this.state.image} description={this.dataFromChild.news.description} sourceUrl={this.dstate.url} time={this.state.publishedAt} sourceName={this.state.source.name} credibility={this.state.credibility} />
          :false
        }
        {
          dataFromChild
          ?
          <div>hey</div>
          :false
        }

        {data.map(news => <NewsCard title={news.title} image={news.image} description={news.description} sourceUrl={news.url} time={news.publishedAt} sourceName={news.source.name} credibility={news.credibility} />)}

        <NewsCard 
          title='Gazundered by the corona sharks: How ruthless house buyers are slashing offers and blaming the virus' 
          image='https://images.gnews.io/42bc6fec612bb1ec1dfec227d081157a'
          description='The impact of coronavirus is still being felt in the property market - from nervous sellers to buyers trying to scoop a possible bargain. Joe Nutkins (pictured) fears viewers coming to her bungalow.'
          time='2020-05-23 14:47:00 UTC'
          sourceName= "This Is Money on MSN.com"
          sourceUrl= "https://www.msn.com/en-gb/finance/other/gazundered-by-the-corona-sharks-how-ruthless-house-buyers-are-slashing-offers-and-blaming-the-virus/ar-BB14vtP1"
          credibility='70'
        />
        <NewsCard 
          title='Gazundered by the corona sharks: How ruthless house buyers are slashing offers and blaming the virus' 
          image='https://images.gnews.io/42bc6fec612bb1ec1dfec227d081157a'
          description='The impact of coronavirus is still being felt in the property market - from nervous sellers to buyers trying to scoop a possible bargain. Joe Nutkins (pictured) fears viewers coming to her bungalow.'
          time='2020-05-23 14:47:00 UTC'
          sourceName= "This Is Money on MSN.com"
          sourceUrl= "https://www.msn.com/en-gb/finance/other/gazundered-by-the-corona-sharks-how-ruthless-house-buyers-are-slashing-offers-and-blaming-the-virus/ar-BB14vtP1"
        />
        
      </div>
    );
  }
}

export default App;
