import React from 'react';

import './App.css';

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
      //fetch('https://gnews.io/api/v3/search?q=corona&token=0371457f5bd5c762285f678b1e0a9df3')
      fetch()
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
  render(){
    const {data}=this.state
    return (
      <div className="App">
        <Header className='header' />
        <div className='logo'>
          <svg width="241" height="129" viewBox="0 0 241 129" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.5 16.5312V25.1875H31.0312V28.25H18.5V49.5312C18.5208 50.8438 18.7188 51.9375 19.0938 52.8125C19.4896 53.6667 20.0104 54.3646 20.6562 54.9062C21.3229 55.4271 22.0938 55.8021 22.9688 56.0312C23.8646 56.2604 24.8333 56.375 25.875 56.375C26.9167 56.375 27.9792 56.3021 29.0625 56.1562C30.1667 56.0104 31.1042 55.8646 31.875 55.7188L32.4375 58.5625C31.5417 58.9167 30.4479 59.1771 29.1562 59.3438C27.8646 59.5312 26.5521 59.625 25.2188 59.625C23.7188 59.625 22.3333 59.4375 21.0625 59.0625C19.7917 58.7083 18.6875 58.1354 17.75 57.3438C16.8125 56.5312 16.0729 55.4896 15.5312 54.2188C14.9896 52.9271 14.7083 51.3542 14.6875 49.5V28.25H5.28125V25.1875H14.6875V16.5312H18.5ZM58.1875 56.4688C59.4375 56.4688 60.625 56.2917 61.75 55.9375C62.8958 55.5625 63.9062 55.0312 64.7812 54.3438C65.6562 53.6562 66.3646 52.8333 66.9062 51.875C67.4688 50.8958 67.7917 49.7917 67.875 48.5625H71.4688C71.3854 50.1667 70.9688 51.6458 70.2188 53C69.4688 54.3542 68.4896 55.5208 67.2812 56.5C66.0729 57.4792 64.6875 58.25 63.125 58.8125C61.5625 59.3542 59.9167 59.625 58.1875 59.625C55.7083 59.625 53.5521 59.1562 51.7188 58.2188C49.8854 57.2812 48.3542 56.0312 47.125 54.4688C45.9167 52.9062 45 51.1146 44.375 49.0938C43.7708 47.0521 43.4688 44.9375 43.4688 42.75V41.4375C43.4688 39.25 43.7708 37.1458 44.375 35.125C45 33.0833 45.9167 31.2812 47.125 29.7188C48.3542 28.1562 49.8854 26.9062 51.7188 25.9688C53.5521 25.0312 55.6979 24.5625 58.1562 24.5625C60.0312 24.5625 61.7604 24.8646 63.3438 25.4688C64.9479 26.0521 66.3333 26.8854 67.5 27.9688C68.6875 29.0312 69.625 30.3021 70.3125 31.7812C71 33.2396 71.3854 34.8438 71.4688 36.5938H67.875C67.8125 35.3229 67.5208 34.1458 67 33.0625C66.4792 31.9792 65.7917 31.0417 64.9375 30.25C64.0833 29.4583 63.0729 28.8438 61.9062 28.4062C60.7604 27.9688 59.5104 27.75 58.1562 27.75C56.1979 27.75 54.5208 28.1458 53.125 28.9375C51.75 29.7292 50.625 30.7708 49.75 32.0625C48.875 33.3542 48.2292 34.8229 47.8125 36.4688C47.4167 38.0938 47.2188 39.75 47.2188 41.4375V42.75C47.2188 44.4583 47.4167 46.1354 47.8125 47.7812C48.2292 49.4271 48.875 50.8958 49.75 52.1875C50.625 53.4583 51.75 54.4896 53.125 55.2812C54.5208 56.0729 56.2083 56.4688 58.1875 56.4688ZM120.219 41.7812C120.219 39.5312 120.5 37.375 121.062 35.3125C121.625 33.2292 122.458 31.3958 123.562 29.8125C124.688 28.2083 126.083 26.9375 127.75 26C129.438 25.0417 131.417 24.5625 133.688 24.5625C135.833 24.5625 137.75 25.0208 139.438 25.9375C141.146 26.8542 142.573 28.1354 143.719 29.7812V11H147.438V59H143.938L143.781 54.5938C142.594 56.2188 141.135 57.4688 139.406 58.3438C137.677 59.1979 135.75 59.625 133.625 59.625C131.396 59.625 129.438 59.1458 127.75 58.1875C126.083 57.2083 124.688 55.9271 123.562 54.3438C122.458 52.7396 121.625 50.9062 121.062 48.8438C120.5 46.7604 120.219 44.625 120.219 42.4375V41.7812ZM124 42.4375C124 44.125 124.177 45.8021 124.531 47.4688C124.906 49.1354 125.5 50.6354 126.312 51.9688C127.125 53.2812 128.188 54.3438 129.5 55.1562C130.812 55.9688 132.417 56.375 134.312 56.375C135.375 56.375 136.375 56.2396 137.312 55.9688C138.271 55.6979 139.146 55.3125 139.938 54.8125C140.75 54.2917 141.469 53.6771 142.094 52.9688C142.74 52.2396 143.281 51.4271 143.719 50.5312V34.1562C143.302 33.2188 142.781 32.3646 142.156 31.5938C141.552 30.8229 140.854 30.1562 140.062 29.5938C139.271 29.0312 138.396 28.5938 137.438 28.2812C136.479 27.9688 135.458 27.8125 134.375 27.8125C132.458 27.8125 130.844 28.2292 129.531 29.0625C128.219 29.875 127.146 30.9479 126.312 32.2812C125.5 33.5938 124.906 35.0833 124.531 36.75C124.177 38.4167 124 40.0938 124 41.7812V42.4375ZM182.156 24.5625C183.094 24.5625 184.031 24.625 184.969 24.75C185.906 24.8542 186.688 25.0104 187.312 25.2188L186.844 28.8125C185.969 28.625 185.094 28.4792 184.219 28.375C183.344 28.2708 182.448 28.2188 181.531 28.2188C178.365 28.2188 175.677 28.9688 173.469 30.4688C171.26 31.9688 169.708 34.2708 168.812 37.375L168.844 59H164.969V25.1875H168.562L168.812 31.0625V31.75C170.188 29.5208 172.01 27.7708 174.281 26.5C176.552 25.2083 179.177 24.5625 182.156 24.5625Z" fill="white"/>
          <path d="M95.6562 57.9062C95.6562 58.8229 95.5521 59.7396 95.3438 60.6562C95.1562 61.5729 94.875 62.4792 94.5 63.375C94.1458 64.2708 93.6979 65.125 93.1562 65.9375C92.6146 66.7708 91.9896 67.5312 91.2812 68.2188L88.9062 66.7188C90.7396 64.1146 91.6562 61.2083 91.6562 58V53.125H95.6562V57.9062ZM212.625 45.4062H208.875V13.5H212.625V45.4062ZM208.25 56.75C208.25 56.0208 208.49 55.4062 208.969 54.9062C209.448 54.3854 210.094 54.125 210.906 54.125C211.74 54.125 212.396 54.3854 212.875 54.9062C213.375 55.4062 213.625 56.0208 213.625 56.75C213.625 57.4583 213.375 58.0521 212.875 58.5312C212.375 59.0104 211.719 59.25 210.906 59.25C210.094 59.25 209.448 59.0104 208.969 58.5312C208.49 58.0521 208.25 57.4583 208.25 56.75Z" fill="#E34625"/>
          <path d="M22.5134 80.1575H17.4158V95H16.1304L16.1414 80.1575H11.0327V79.0039H22.5134V80.1575ZM76.1267 90.144C76.0388 90.8618 75.8594 91.532 75.5884 92.1545C75.3174 92.7698 74.9585 93.3081 74.5117 93.7695C74.0649 94.2236 73.5339 94.5789 72.9187 94.8352C72.3108 95.0916 71.626 95.2197 70.8643 95.2197C70.2271 95.2197 69.6484 95.1245 69.1284 94.9341C68.6157 94.7363 68.158 94.469 67.7551 94.1321C67.3596 93.7952 67.0154 93.3997 66.7224 92.9456C66.4294 92.4915 66.1877 92.0044 65.9973 91.4844C65.8069 90.957 65.6641 90.4114 65.5688 89.8474C65.481 89.2834 65.4333 88.7231 65.426 88.1665V85.8484C65.4333 85.2917 65.481 84.7314 65.5688 84.1675C65.6641 83.6035 65.8069 83.0615 65.9973 82.5415C66.1877 82.0142 66.4294 81.5234 66.7224 81.0693C67.0154 80.6152 67.3596 80.2197 67.7551 79.8828C68.158 79.5386 68.6157 79.2712 69.1284 79.0808C69.6484 78.8831 70.2271 78.7842 70.8643 78.7842C71.6406 78.7842 72.3328 78.9124 72.9407 79.1687C73.5559 79.425 74.0869 79.7839 74.5337 80.2454C74.9805 80.6995 75.3357 81.2378 75.5994 81.8604C75.8704 82.4829 76.0461 83.1604 76.1267 83.8928H74.8193C74.7314 83.3435 74.5886 82.8271 74.3909 82.3438C74.2004 81.8604 73.9441 81.4392 73.6218 81.0803C73.2996 80.7141 72.9114 80.4285 72.4573 80.2234C72.0032 80.011 71.4722 79.9048 70.8643 79.9048C70.3442 79.9048 69.8828 79.9927 69.48 80.1685C69.0771 80.3442 68.7219 80.5786 68.4143 80.8716C68.114 81.1646 67.8577 81.5088 67.6453 81.9043C67.4329 82.2925 67.2607 82.7063 67.1289 83.1458C66.9971 83.5852 66.8982 84.0356 66.8323 84.4971C66.7737 84.9512 66.7444 85.3943 66.7444 85.8264V88.1665C66.7444 88.5986 66.7737 89.0454 66.8323 89.5068C66.8982 89.9683 66.9971 90.4187 67.1289 90.8582C67.2607 91.2976 67.4329 91.7151 67.6453 92.1106C67.8577 92.4988 68.114 92.843 68.4143 93.1433C68.7219 93.4363 69.0771 93.6707 69.48 93.8464C69.8828 94.0222 70.3442 94.1101 70.8643 94.1101C71.4795 94.1101 72.0142 94.0112 72.4683 93.8135C72.9297 93.6084 73.3179 93.3264 73.6328 92.9675C73.9551 92.6086 74.2114 92.1875 74.4019 91.7041C74.5996 91.2207 74.7388 90.7007 74.8193 90.144H76.1267ZM219.301 94.6155C219.301 94.9377 219.264 95.26 219.191 95.5823C219.125 95.9045 219.026 96.2231 218.894 96.5381C218.77 96.853 218.612 97.1533 218.422 97.439C218.231 97.7319 218.011 97.9993 217.762 98.241L216.927 97.7136C217.572 96.7981 217.894 95.7764 217.894 94.6484V92.9346H219.301V94.6155ZM11.9446 121V105.004H15.8118C16.8372 105.019 17.7527 105.22 18.5583 105.608C19.364 105.996 20.0452 106.516 20.6018 107.168C21.1584 107.82 21.5833 108.582 21.8762 109.453C22.1692 110.318 22.323 111.24 22.3376 112.222V113.793C22.323 114.774 22.1692 115.701 21.8762 116.573C21.5833 117.437 21.1584 118.195 20.6018 118.847C20.0452 119.499 19.364 120.019 18.5583 120.407C17.7527 120.788 16.8372 120.985 15.8118 121H11.9446ZM13.2629 106.125V119.89H15.8118C16.6687 119.876 17.4194 119.7 18.064 119.363C18.7158 119.026 19.2578 118.579 19.6899 118.023C20.1221 117.459 20.448 116.814 20.6677 116.089C20.8948 115.357 21.012 114.591 21.0193 113.793V112.189C21.012 111.398 20.8948 110.64 20.6677 109.915C20.448 109.19 20.1221 108.549 19.6899 107.992C19.2578 107.436 18.7158 106.989 18.064 106.652C17.4194 106.315 16.6687 106.139 15.8118 106.125H13.2629ZM112.085 114.309H108.13V121H106.833V105.004H111.349C112.052 105.019 112.715 105.132 113.337 105.344C113.96 105.557 114.502 105.865 114.963 106.267C115.432 106.663 115.798 107.15 116.062 107.729C116.333 108.307 116.469 108.97 116.469 109.717C116.469 110.252 116.388 110.739 116.227 111.178C116.073 111.618 115.857 112.017 115.579 112.376C115.3 112.727 114.967 113.039 114.579 113.31C114.198 113.581 113.777 113.811 113.315 114.002L116.963 120.857V121H115.59L112.085 114.309ZM108.13 113.2H111.613C112.111 113.185 112.576 113.09 113.008 112.914C113.44 112.738 113.813 112.5 114.128 112.2C114.451 111.892 114.7 111.526 114.875 111.101C115.059 110.677 115.15 110.211 115.15 109.706C115.15 109.142 115.051 108.64 114.854 108.201C114.656 107.761 114.385 107.392 114.041 107.091C113.704 106.784 113.301 106.549 112.832 106.388C112.371 106.227 111.873 106.139 111.338 106.125H108.13V113.2ZM165.83 116.221H164.512V105.004H165.83V116.221ZM164.292 120.209C164.292 119.953 164.376 119.737 164.545 119.561C164.713 119.378 164.94 119.286 165.226 119.286C165.519 119.286 165.75 119.378 165.918 119.561C166.094 119.737 166.182 119.953 166.182 120.209C166.182 120.458 166.094 120.667 165.918 120.835C165.742 121.004 165.511 121.088 165.226 121.088C164.94 121.088 164.713 121.004 164.545 120.835C164.376 120.667 164.292 120.458 164.292 120.209Z" fill="#E34625"/>
          <path d="M24.9524 88.8806C24.9597 88.075 25.0842 87.3096 25.3259 86.5845C25.5676 85.8594 25.9119 85.2258 26.3586 84.6838C26.8127 84.1345 27.3657 83.6987 28.0176 83.3765C28.6768 83.0542 29.4202 82.8931 30.2478 82.8931C31.0828 82.8931 31.8262 83.0542 32.478 83.3765C33.1372 83.6987 33.6938 84.1345 34.1479 84.6838C34.6021 85.2258 34.95 85.8594 35.1917 86.5845C35.4333 87.3096 35.5579 88.075 35.5652 88.8806V89.2432C35.5579 90.0488 35.4333 90.8142 35.1917 91.5393C34.9573 92.2644 34.613 92.9016 34.1589 93.4509C33.7048 93.9929 33.1519 94.425 32.5 94.7473C31.8481 95.0623 31.1047 95.2197 30.2698 95.2197C29.4348 95.2197 28.6877 95.0623 28.0286 94.7473C27.3767 94.425 26.8237 93.9929 26.3696 93.4509C25.9155 92.9016 25.5676 92.2644 25.3259 91.5393C25.0842 90.8142 24.9597 90.0488 24.9524 89.2432V88.8806ZM26.2708 89.2432C26.2708 89.873 26.3586 90.481 26.5344 91.0669C26.7102 91.6528 26.9666 92.1729 27.3035 92.627C27.6404 93.0737 28.0542 93.4326 28.5449 93.7036C29.043 93.9746 29.6179 94.1101 30.2698 94.1101C30.9143 94.1101 31.4819 93.9746 31.9727 93.7036C32.4707 93.4326 32.8845 93.0737 33.2141 92.627C33.551 92.1729 33.8074 91.6528 33.9832 91.0669C34.1589 90.481 34.2468 89.873 34.2468 89.2432V88.8806C34.2468 88.2581 34.1589 87.6538 33.9832 87.0679C33.8074 86.4819 33.551 85.9656 33.2141 85.5188C32.8772 85.0647 32.4597 84.7021 31.9617 84.4312C31.4636 84.1528 30.8923 84.0137 30.2478 84.0137C29.6033 84.0137 29.032 84.1528 28.5339 84.4312C28.0432 84.7021 27.6294 85.0647 27.2925 85.5188C26.9629 85.9656 26.7102 86.4819 26.5344 87.0679C26.3586 87.6538 26.2708 88.2581 26.2708 88.8806V89.2432ZM38.4656 88.8806C38.4729 88.075 38.5974 87.3096 38.8391 86.5845C39.0808 85.8594 39.425 85.2258 39.8718 84.6838C40.3259 84.1345 40.8789 83.6987 41.5308 83.3765C42.1899 83.0542 42.9333 82.8931 43.761 82.8931C44.5959 82.8931 45.3394 83.0542 45.9912 83.3765C46.6504 83.6987 47.207 84.1345 47.6611 84.6838C48.1152 85.2258 48.4631 85.8594 48.7048 86.5845C48.9465 87.3096 49.071 88.075 49.0784 88.8806V89.2432C49.071 90.0488 48.9465 90.8142 48.7048 91.5393C48.4705 92.2644 48.1262 92.9016 47.6721 93.4509C47.218 93.9929 46.665 94.425 46.0132 94.7473C45.3613 95.0623 44.6179 95.2197 43.783 95.2197C42.948 95.2197 42.2009 95.0623 41.5417 94.7473C40.8899 94.425 40.3369 93.9929 39.8828 93.4509C39.4287 92.9016 39.0808 92.2644 38.8391 91.5393C38.5974 90.8142 38.4729 90.0488 38.4656 89.2432V88.8806ZM39.7839 89.2432C39.7839 89.873 39.8718 90.481 40.0476 91.0669C40.2234 91.6528 40.4797 92.1729 40.8167 92.627C41.1536 93.0737 41.5674 93.4326 42.0581 93.7036C42.5562 93.9746 43.1311 94.1101 43.783 94.1101C44.4275 94.1101 44.9951 93.9746 45.4858 93.7036C45.9839 93.4326 46.3977 93.0737 46.7273 92.627C47.0642 92.1729 47.3206 91.6528 47.4963 91.0669C47.6721 90.481 47.76 89.873 47.76 89.2432V88.8806C47.76 88.2581 47.6721 87.6538 47.4963 87.0679C47.3206 86.4819 47.0642 85.9656 46.7273 85.5188C46.3904 85.0647 45.9729 84.7021 45.4749 84.4312C44.9768 84.1528 44.4055 84.0137 43.761 84.0137C43.1165 84.0137 42.5452 84.1528 42.0471 84.4312C41.5564 84.7021 41.1426 85.0647 40.8057 85.5188C40.4761 85.9656 40.2234 86.4819 40.0476 87.0679C39.8718 87.6538 39.7839 88.2581 39.7839 88.8806V89.2432ZM79.0051 88.8806C79.0125 88.075 79.137 87.3096 79.3787 86.5845C79.6204 85.8594 79.9646 85.2258 80.4114 84.6838C80.8655 84.1345 81.4185 83.6987 82.0703 83.3765C82.7295 83.0542 83.4729 82.8931 84.3005 82.8931C85.1355 82.8931 85.8789 83.0542 86.5308 83.3765C87.1899 83.6987 87.7466 84.1345 88.2007 84.6838C88.6548 85.2258 89.0027 85.8594 89.2444 86.5845C89.4861 87.3096 89.6106 88.075 89.6179 88.8806V89.2432C89.6106 90.0488 89.4861 90.8142 89.2444 91.5393C89.01 92.2644 88.6658 92.9016 88.2117 93.4509C87.7576 93.9929 87.2046 94.425 86.5527 94.7473C85.9009 95.0623 85.1575 95.2197 84.3225 95.2197C83.4875 95.2197 82.7405 95.0623 82.0813 94.7473C81.4294 94.425 80.8765 93.9929 80.4224 93.4509C79.9683 92.9016 79.6204 92.2644 79.3787 91.5393C79.137 90.8142 79.0125 90.0488 79.0051 89.2432V88.8806ZM80.3235 89.2432C80.3235 89.873 80.4114 90.481 80.5872 91.0669C80.7629 91.6528 81.0193 92.1729 81.3562 92.627C81.6931 93.0737 82.1069 93.4326 82.5977 93.7036C83.0957 93.9746 83.6707 94.1101 84.3225 94.1101C84.967 94.1101 85.5347 93.9746 86.0254 93.7036C86.5234 93.4326 86.9373 93.0737 87.2668 92.627C87.6038 92.1729 87.8601 91.6528 88.0359 91.0669C88.2117 90.481 88.2996 89.873 88.2996 89.2432V88.8806C88.2996 88.2581 88.2117 87.6538 88.0359 87.0679C87.8601 86.4819 87.6038 85.9656 87.2668 85.5188C86.9299 85.0647 86.5125 84.7021 86.0144 84.4312C85.5164 84.1528 84.9451 84.0137 84.3005 84.0137C83.656 84.0137 83.0847 84.1528 82.5867 84.4312C82.0959 84.7021 81.6821 85.0647 81.3452 85.5188C81.0156 85.9656 80.7629 86.4819 80.5872 87.0679C80.4114 87.6538 80.3235 88.2581 80.3235 88.8806V89.2432ZM93.2434 83.1128L93.2764 84.4421C93.5181 83.9807 93.8477 83.6108 94.2651 83.3325C94.6899 83.0469 95.2246 82.9004 95.8691 82.8931C96.2061 82.8931 96.5027 82.9333 96.759 83.0139C97.0227 83.0872 97.2498 83.1934 97.4402 83.3325C97.6306 83.4717 97.7917 83.6401 97.9236 83.8379C98.0554 84.0283 98.1616 84.2371 98.2422 84.4641C98.4912 84.0173 98.8318 83.6475 99.2639 83.3545C99.7034 83.0542 100.249 82.9004 100.901 82.8931C101.414 82.8931 101.842 82.981 102.186 83.1567C102.531 83.3325 102.809 83.5706 103.021 83.8708C103.234 84.1711 103.384 84.519 103.472 84.9146C103.567 85.3101 103.615 85.7275 103.615 86.167L103.604 95H102.373L102.362 86.167C102.362 85.9106 102.336 85.6543 102.285 85.3979C102.234 85.1416 102.142 84.9109 102.01 84.7058C101.886 84.5007 101.707 84.3359 101.472 84.2114C101.245 84.0869 100.952 84.0283 100.593 84.0356C100.227 84.043 99.9158 84.1016 99.6594 84.2114C99.4104 84.3213 99.2017 84.4641 99.0332 84.6399C98.8721 84.8157 98.7439 85.0134 98.6487 85.2332C98.5608 85.4456 98.4949 85.6616 98.4509 85.8813L98.4399 95H97.2095L97.1985 86.0461C97.1985 85.7971 97.1729 85.5518 97.1216 85.3101C97.0703 85.0684 96.9788 84.8523 96.8469 84.6619C96.7224 84.4714 96.5466 84.3176 96.3196 84.2004C96.0925 84.0833 95.8032 84.0283 95.4517 84.0356C95.1001 84.043 94.7998 84.0979 94.5508 84.2004C94.3091 84.303 94.104 84.4421 93.9355 84.6179C93.7744 84.7864 93.6426 84.9841 93.54 85.2112C93.4448 85.4309 93.3679 85.6616 93.3093 85.9033L93.2983 95H92.0569V83.1128H93.2434ZM116.326 89.1772C116.326 89.9463 116.23 90.697 116.04 91.4294C115.857 92.1545 115.571 92.7991 115.183 93.363C114.802 93.9197 114.319 94.3701 113.733 94.7144C113.147 95.0513 112.451 95.2197 111.646 95.2197C110.906 95.2197 110.228 95.0769 109.613 94.7913C108.998 94.5056 108.481 94.0918 108.064 93.5498V99.5703H106.746V83.1128H107.976L108.031 84.7388C108.448 84.1528 108.961 83.6987 109.569 83.3765C110.177 83.0542 110.862 82.8931 111.624 82.8931C112.437 82.8931 113.14 83.0615 113.733 83.3984C114.326 83.728 114.813 84.1748 115.194 84.7388C115.575 85.2954 115.857 85.9399 116.04 86.6724C116.23 87.3975 116.326 88.1555 116.326 88.9465V89.1772ZM115.007 88.9465C115.007 88.3533 114.941 87.7637 114.81 87.1777C114.678 86.5918 114.465 86.0681 114.172 85.6067C113.879 85.1379 113.499 84.7607 113.03 84.4751C112.568 84.1821 112.001 84.0356 111.327 84.0356C110.946 84.0356 110.587 84.0906 110.25 84.2004C109.921 84.303 109.617 84.4531 109.338 84.6509C109.067 84.8413 108.822 85.072 108.602 85.343C108.39 85.6067 108.21 85.8997 108.064 86.2219V92.1106C108.372 92.7258 108.811 93.2129 109.382 93.5718C109.954 93.9307 110.609 94.1101 111.349 94.1101C112.015 94.1101 112.579 93.9636 113.041 93.6707C113.51 93.3777 113.887 93.0005 114.172 92.5391C114.465 92.0703 114.678 91.543 114.81 90.957C114.941 90.3638 115.007 89.7705 115.007 89.1772V88.9465ZM120.533 78.125H126.071V93.8354H130.092V95H120.533V93.8354H124.752V79.3005H120.533V78.125ZM134.047 83.1128H139.562V93.8354H143.605V95H134.047V93.8354H138.243V84.2883H134.047V83.1128ZM137.859 79.8608C137.859 79.5898 137.936 79.3555 138.09 79.1577C138.243 78.96 138.5 78.8611 138.859 78.8611C139.21 78.8611 139.463 78.96 139.617 79.1577C139.778 79.3555 139.858 79.5898 139.858 79.8608C139.858 80.1172 139.778 80.3442 139.617 80.542C139.463 80.7324 139.21 80.8276 138.859 80.8276C138.5 80.8276 138.243 80.7324 138.09 80.542C137.936 80.3442 137.859 80.1172 137.859 79.8608ZM152.075 94.1101C152.515 94.1101 152.932 94.0479 153.328 93.9233C153.73 93.7915 154.086 93.6047 154.393 93.363C154.701 93.1213 154.95 92.832 155.14 92.4951C155.338 92.1509 155.452 91.7627 155.481 91.3306H156.744C156.715 91.8945 156.569 92.4146 156.305 92.8906C156.041 93.3667 155.697 93.7769 155.272 94.1211C154.847 94.4653 154.36 94.7363 153.811 94.9341C153.262 95.1245 152.683 95.2197 152.075 95.2197C151.204 95.2197 150.446 95.0549 149.801 94.7253C149.156 94.3958 148.618 93.9563 148.186 93.407C147.761 92.8577 147.439 92.2278 147.219 91.5173C147.007 90.7996 146.901 90.0562 146.901 89.2871V88.8257C146.901 88.0566 147.007 87.3169 147.219 86.6064C147.439 85.8887 147.761 85.2551 148.186 84.7058C148.618 84.1565 149.156 83.717 149.801 83.3875C150.446 83.0579 151.2 82.8931 152.064 82.8931C152.723 82.8931 153.331 82.9993 153.888 83.2117C154.452 83.4167 154.939 83.7097 155.349 84.0906C155.767 84.4641 156.096 84.9109 156.338 85.4309C156.58 85.9436 156.715 86.5076 156.744 87.1228H155.481C155.459 86.676 155.356 86.2622 155.173 85.8813C154.99 85.5005 154.749 85.1709 154.448 84.8926C154.148 84.6143 153.793 84.3982 153.383 84.2444C152.98 84.0906 152.54 84.0137 152.064 84.0137C151.376 84.0137 150.786 84.1528 150.295 84.4312C149.812 84.7095 149.417 85.0757 149.109 85.5298C148.801 85.9839 148.574 86.5002 148.428 87.0789C148.289 87.6501 148.219 88.2324 148.219 88.8257V89.2871C148.219 89.8877 148.289 90.4773 148.428 91.0559C148.574 91.6345 148.801 92.1509 149.109 92.605C149.417 93.0518 149.812 93.4143 150.295 93.6926C150.786 93.9709 151.379 94.1101 152.075 94.1101ZM168.939 95C168.859 94.7583 168.796 94.491 168.752 94.198C168.708 93.8977 168.679 93.5938 168.665 93.2861C168.438 93.5645 168.174 93.8208 167.874 94.0552C167.573 94.2896 167.244 94.4946 166.885 94.6704C166.533 94.8389 166.152 94.9707 165.742 95.0659C165.332 95.1685 164.904 95.2197 164.457 95.2197C163.9 95.2197 163.38 95.1392 162.897 94.978C162.421 94.8169 162.003 94.5898 161.644 94.2969C161.293 94.0039 161.014 93.6523 160.809 93.2422C160.612 92.8247 160.513 92.3596 160.513 91.8469C160.513 91.1658 160.663 90.5872 160.963 90.1111C161.263 89.635 161.67 89.2505 162.183 88.9575C162.695 88.6572 163.289 88.4375 163.962 88.2983C164.636 88.1592 165.343 88.0896 166.083 88.0896H168.654V86.7383C168.646 86.2915 168.558 85.8997 168.39 85.5627C168.221 85.2185 167.991 84.9329 167.698 84.7058C167.412 84.4714 167.068 84.2957 166.665 84.1785C166.27 84.0613 165.837 84.0027 165.369 84.0027C164.944 84.0027 164.537 84.0576 164.149 84.1675C163.768 84.2773 163.428 84.4348 163.127 84.6399C162.834 84.845 162.596 85.0977 162.413 85.3979C162.23 85.6909 162.131 86.0242 162.117 86.3977L160.798 86.3867C160.82 85.8813 160.952 85.4163 161.194 84.9915C161.443 84.5667 161.776 84.2004 162.194 83.8928C162.611 83.5779 163.094 83.3325 163.644 83.1567C164.2 82.981 164.794 82.8931 165.424 82.8931C166.053 82.8931 166.643 82.9736 167.192 83.1348C167.749 83.2959 168.229 83.5376 168.632 83.8599C169.042 84.1821 169.364 84.585 169.598 85.0684C169.84 85.5518 169.965 86.1157 169.972 86.7603V92.5171C169.972 92.9126 170.005 93.3118 170.071 93.7146C170.144 94.1174 170.232 94.502 170.334 94.8682L170.345 95H168.939ZM164.6 94.0552C165.061 94.0625 165.5 94.0076 165.918 93.8904C166.343 93.7732 166.731 93.6121 167.083 93.407C167.434 93.1946 167.745 92.9456 168.016 92.6599C168.287 92.3669 168.5 92.0483 168.654 91.7041V89.1003H166.259C165.68 89.1003 165.123 89.1443 164.589 89.2322C164.054 89.3201 163.582 89.4666 163.171 89.6716C162.761 89.8694 162.432 90.1367 162.183 90.4736C161.941 90.8105 161.82 91.2317 161.82 91.7371C161.82 92.0959 161.893 92.4182 162.04 92.7039C162.186 92.9895 162.384 93.2349 162.633 93.4399C162.882 93.6377 163.175 93.7915 163.512 93.9014C163.849 94.0039 164.211 94.0552 164.6 94.0552ZM178.662 80.0696V83.1128H183.068V84.1895H178.662V91.6711C178.669 92.1326 178.739 92.5171 178.871 92.8247C179.01 93.125 179.193 93.3704 179.42 93.5608C179.655 93.7439 179.926 93.8757 180.233 93.9563C180.548 94.0369 180.889 94.0771 181.255 94.0771C181.621 94.0771 181.995 94.0515 182.375 94.0002C182.764 93.949 183.093 93.8977 183.364 93.8464L183.562 94.8462C183.247 94.9707 182.863 95.0623 182.408 95.1208C181.954 95.1868 181.493 95.2197 181.024 95.2197C180.497 95.2197 180.01 95.1538 179.563 95.022C179.116 94.8975 178.728 94.696 178.398 94.4177C178.069 94.1321 177.809 93.7659 177.618 93.3191C177.428 92.865 177.329 92.312 177.322 91.6602V84.1895H174.015V83.1128H177.322V80.0696H178.662ZM192.867 95.2197C192.04 95.2197 191.285 95.0659 190.604 94.7583C189.923 94.4507 189.337 94.0332 188.846 93.5059C188.363 92.9785 187.986 92.3633 187.715 91.6602C187.451 90.9497 187.316 90.1953 187.308 89.397V88.9246C187.316 88.075 187.455 87.2839 187.726 86.5515C188.004 85.8191 188.381 85.1819 188.857 84.6399C189.333 84.0979 189.894 83.6731 190.538 83.3655C191.183 83.0505 191.875 82.8931 192.615 82.8931C193.406 82.8931 194.105 83.0359 194.713 83.3215C195.321 83.6072 195.83 83.999 196.24 84.4971C196.658 84.9878 196.973 85.5627 197.185 86.2219C197.405 86.8811 197.518 87.5879 197.526 88.3423V89.1443H188.627V89.397C188.634 90.0195 188.74 90.6165 188.945 91.1877C189.15 91.7517 189.44 92.2498 189.813 92.6819C190.187 93.114 190.637 93.4619 191.165 93.7256C191.692 93.9819 192.278 94.1101 192.922 94.1101C193.655 94.1174 194.318 93.9819 194.911 93.7036C195.504 93.4253 196.01 93.0225 196.427 92.4951L197.262 93.1213C197.042 93.429 196.782 93.7146 196.482 93.9783C196.182 94.2346 195.845 94.4543 195.471 94.6375C195.105 94.8206 194.702 94.9634 194.263 95.0659C193.823 95.1685 193.358 95.2197 192.867 95.2197ZM192.615 84.0137C192.08 84.0137 191.589 84.1162 191.143 84.3213C190.696 84.519 190.304 84.7974 189.967 85.1562C189.63 85.5151 189.352 85.9399 189.132 86.4307C188.912 86.9141 188.762 87.4451 188.682 88.0237H196.207V87.8809C196.193 87.3901 196.101 86.9141 195.933 86.4526C195.771 85.9839 195.537 85.5701 195.229 85.2112C194.929 84.8523 194.559 84.563 194.12 84.3433C193.68 84.1235 193.179 84.0137 192.615 84.0137ZM200.909 88.9465C200.909 88.1555 201.008 87.3975 201.206 86.6724C201.404 85.9399 201.697 85.2954 202.085 84.7388C202.48 84.1748 202.971 83.728 203.557 83.3984C204.15 83.0615 204.846 82.8931 205.645 82.8931C206.399 82.8931 207.073 83.0542 207.666 83.3765C208.267 83.6987 208.768 84.1492 209.171 84.7278V78.125H210.479V95H209.248L209.193 93.4509C208.776 94.0222 208.263 94.4617 207.655 94.7693C207.047 95.0696 206.37 95.2197 205.623 95.2197C204.839 95.2197 204.15 95.0513 203.557 94.7144C202.971 94.3701 202.48 93.9197 202.085 93.363C201.697 92.7991 201.404 92.1545 201.206 91.4294C201.008 90.697 200.909 89.9463 200.909 89.1772V88.9465ZM202.239 89.1772C202.239 89.7705 202.301 90.3601 202.426 90.946C202.557 91.532 202.766 92.0593 203.052 92.5281C203.337 92.9895 203.711 93.363 204.172 93.6487C204.634 93.9343 205.198 94.0771 205.864 94.0771C206.238 94.0771 206.589 94.0295 206.919 93.9343C207.256 93.8391 207.563 93.7036 207.842 93.5278C208.127 93.3447 208.38 93.1287 208.6 92.8796C208.827 92.6233 209.017 92.3376 209.171 92.0227V86.2659C209.025 85.9363 208.842 85.636 208.622 85.365C208.409 85.094 208.164 84.8596 207.886 84.6619C207.607 84.4641 207.3 84.3103 206.963 84.2004C206.626 84.0906 206.267 84.0356 205.886 84.0356C205.212 84.0356 204.645 84.1821 204.183 84.4751C203.722 84.7607 203.345 85.1379 203.052 85.6067C202.766 86.0681 202.557 86.5918 202.426 87.1777C202.301 87.7637 202.239 88.3533 202.239 88.9465V89.1772ZM25.9412 109.113H31.4563V119.835H35.4993V121H25.9412V119.835H30.1379V110.288H25.9412V109.113ZM29.7534 105.861C29.7534 105.59 29.8303 105.355 29.9841 105.158C30.1379 104.96 30.3943 104.861 30.7532 104.861C31.1047 104.861 31.3574 104.96 31.5112 105.158C31.6724 105.355 31.7529 105.59 31.7529 105.861C31.7529 106.117 31.6724 106.344 31.5112 106.542C31.3574 106.732 31.1047 106.828 30.7532 106.828C30.3943 106.828 30.1379 106.732 29.9841 106.542C29.8303 106.344 29.7534 106.117 29.7534 105.861ZM38.7512 114.947C38.7512 114.156 38.8501 113.397 39.0479 112.672C39.2456 111.94 39.5386 111.295 39.9268 110.739C40.3223 110.175 40.813 109.728 41.3989 109.398C41.9922 109.062 42.688 108.893 43.4863 108.893C44.2407 108.893 44.9146 109.054 45.5078 109.376C46.1084 109.699 46.6101 110.149 47.0129 110.728V104.125H48.3203V121H47.0898L47.0349 119.451C46.6174 120.022 46.1047 120.462 45.4968 120.769C44.8889 121.07 44.2114 121.22 43.4644 121.22C42.6807 121.22 41.9922 121.051 41.3989 120.714C40.813 120.37 40.3223 119.92 39.9268 119.363C39.5386 118.799 39.2456 118.155 39.0479 117.429C38.8501 116.697 38.7512 115.946 38.7512 115.177V114.947ZM40.0806 115.177C40.0806 115.771 40.1428 116.36 40.2673 116.946C40.3992 117.532 40.6079 118.059 40.8936 118.528C41.1792 118.99 41.5527 119.363 42.0142 119.649C42.4756 119.934 43.0396 120.077 43.7061 120.077C44.0796 120.077 44.4312 120.03 44.7607 119.934C45.0977 119.839 45.4053 119.704 45.6836 119.528C45.9692 119.345 46.2219 119.129 46.4417 118.88C46.6687 118.623 46.8591 118.338 47.0129 118.023V112.266C46.8665 111.936 46.6833 111.636 46.4636 111.365C46.2512 111.094 46.0059 110.86 45.7275 110.662C45.4492 110.464 45.1416 110.31 44.8047 110.2C44.4678 110.091 44.1089 110.036 43.728 110.036C43.0542 110.036 42.4866 110.182 42.0251 110.475C41.5637 110.761 41.1865 111.138 40.8936 111.607C40.6079 112.068 40.3992 112.592 40.2673 113.178C40.1428 113.764 40.0806 114.353 40.0806 114.947V115.177ZM53.8684 109.113L53.9673 111.343C54.3848 110.603 54.9414 110.014 55.6372 109.574C56.333 109.127 57.124 108.9 58.0103 108.893C59.314 108.893 60.3101 109.285 60.9985 110.069C61.687 110.845 62.0349 111.951 62.0422 113.386V121H60.7239V113.408C60.7166 112.317 60.4675 111.482 59.9768 110.904C59.4861 110.318 58.7244 110.028 57.6917 110.036C57.2668 110.036 56.8604 110.105 56.4722 110.244C56.0913 110.384 55.7397 110.574 55.4175 110.816C55.1025 111.057 54.8206 111.343 54.5715 111.673C54.3298 112.002 54.1321 112.361 53.9783 112.749V121H52.6599V109.113H53.8684ZM71.7651 105.377C71.7651 105.7 71.7285 106.026 71.6553 106.355C71.5894 106.677 71.4905 106.996 71.3586 107.311C71.2341 107.619 71.0767 107.919 70.8862 108.212C70.6958 108.498 70.4761 108.761 70.2271 109.003L69.469 108.432C69.7986 107.97 70.0439 107.494 70.2051 107.003C70.3735 106.513 70.4614 105.978 70.4688 105.399V104.015H71.7651V105.377ZM84.0698 106.07V109.113H88.4753V110.189H84.0698V117.671C84.0771 118.133 84.1467 118.517 84.2786 118.825C84.4177 119.125 84.6008 119.37 84.8279 119.561C85.0623 119.744 85.3333 119.876 85.6409 119.956C85.9558 120.037 86.2964 120.077 86.6626 120.077C87.0288 120.077 87.4023 120.052 87.7832 120C88.1714 119.949 88.501 119.898 88.772 119.846L88.9697 120.846C88.6548 120.971 88.2703 121.062 87.8162 121.121C87.3621 121.187 86.9006 121.22 86.4319 121.22C85.9045 121.22 85.4175 121.154 84.9707 121.022C84.5239 120.897 84.1357 120.696 83.8062 120.418C83.4766 120.132 83.2166 119.766 83.0261 119.319C82.8357 118.865 82.7368 118.312 82.7295 117.66V110.189H79.4226V109.113H82.7295V106.07H84.0698ZM125.302 121.22C124.474 121.22 123.719 121.066 123.038 120.758C122.357 120.451 121.771 120.033 121.281 119.506C120.797 118.979 120.42 118.363 120.149 117.66C119.885 116.95 119.75 116.195 119.742 115.397V114.925C119.75 114.075 119.889 113.284 120.16 112.552C120.438 111.819 120.815 111.182 121.292 110.64C121.768 110.098 122.328 109.673 122.972 109.365C123.617 109.051 124.309 108.893 125.049 108.893C125.84 108.893 126.539 109.036 127.147 109.322C127.755 109.607 128.264 109.999 128.674 110.497C129.092 110.988 129.407 111.563 129.619 112.222C129.839 112.881 129.952 113.588 129.96 114.342V115.144H121.061V115.397C121.068 116.02 121.174 116.616 121.379 117.188C121.584 117.752 121.874 118.25 122.247 118.682C122.621 119.114 123.071 119.462 123.599 119.726C124.126 119.982 124.712 120.11 125.356 120.11C126.089 120.117 126.752 119.982 127.345 119.704C127.938 119.425 128.444 119.022 128.861 118.495L129.696 119.121C129.476 119.429 129.216 119.715 128.916 119.978C128.616 120.235 128.279 120.454 127.905 120.637C127.539 120.821 127.136 120.963 126.697 121.066C126.257 121.168 125.792 121.22 125.302 121.22ZM125.049 110.014C124.514 110.014 124.023 110.116 123.577 110.321C123.13 110.519 122.738 110.797 122.401 111.156C122.064 111.515 121.786 111.94 121.566 112.431C121.346 112.914 121.196 113.445 121.116 114.024H128.641V113.881C128.627 113.39 128.535 112.914 128.367 112.453C128.206 111.984 127.971 111.57 127.664 111.211C127.363 110.852 126.993 110.563 126.554 110.343C126.115 110.124 125.613 110.014 125.049 110.014ZM141.913 121C141.832 120.758 141.77 120.491 141.726 120.198C141.682 119.898 141.653 119.594 141.638 119.286C141.411 119.564 141.147 119.821 140.847 120.055C140.547 120.29 140.217 120.495 139.858 120.67C139.507 120.839 139.126 120.971 138.716 121.066C138.306 121.168 137.877 121.22 137.43 121.22C136.874 121.22 136.354 121.139 135.87 120.978C135.394 120.817 134.977 120.59 134.618 120.297C134.266 120.004 133.988 119.652 133.783 119.242C133.585 118.825 133.486 118.36 133.486 117.847C133.486 117.166 133.636 116.587 133.937 116.111C134.237 115.635 134.644 115.25 135.156 114.958C135.669 114.657 136.262 114.438 136.936 114.298C137.61 114.159 138.317 114.09 139.056 114.09H141.627V112.738C141.62 112.292 141.532 111.9 141.364 111.563C141.195 111.219 140.964 110.933 140.671 110.706C140.386 110.471 140.042 110.296 139.639 110.178C139.243 110.061 138.811 110.003 138.342 110.003C137.917 110.003 137.511 110.058 137.123 110.167C136.742 110.277 136.401 110.435 136.101 110.64C135.808 110.845 135.57 111.098 135.387 111.398C135.204 111.691 135.105 112.024 135.09 112.398L133.772 112.387C133.794 111.881 133.926 111.416 134.167 110.991C134.417 110.567 134.75 110.2 135.167 109.893C135.585 109.578 136.068 109.333 136.617 109.157C137.174 108.981 137.767 108.893 138.397 108.893C139.027 108.893 139.617 108.974 140.166 109.135C140.723 109.296 141.202 109.538 141.605 109.86C142.015 110.182 142.338 110.585 142.572 111.068C142.814 111.552 142.938 112.116 142.946 112.76V118.517C142.946 118.913 142.979 119.312 143.044 119.715C143.118 120.117 143.206 120.502 143.308 120.868L143.319 121H141.913ZM137.573 120.055C138.035 120.062 138.474 120.008 138.892 119.89C139.316 119.773 139.705 119.612 140.056 119.407C140.408 119.195 140.719 118.946 140.99 118.66C141.261 118.367 141.473 118.048 141.627 117.704V115.1H139.232C138.654 115.1 138.097 115.144 137.562 115.232C137.028 115.32 136.555 115.467 136.145 115.672C135.735 115.869 135.405 116.137 135.156 116.474C134.915 116.811 134.794 117.232 134.794 117.737C134.794 118.096 134.867 118.418 135.013 118.704C135.16 118.99 135.358 119.235 135.607 119.44C135.856 119.638 136.149 119.792 136.486 119.901C136.823 120.004 137.185 120.055 137.573 120.055ZM146.857 114.947C146.857 114.156 146.956 113.397 147.153 112.672C147.351 111.94 147.644 111.295 148.032 110.739C148.428 110.175 148.918 109.728 149.504 109.398C150.098 109.062 150.793 108.893 151.592 108.893C152.346 108.893 153.02 109.054 153.613 109.376C154.214 109.699 154.716 110.149 155.118 110.728V104.125H156.426V121H155.195L155.14 119.451C154.723 120.022 154.21 120.462 153.602 120.769C152.994 121.07 152.317 121.22 151.57 121.22C150.786 121.22 150.098 121.051 149.504 120.714C148.918 120.37 148.428 119.92 148.032 119.363C147.644 118.799 147.351 118.155 147.153 117.429C146.956 116.697 146.857 115.946 146.857 115.177V114.947ZM148.186 115.177C148.186 115.771 148.248 116.36 148.373 116.946C148.505 117.532 148.713 118.059 148.999 118.528C149.285 118.99 149.658 119.363 150.12 119.649C150.581 119.934 151.145 120.077 151.812 120.077C152.185 120.077 152.537 120.03 152.866 119.934C153.203 119.839 153.511 119.704 153.789 119.528C154.075 119.345 154.327 119.129 154.547 118.88C154.774 118.623 154.965 118.338 155.118 118.023V112.266C154.972 111.936 154.789 111.636 154.569 111.365C154.357 111.094 154.111 110.86 153.833 110.662C153.555 110.464 153.247 110.31 152.91 110.2C152.573 110.091 152.214 110.036 151.833 110.036C151.16 110.036 150.592 110.182 150.131 110.475C149.669 110.761 149.292 111.138 148.999 111.607C148.713 112.068 148.505 112.592 148.373 113.178C148.248 113.764 148.186 114.353 148.186 114.947V115.177Z" fill="white"/>
          </svg>
        </div>
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
