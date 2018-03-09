import React, {Component} from 'react'
import {Carousel, Container, Slide} from 'react-bootstrap'
import $ from 'jquery'

var imageStyles = {
    height: "637.5px",
    width: "1275px"
}

var headerStyle={
    fontSize: '300px',
    color: 'black',
    textDecoration: 'bold',
    textShadow: '2px 1px gray',
    textAlign: 'center',
    opacity: '0.0',
}

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { person: []};
  }


  fetchFirst() {
      var that = this;
      if (true) {
        fetch('http://ontherun.me:5000/api').then(function (response) {
          //console.log(response.json());
          return response.json();
        });
      }
    }

    componentWillMount() {
        this.fetchFirst();
    }

    render() {
        return (
            <div>
                <Carousel controls={false}>
                    <Carousel.Item>
                      <Carousel.Caption>
                        <img className="center-block" alt="900x500"
                             src="http://prospect.rsc.org/blogs/cw/wp-content/uploads/2009/11/crimescene-tape-4559193-ji.jpg"
                             style={imageStyles}/>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item animateIn>
                      <Carousel.Caption>
                        <img className="center-block" alt="900x500"
                             src="http://projects.aljazeera.com/2014/chicago-homicides/images/chicago_homicide_01_crime_scene3.jpg"
                             style={imageStyles}/>
                        <h3> {this.state.person} </h3>
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="center-block" alt="900x500"
                             src="https://static01.nyt.com/images/2016/04/11/us/11crimebill-02/11crimebill-02-master675.jpg"
                             style={imageStyles}/>
                    </Carousel.Item>
                </Carousel>

                <div>
            <h1 style={headerStyle}><b>On The Run</b></h1>

                </div>
            </div>
        )
    }
}

export default Home
