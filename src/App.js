import React from 'react';
import Axios from 'axios';
import './components/SearchBox';
import './App.css';
import SearchBox from './components/SearchBox';
import GifBox from './components/GifBox';
import 'font-awesome/css/font-awesome.min.css'
import { faFacebook, faTwitter, faReddit, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BeatLoader from "react-spinners/BeatLoader";


const APIKEY = 'Gt8311vWVT20wQRfLjUBrPH24KV9gfqA';
var gifArr = [];
var gifBoxArr = [];

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      text: '',
      rawData: [],
      finalData: [],
      finalDataRandom: [],
      isLoading: false,
      displayModal: false,
      searched: false,
      gifSource: '',
      err: '',
    }
  }

  componentDidMount() {
    this.fetchRandomGifs()
  }
//Calls the Giphy API 3 times to fetch 3 random gifs then assigns them to an array state which is rendered to the page
  fetchRandomGifs() {
    for(var i = 0; i < 3; i++) {
      Axios.get("https://api.giphy.com/v1/gifs/random?api_key="+ APIKEY + "&tag=&rating=g")
      .then(response => {
        this.setState({finalDataRandom: [...this.state.finalDataRandom, response.data.data.images.downsized.url]})
      })
      .catch(err => {
        this.setState({err: err.toString()})
      })
    }
  }
//Calls the Giphy API using text from the search field and returns the first 100 gifs, puts those gifs through a set of arrays which orders them all into components which is 
//rendered to the page
  fetchGifs() {
    Axios.get("https://api.giphy.com/v1/gifs/search?api_key=" + APIKEY + "&q=" + this.state.text + "&limit=100&offset=0&rating=g&lang=en")
    .then(response => {
      this.setState({isLoading: true})
      this.setState({
        rawData: [],
        rawData: response.data.data
      })
    })
    .catch(err => {
      this.setState({err: err.toString()})
    })
    setTimeout(() => {
      this.setState({isLoading: false})
    },500)
  }

  assignGifs() {
    this.state.rawData.forEach(i => {
      gifArr.push(i.images.downsized.url)
    })
    gifArr.forEach(i => {
      gifBoxArr.push(<GifBox src={i} className={"gif"} key={"gif-" + gifArr.indexOf(i)} onClick={(src) => this.handleClickGif(src)}></GifBox>)
    })
    this.setState({finalData: gifBoxArr})
  }
//Function is called when user clicks on any gif
  handleClickGif(src) {
    this.setState({
      displayModal: true,
      gifSource: src.target.src,
      gifSelected: true
    })
  }
//Function is called when user click search button
  handleSearch() {
    this.setState({searched: true})
    gifArr = []
    gifBoxArr = []
    this.fetchGifs()
    setTimeout(() => {
      this.assignGifs()
    }, 500)
  }

  useKey(key) {
    console.log(key.key)
    if (key.key == 'Enter') {
      this.handleSearch()
    }
  }

  render() {
    var displayModal = this.state.displayModal;
    var isLoading = this.state.isLoading;
    var searched = this.state.searched;
    const color = "#F83107";
   
    return (
      <div className='main'>  
        {displayModal == true &&
          
          <div>
            <div className='modal-box-gif'>
              <h2>Gif Selected:</h2>
              <a href={this.state.gifSource}><img className="modal-gif" src={this.state.gifSource}></img></a>
            </div>

            <div className="modal-box">
              {}
              <div className='social-btns'>
                <a href={"messages://redirect/" + this.state.gifSource}><FontAwesomeIcon icon={faFacebook} id="social-icon"className="facebook-icon"></FontAwesomeIcon></a>
                <a href={"http://www.facebook.com/sharer/sharer.php?u=" + this.state.gifSource}><FontAwesomeIcon icon={faFacebookMessenger} id="social-icon"className="facebook-icon"></FontAwesomeIcon></a>
                <a href={"https://twitter.com/intent/tweet?url=" + this.state.gifSource}><FontAwesomeIcon icon={faTwitter} id="social-icon"className="twitter-icon"></FontAwesomeIcon></a>
                <a href={"https://www.reddit.com/submit?url=" + this.state.gifSource}><FontAwesomeIcon icon={faReddit} id="social-icon"className="reddit-icon"></FontAwesomeIcon></a>
              </div>
              <button className="modal-btn" id="close-btn"onClick={() => this.setState({displayModal: false})}>Close</button>
            </div>
          </div>}
        <div className='search'>
          <div className='hero'>
            <h1 className='header'>Search For A Gif</h1>
            <div className="inside-search">
              <div>
                <SearchBox placeholder="Search Here..." onKeyPress={(key) => this.useKey(key)} handleChange={(e) => {this.setState({text: e.target.value})}}></SearchBox>
              </div>
              <div>
                <button className="search-btn" onClick={() => this.handleSearch()}>Search</button>
              </div>
              {!this.state.err == "" ?
              <div className='error'>
                <h2>{this.state.err}</h2>
              </div> : ''}
            </div>
          </div>
        </div>
  
        <div className='search-results'>
        {isLoading ? <div className='loading'><div className="load-animation"><BeatLoader color={color} size={50}></BeatLoader></div></div> : ''}
          <div className='gifs-container'>
          {isLoading ? '' : this.state.finalData}
          {searched ? '' : 
          <div>
            <GifBox src={this.state.finalDataRandom[0]} className="gif" onClick={(src) => this.handleClickGif(src)}></GifBox>
            <GifBox src={this.state.finalDataRandom[1]} className="gif" onClick={(src) => this.handleClickGif(src)}></GifBox>
            <GifBox src={this.state.finalDataRandom[2]} className="gif" onClick={(src) => this.handleClickGif(src)}></GifBox>
          </div>}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
