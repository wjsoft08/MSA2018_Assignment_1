import {Button} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import * as React from 'react';
import Dropzone from 'react-dropzone'
import './App.css';
import {ThemeContext, themes} from './theme-context';

interface IState {
  imageFiles: any[],
  results: any,
  dropzone: any,
  theme: any,
  toggleTheme: any,
  items: any[]
  isLoaded: boolean
}

export default class App extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
  
    this.state = {
      items: [],
      imageFiles: [],
      results: "",
      dropzone: this.onDrop.bind(this),
      isLoaded: false,
      theme: themes.dark,
      toggleTheme: this.toggleTheme(),
    };
    
  }
  public componentDidMount(){
  	fetch(`https://api.coinmarketcap.com/v2/ticker/?limit=10`)
 		.then(result=>result.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        items: json,
      })
    })
  }

  public toggleTheme = () => {
    this.setState(state => ({
      theme:
        state.theme === themes.light
          ? themes.dark
          : themes.light,
    }));
    
  };

  public displayData() {
    fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    .then((response : any) => {
      if (!response.ok) {
        this.setState({results: response.statusText})
      }
      else {
        response.json().then((data:any) => this.setState({results: data[0].class}))
      }
      return response
    })
  }

  public onDrop(files: any) {
    this.setState({
      imageFiles: files,
      results: "",
    })
    const file = files[0]
    const reader = new FileReader();
    reader.onload = (readerEvt) => {
 //       const binaryString = readerEvt.target!!.result;
  //      this.upload(btoa(binaryString))
      this.upload();
    };

    reader.readAsBinaryString(file);
  }

  public upload() {
    fetch('https://api.coinmarketcap.com/v2/ticker/?limit=10', {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
      }
    })
    .then((response : any) => {
      if (!response.ok) {
        this.setState({results: response.statusText})
      }
      else {
        response.json().then((data:any) => this.setState({results: data[0].class}))
      }
      return response
    })
  }


  public render() {

    const { items } = this.state;

    return (
      <div className="container-fluid">
      <ThemeContext.Provider value={this.state}>
      
      <ThemeContext.Consumer>
          {theme => (
          <div className="centreText" style={{backgroundColor: theme.theme.background, color: theme.theme.foreground}}>
            <div className="dropZone">
              <Dropzone onDrop={this.state.dropzone} style={{position: "relative"}}>
                <div style={{height: '50vh'}}>
                  {
                    this.state.imageFiles.length > 0 ? 
                      <div>{this.state.imageFiles.map((file) => <img className="image" key={file.name} src={file.preview} /> )}</div> :
                      <p>Try dropping some files here, or click to select files to upload.</p>
                  }  
                </div>
              </Dropzone>
            </div>
            <div  className="dank">
            {
              this.state.results === "" && this.state.imageFiles.length > 0 ?
              <CircularProgress/> :
              <p>{this.state.results}</p>
            }
            </div>
          </div>
          )}
        </ThemeContext.Consumer>
        <div>
          <Button onClick={this.toggleTheme}>Change Theme</Button>

          <ul>
            {items.map(item => (
              <li key={item.id}>
                Name:{item.name} | Rank; {item.rank}
              </li>
            ))};

          </ul>
        </div>
        </ThemeContext.Provider>

      </div>
    );
  }
}