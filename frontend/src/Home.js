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
  }

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
                             src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/S15GBCm/videoblocks-painting-flag-of-usa-on-old-wood-boards-with-four-different-ways-animation-of-wooden-grunge-american-flag-loop-abstract-flag-background-for-your-text-or-logo-drawing-united-state-of-america-flag-full-hd-and-4k_rabm-vwjb_thumbnail-full07.png"
                             style={imageStyles}/>
                        <Carousel.Caption>
                            <h3>A Life of Crime</h3>
                            <p>The FBI's Most Wanted Criminals</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="center-block" alt="900x500"
                             src="https://upload.wikimedia.org/wikipedia/commons/b/bd/US_Presidential_Flag_Navy_1899.svg"
                             style={imageStyles}/>
                        <Carousel.Caption>
                            <h3>A Life of Crime</h3>
                            <p>The FBI's Most Wanted Criminals</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}

export default Home
