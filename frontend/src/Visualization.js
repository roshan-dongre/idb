import { ComposableMap, ZoomableGroup, Geographies, Geography, Markers, Marker} from "react-simple-maps"
import React, { Component } from 'react';
import axios from 'axios';

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  background: '#487eb0'
}

export default class Visualization extends Component {

	constructor (props) {
		super(props)
    this.state = {
            countries: [],
            streams:[],
            movies:[]
        }
	}

  componentDidMount () {
        this.callAPI()
    }

  callAPI() {

        let low = 823 
        let high = 1071
        let url = "./canitstream/countryData.txt"
        // let url = "http://api.canitstreamto.me/v1/country/[id]/streaming"
        // let url = "http://api.canitstreamto.me/v1/country/[id]/movie"
        // let url = "http://api.ontherun.me/states"

        let self = this

        // for (var i = low; i <= high; i++) {
          // axios.get(url)
          //   .then((res) => {
          //       // Set state with result
          //       // self.setState({states: res.data.results, totalCount: res.data.totalCount, numPages: Math.ceil(res.data.totalCount/self.state.pgSize)});
          //       // self.setState({loading: false})
          //       console.log(res.data)
          //   })
          //   .catch((error) => {
          //       console.log(error)
          //       console.log(error.request)
          //   });
        // }
        axios({
          method:'get',
          url:'./canitstream/countryData.txt',
          responseType:'json',
          crossdomain: true
        })
          .then(function(response) {
            console.log(response.data)
        });
    }

    componentDidUpdate(prevProps, prevState) {
      this.callAPI()
    }

	render() {
    return (
      <div style={wrapperStyles}>
        <ComposableMap
          projectionConfig={{
            scale: 205,
            rotation: [-11,0,0],
          }}
          width={980}
          height={551}
          style={{
            width: "100%",
            height: "auto",
          }}
          >
          <ZoomableGroup center={[0,20]} disablePanning>
            <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/examples/basic-map/static/world-50m.json">
              {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                <Geography
                  key={i}
                  geography={geography}
                  projection={projection}
                  style={{
                    default: {
                      fill: "#ECEFF1",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "#607D8B",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#FF5722",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                  }}
                />
              ))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
    )
  }
}