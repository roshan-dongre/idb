import React from 'react'
import {Row, Col} from 'react-bootstrap'
    
{/* Style for pictures so all consistent sizes */}
var imageStyles = {
    width: 'auto',
    height: 'auto'
}
var panelStyle={
    height: 'auto',
    width: '125vh',
    textAlign:'center',
    //backgroundColor: 'white',
    backgroundColor: 'black',
}
var containerStyle={
    align: 'center',
    marginTop: '10px',
    //color:'black',
    color:'white',

}
var container2Style={
    marginTop: '10px',
    //color:'black',
    color:'white',

}

var firstHeader={
    fontSize: '50px',
    textAlign: 'center',
    color: '#aa9898',
    textShadow: '2px 1px #8e0909',
}
var secondHeader={
    fontSize: '20px',
    textAlign: 'center',
    color: '#aa9898',
    weight: 'bold',
}

const About = () => (
    
    <div className="container" style={panelStyle}>
    <br/>
        <h1 style={firstHeader}><b>On The Run</b></h1>

        <div className="panel-body">

            {/* Description superheros, movies, tv shows, comics, creators, events */}
            <h2 style={secondHeader}>On The Run is a website that allows people to draw interesting connections between the FBI Most Wanted Page and information
            on different types of crimes as well as information on the states in which these crimes were committed. </h2>

            {/* Group member descriptions with bios and personal statistics */}
            <h3 align="center" style={{color:'white'}}>Group Members</h3>

            <div className="container" style={containerStyle}>
                <div className="row">
                    <div className="col-sm-4">

                        <div className="panel-body"><img src="https://larius11.github.io/cs373-blog/assets/headshot.jpg"
                                                         className="img-circle img-responsive img-center"
                                                         style={imageStyles} alt="Image"/></div>

                        <h4 align="center"><b>Ricardo Riveron</b></h4>

                        <li><b>Bio: </b> 4th year CS student currently working full-time at H-E-B and taking Concurrency, Debugging &amp; Verifying Programs, and Software Engineering. I love to play music, watch netflix, 
                        and play videogames when I'm not too busy doing schoolwork or at work.
                        </li>
                        <li><b>Responsibilities: </b>Database and back end</li>
                        <li><b>No. of Commits: </b>87</li>
                        <li><b>No. of Issues: </b>17</li>
                        <li><b>No. of Unit Tests: </b> 6</li>

                    </div>

                    <div className="col-sm-5">
                        <div className="panel-body"><img
                            src="https://avatars3.githubusercontent.com/u/14967965?s=460&v=4"
                            className="img-circle img-responsive img-center" styles="width:100%" alt="Image"/></div>
                        <h4 align="center"><b>Roshan Dongre</b></h4>

                        <li><b>Bio: </b> Senior pursuing a double major in Computer Science and Finance. Interested in trading and sports analytics. 
                        I enjoy playing tennis, working out, and playing poker.
                        </li>
                        <li><b>Responsibilities: </b>Wrote technical report, AWS/Namecheap, Front-end model pages, About page, part of Flask integration</li>
                        <li><b>No. of Commits: </b>XX</li>
                        <li><b>No. of Issues: </b>XX</li>
                        <li><b>No. of Unit Tests: </b>XX</li>
                    </div>
                </div>
            </div>
            <br/>
            <hr></hr>
            <div className="container" style={container2Style}>
                <div className="row">

                    <div className="col-sm-5">
                        <div className="panel-body"><img
                            src="https://zaralouis.files.wordpress.com/2018/01/headshot1.jpg?w=2048&h=1814"
                            className="img-circle img-responsive img-center"/></div>
                        <h4 align="center"><b>Zara Louis</b></h4>

                        <li><b>Bio: </b> I am a third year CS student from Plano, Texas. I enjoy working out and reading in my spare time.
                        </li>
                        <li><b>Responsibilities: </b>Focused on designing the front end for the website, including the grid pages and 9 models</li>
                        <li><b>No. of Commits: </b>XX</li>
                        <li><b>No. of Issues: </b> XX</li>
                        <li><b>No. of Unit Tests: </b> XX</li>
                    </div>
                    <div className="col-sm-5">
                        <div className="panel-body"><img
                            src="https://rp27537cs373sp18.files.wordpress.com/2018/01/why.png"
                            className="img-circle img-responsive img-center" styles="width:100%" alt="Image"/></div>
                        <h4 align="center"><b>Ramon Perez</b></h4>
                        <li><b>Bio: </b> CS student hailing from New Braunfels, Texas. This is my third year as part of UTCS, and I'm in the Software Engineering and Artificial Intelligence classes this semester. I enjoy video games, running, and playing with my cats.
                        </li>
                        <li><b>Responsibilities: </b>Management of the data, including scraping, aggregating, and data modelling.</li>
                        <li><b>No. of Commits: </b>115</li>
                        <li><b>No. of Issues: </b> 14</li>
                        <li><b>No. of Unit Tests: </b>4</li>
                    </div>
                    <div className="col-sm-5">
                        <div className="panel-body"><img
                            src="https://ramdeepk2.github.io/ramdeepk2.github.io/cs373/headshot.JPG"
                            className="img-circle img-responsive img-center" styles="width:100%" alt="Image"/></div>
                        <h4 align="center"><b>Krishna Ramdeep</b></h4>
                        <li><b>Bio: </b> CS senior taking Computer Vision, Programming for Performance, Software Engineering, and Randomized Algorithms. I like to work out, hike, and read in my free time (which I don't get too much of).
                        </li>
                        <li><b>Responsibilities: </b>: Design 'about' page, Integrate GitHub dynamic data, document API on GitBook, write technical report on Gitbook</li>
                        <li><b>No. of Commits: </b>XX</li>
                        <li><b>No. of Issues: </b> XX</li>
                        <li><b>No. of Unit Tests: </b>XX</li>
                    </div>
                </div>
            </div>
            <br/>
            <hr/>
            {/* General group statistics */}
    <Row>
    <Col xs={4} md={4}>
            <h3 align="center" style={{color: 'white'}}><b>Statistics</b></h3>
            
            <li align="center" style={{color: 'white',fontSize:'17px'}}><b>Total No. of Commits: </b>397</li>
            <li align="center" style={{color: 'white',fontSize:'17px'}}><b>Total No. of Issues:</b>73</li>
            <li align="center" style={{color: 'white',fontSize:'17px'}}><b>Total No. of Unit Tests: </b>22</li>
            // <li align="center" style={{fontSize:'17px', color: 'white'}}><a href="http://docs.andrewcmartin.apiary.io/#" style={{color: '#c12c2c'}}><b>Apiary API</b></a></li>
            // <li align="center" style={{fontSize:'17px', color: 'white'}}><a href="https://github.com/AndrewCMartin/idb" style={{color: '#c12c2c'}}><b>GITHUB REPO</b></a></li>
            // <li align="center" style={{fontSize:'17px', color: 'white'}}><a href="https://trello.com/b/qLTaMYvu/marvelus" style={{color: '#c12c2c'}}><b>TRELLO</b></a></li>
            // <li align="center" style={{fontSize:'17px', color: 'white'}}><a href="https://gitpitch.com/AndrewCMartin/idb#/" style={{color: '#c12c2c'}}><b>GitPitch</b></a></li>
            // <li align="center" style={{fontSize:'17px', color: 'white'}}><a href="http://marvelus.me/vis" style={{color: '#c12c2c'}}><b>Visualization of BGDB</b></a></li>
             
</Col>
<Col xs={4} md={4}>
            {/* Links to the required resources */}
            <h3 align="center" style={{color: 'white'}}><b>Data</b></h3>
            <li align="center" style={{color: 'white',fontSize:'17px'}}><a href="https://developer.marvel.com/docs" style={{color: '#c12c2c'}}><b>Marvel API</b></a>: We did not use any
                specific libraries to scrape the Marvel API, just the python requests module.
            </li>
            <li align="center" style={{color: 'white',fontSize:'17px'}}><a href="https://developers.themoviedb.org/3/" style={{color: '#c12c2c', fontSize:'17px'}}><b>The Movie Database</b></a>: We used the
                <a href="https://pypi.python.org/pypi/tmdbsimple" style={{color: '#c12c2c'}}> tmdbsimple</a> library to scrape data from the tmdb
                API
            </li>
</Col>
<Col xs={4} md={4}>
            <h3 align="center" style={{color: 'white'}}><b>Tools used</b></h3>
                <li align="center" style={{fontSize:'17px', color: 'white'}}><a  href="https://hannahanees.gitbooks.io/technical-report/content/" style={{color: '#c12c2c'}}>Technical report</a></li>
            <li align="center" style={{fontSize:'17px', color: 'white'}}><a  href="https://hannahanees.gitbooks.io/uml-diagram/content/"style={{color: '#c12c2c'}}>UML Diagram</a></li>
    </Col>
    </Row>
        </div>
    </div>
)

export default About