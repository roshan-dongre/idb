import React, {Component} from 'react'
import {Carousel, Container, Slide} from 'react-bootstrap'
import $ from 'jquery'
import './Home.css'

var imageStyles = {
    height: "575px",
    width: "100%"
}

var linkStyles = {
    height: "300px",
    width: "400px"
}

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

    render() {
        return (
        <div>
            <div className="admin-bg">
                <Carousel interval= {2000}>
                    <Carousel.Item>
                        <img className="center-block" alt="900x500"
                             src="http://getwallpapers.com/wallpaper/full/5/c/9/89804.jpg" style = {imageStyles}/>
                        <Carousel.Caption>
                            <h2>A Life of Crime</h2>
                            <p>The FBI's Most Wanted Criminals</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item animateIn>
                        <img className="center-block" alt="900x500"
                             src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/S15GBCm/videoblocks-painting-flag-of-usa-on-old-wood-boards-with-four-different-ways-animation-of-wooden-grunge-american-flag-loop-abstract-flag-background-for-your-text-or-logo-drawing-united-state-of-america-flag-full-hd-and-4k_rabm-vwjb_thumbnail-full07.png"
                             style = {imageStyles}/>
                        <Carousel.Caption>
                            <h2>A Life of Crime</h2>
                            <p>The FBI's Most Wanted Criminals</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="center-block" alt="900x500"
                             src="http://wallpaperscraft.com/image/city_statue_statue_of_liberty_new_york_874_4320x2874.jpg"
                             style = {imageStyles}/>
                        <Carousel.Caption>
                            <h2>A Life of Crime</h2>
                            <p>The FBI's Most Wanted Criminals</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <section id="services" class="bg-dark text-white">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading">Website Features</h2>
            <hr className="my-4"/>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 text-center">
            <div className="service-box mt-5 mx-auto">
              <i className="fa fa-4x fa-archive text-primary mb-3 sr-icons"></i>
              <h3 className="mb-3">Criminal Records</h3>
              <p className="text-muted mb-0">FBI Records Of The Most Wanted Criminals</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 text-center">
            <div className="service-box mt-5 mx-auto">
              <i className="fa fa-4x fa-briefcase text-primary mb-3 sr-icons"></i>
              <h3 className="mb-3">State Information</h3>
              <p className="text-muted mb-0">Information about the various US States</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 text-center">
            <div className="service-box mt-5 mx-auto">
              <i className="fa fa-4x fa-ban text-primary mb-3 sr-icons"></i>
              <h3 className="mb-3">Crime Definitions</h3>
              <p className="text-muted mb-0">Definitions regarding the various illegal crimes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id="journal" class="text-left paddsection bg-primary">

    <div class="container">
      <div class="section-title text-center">
        <h2></h2>
      </div>
    </div>

    <div class="container">
      <div class="journal-block">
        <div class="row">

          <div class="col-lg-4 col-md-6">
            <div class="journal-info">

              <a href="https://ucr.fbi.gov/"><img src="https://images.pexels.com/photos/597909/pexels-photo-597909.jpeg?auto=compress&cs=tinysrgb&h=350" class="img-responsive" alt="img" style = {linkStyles}/></a>
              <div class="journal-txt text-center text-white">
                <h4><a>Crime Reporting Statistics</a></h4>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div class="journal-info">

              <a href="https://www.fbi.gov/wanted/topten"><img src="https://i.ytimg.com/vi/xjmBQJlmEqg/maxresdefault.jpg" class="img-responsive" alt="img" style = {linkStyles}/></a>
              <div class="journal-txt text-center text-white">
                <h4><a>Ten Most Wanted</a></h4>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6">
            <div className ="journal-info">

              <a href="https://records.txdps.state.tx.us/SexOffenderRegistry">
              <img src="https://thecrimereport.org/wp-content/uploads/2016/02/police_line.jpg" class="img-responsive" alt="img" style = {linkStyles}/>
              </a>
              <div class="journal-txt text-center text-white">
                <h4><a>Sex Offender Registry</a></h4>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
        </div>
        )
    }
}

export default Home
