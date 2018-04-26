import React, { Component } from "react"
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from "recharts"
import visData from './canitstream/countryData.json'

class CustomTooltip extends Component 
{
  propTypes: {
    type: "",
    payload: [],
    label: "",
  }

  getTopMovie(label) {
    for (var i = 0; i < 141; i++) {
      if (visData.data[i].country == label) {
        var topMovie      
        if (data[i].movies[0] == undefined) {
          topMovie = "Unavailable"
        }
        else {
          topMovie = data[i].movies[0].name
        }   
        return "Top Movie: " + topMovie
      }
    }
  }

  getTopStream(label) {
    for (var i = 0; i < 141; i++) {
      if (visData.data[i].country == label) {
        var topStream
        if (data[i].streams[0] == undefined) {
          topStream = "Unavailable"
        }
        else {
          topStream = data[i].streams[0].name
        }     
        return "Top Streaming Service: " + topStream
      }
    }
  }

  getTopPopulation(label) {
    for (var i = 0; i < 141; i++) {
      if (visData.data[i].country == label) {  
        return "Population: " + parseInt(visData.data[i].population * 1000000, 10)
      }
    }
  }


  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="custom-tooltip" style={{background: '#dfe6e9', borderStyle: 'solid', borderColor: '#2d3436', borderWidth: '2px', padding: '2px', borderRadius: '10px'}}>
          <p className="title"><strong>{label}</strong></p>
          <p className="pop">{this.getTopPopulation(label)}</p>
          <p className="intro">{this.getTopMovie(label)}</p>
          <p className="desc">{this.getTopStream(label)}</p>
        </div>
      );
    }
    return null;
  }
}

var data = [ ]
const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]


class Visualization extends Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: []
    }
  }

  render () {
    for (var i = 0; i < 141; i++) {
      if (visData.data[i].country !== "India" && visData.data[i].country !== "China") {
        if (data[i] == undefined) {
          data[i] = visData.data[i]
          data[i].population = data[i].population / 1000000
        }
        else {
          data[i] = visData.data[i]
        }
      }
    }
    return (
      <div className= "container" style={{"margin-top": "10px", "margin-right": "0px", "margin-bottom": "50px", "color": "black"}}>
      <h1 style={{marginRight: '90px', textShadow: '0 0 3px #FFF'}}> Data Visualization for canitstreamto.me</h1>
      <h4 style={{marginRight: '90px', textShadow: '0 0 3px #FFF'}}> Visualization showing the top movie and streaming service for each country along with its population </h4>
      <BarChart width={1000} height={500} data={data}
            margin={{top: 10, right: 30, left: 20, bottom: 5}} style= {{background: "#C7E7EB"}}>
       <CartesianGrid strokeDasharray="3"/>
       <XAxis dataKey="country"/>
       <YAxis/>
       <Tooltip content={<CustomTooltip/>}/>
       <Legend />
       <Bar name="Population (Hundreds of Thousands) - Excludes China and India" dataKey="population" fill="#8884d8">
         {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]}/>
            ))
          }
       </Bar>
      </BarChart>
      </div>
    );
  }

}

export default Visualization