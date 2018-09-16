import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import * as React from 'react';
import './App.css';


interface IState{
  city:any,
  description:any,
  error:any,
  humidity:any,
  icon: any,
  tempurature: any,
  weather: any,
  
}

class App extends React.Component<{},IState> {
  constructor(props: any){
    super(props)
    this.state={
      city:"",
      description:"",
      error:"",
      humidity:"",
      icon:"",
      tempurature:"",
      weather:""

    };
    this.handleChange = this.handleChange.bind(this);
    this.updateWeather = this.updateWeather.bind(this);

  }
  public updateWeather=async(e: any)=>{
    e.preventDefault();
    
    const getWeather =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+ this.state.city + `,nz&appid=6b9198327955fee7cc9a3866326db9c8&units=metric`);
    const data =  await getWeather.json();
    global.console.log(data);
    this.setState({
      description: data.weather[0].description,
      error:"",
      humidity: data.main.humidity + '%',
      icon:"",
      tempurature: data.main.temp + 'C°',
      weather: ""
    });

  }

  public handleChange(event:any){
    this.setState({city: event.target.value});
  

  }
  public render() {

    return (
      <div className="App">
      <h1>New Zealand Weather App</h1>
      <form onSubmit={this.updateWeather}>
      <label>
      Enter in a New Zealand city:
<TextField type="text" value={this.state.city} onChange={this.handleChange} />
      </label>
      
        <Button variant="contained" onClick={this.updateWeather} color="primary">Click to get weather</Button>
        </form>
        <p>The Weather for {this.state.city} is</p>
        <p>{this.state.description} with</p>
        <p>an average temperature of {this.state.tempurature}</p>
        <p>and humidity of {this.state.humidity}</p>
      </div>
    );
  }
}
export default App;
