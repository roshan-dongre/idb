import React, {Component} from 'react'
import {Carousel, Container, Slide} from 'react-bootstrap'
import $ from 'jquery'
import './Home.css'

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
    //this.state = { person: []};
  }


  /*fetchFirst() {
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
    } */

    render() {
        return (
            <div className="admin-bg">
                <Carousel interval= {2000}>
                    <Carousel.Item>
                        <img className="center-block" alt="900x500"
                             src="http://getwallpapers.com/wallpaper/full/5/c/9/89804.jpg"
                             style={imageStyles}/>
                        <Carousel.Caption>
                            <h3>A Life of Crime</h3>
                            <p>The FBI's Most Wanted Criminals</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item animateIn>
                        <img className="center-block" alt="900x500"
                             src="https://cdn01.theintercept.com/wp-uploads/sites/1/2017/12/fbi-peter-maass-reality-winner-2-1513811184-article-header.jpg"
                             style={imageStyles}/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="center-block" alt="900x500"
                             src="https://theintercept.imgix.net/wp-uploads/sites/1/2017/12/fbi-interrogation-1513811579.jpg?auto=compress%2Cformat&q=90&w=1024&h=683"
                             style={imageStyles}/>
                    </Carousel.Item>
                </Carousel>

                <div>
            <h1 style={headerStyle}><b>MARVELUS</b></h1>
                    
                </div>
            </div>
        )
    }
}

export default Home
