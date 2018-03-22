import React from 'react'
import {Row, Col, Panel} from 'react-bootstrap'
import './About.css'
import axios from 'axios';


var imageStyles = {
    width: '400px',
    height: '350px'
}

var linkStyles = {
    color: 'white'
}
    
export default class About extends React.Component {


constructor(props) {
    super(props);
    this.state = {
        ricardoCommits: 0,
        roshanCommits: 0,
        zaraCommits: 0,
        ramonCommits: 0,
        krishnaCommits: 0,
        totalCommits: 0,
        ricardoIssues: 0,
        roshanIssues: 0,
        zaraIssues: 0,
        ramonIssues: 0,
        krishnaIssues: 0
    }
}

componentDidMount() {
    this.callAPI()
}

callAPI = () => {
        let url = "https://api.github.com/repos/roshan-dongre/idb/stats/contributors"

        let self = this
        axios.get(url)
            .then((res) => {
                // Set state with result
                self.setState({ krishnaCommits: res.data[0].total,
                                ramonCommits: res.data[1].total,
                                ricardoCommits: res.data[2].total,
                                zaraCommits: res.data[3].total,
                                roshanCommits: res.data[4].total,
                                totalCommits: res.data[0].total + res.data[1].total +res.data[2].total +res.data[3].total +res.data[4].total
                });
            })
            .catch((error) => {
                console.log(error)
            });

        let url_issues = "https://api.github.com/repos/roshan-dongre/idb/issues?&state=all"
        axios.get(url_issues)
            .then((res) => {
                var krishna = 0
                var ramon = 0
                var ricardo = 0
                var zara = 0
                var roshan = 0

                for (var i = 0; i<res.data.length; i++) {
                    if (res.data[i].user.login == "zaralouis")
                        zara += 1
                    if (res.data[i].user.login == "larius11")
                        ricardo += 1
                    if (res.data[i].user.login == "roshan-dongre")
                        roshan += 1
                    if (res.data[i].user.login == "rp27537")
                        ramon += 1
                    if (res.data[i].user.login == "ramdeepk2")
                        krishna += 1               
                }

                self.setState({ krishnaIssues: krishna,
                                ramonIssues: ramon,
                                ricardoIssues: ricardo,
                                zaraIssues: zara,
                                roshanIssues: roshan,
                                totalIssues: krishna + ramon + ricardo + zara + roshan
                });
                
            })
            .catch((error) => {
                console.log(error)
            });
}

render () {
    return (

            <div>

                <header className="bg-secondary text-white">
                  <div className="container text-center">
                    <h1>The Slackers About Page</h1>
                    <p className="lead"></p>
                  </div>
                </header>

                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center">
                                <h1 className="title">The Team</h1>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://larius11.github.io/cs373-blog/assets/headshot.jpg" alt="Ricardo Pic" data-toggle="modal" data-target="#ricardoModal" style = {imageStyles}/>
                                <h2>Ricardo Riveron</h2>
                                <p>Bio: 4th year CS student currently working full-time at H-E-B. I love to play music, watch netflix, and play videogames when I'm not too busy doing work.</p>
                                <p>Responsibilities: Create a project board, Set up Git book for API documentation, Add a new column for each group member, Add issues to our project.</p>
                                <p>Number of commits: {this.state.ricardoCommits}</p>
                                <p>Number of issues: {this.state.ricardoIssues}</p>
                                <p>Number of unit tests: 0</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://avatars3.githubusercontent.com/u/14967965?s=460&v=4" alt="Roshan Pic" data-toggle="modal" data-target="#roshanModal" style = {imageStyles}/>
                                <h2>Roshan Dongre</h2>
                                <p>Bio: Senior pursuing a double major in Computer Science and Finance. Interested in trading and sports analytics. I enjoy playing tennis, working out, and playing poker.</p>
                                <p>Responsibilities: Wrote technical report, AWS/Namecheap, Front-end model pages, About page, part of Flask integration</p>
                                <p>Number of commits: {this.state.roshanCommits}</p>
                                <p>Number of issues: {this.state.roshanIssues}</p>
                                <p>Number of unit tests: 0</p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://zaralouis.files.wordpress.com/2018/01/headshot1.jpg?w=2048&h=1814" alt="Zara Pic" data-toggle="modal" data-target="#zaraModal" style = {imageStyles}/>
                                <h2>Zara Louis</h2>
                                <p>Bio: I am a third year CS student from Plano, Texas. I enjoy working out and reading in my spare time.</p>
                                <p>Responsibilities: Focused on designing the front end for the website, including the grid pages and 9 models.</p>
                                <p>Number of commits: {this.state.zaraCommits}</p>
                                <p>Number of issues: {this.state.zaraIssues}</p>
                                <p>Number of unit tests: 0</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://rp27537cs373sp18.files.wordpress.com/2018/01/why.png" alt="Ramon Pic" data-toggle="modal" data-target="#ramonModal" style = {imageStyles}/>
                                <h2>Ramon Perez</h2>
                                <p>Bio: CS student hailing from New Braunfels, Texas. This is my third year as part of UTCS, and I'm in the Software Engineering and Artificial Intelligence classes this semester. I enjoy video games, running, and playing with my cats.</p>
                                <p>Responsibilities: Data Management: scraping, aggregating, and data modeling.</p>
                                <p>Number of commits: {this.state.ramonCommits}</p>
                                <p>Number of issues: {this.state.ramonIssues}</p>
                                <p>Number of unit tests: 0</p>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="text-center">
                                <img className="img-thumbnail" src="https://ramdeepk2.github.io/ramdeepk2.github.io/cs373/headshot.JPG" alt="Krishna Pic" data-toggle="modal" data-target="#krishnaModal" style = {imageStyles}/>
                                <h2>Krishna Ramdeep</h2>
                                <p>Bio: CS senior taking Computer Vision, Programming for Performance, Software Engineering, and Randomized Algorithms. I like to work out, hike, and read in my free time (which I don't get too much of).</p>
                                <p>Responsibilities: API Report</p>
                                <p>Number of commits: {this.state.krishnaCommits}</p>
                                <p>Number of issues: {this.state.krishnaIssues}</p>
                                <p>Number of unit tests: 0</p>
                            </div>
                        </div>
                    </div>

                            <div className="row">
                                <div className="col-md-3 container data-thumbnail">
                                    <div className="text-center">
                                        <h1><u>Stats</u></h1>
                                        <ul>
                                            <li className="text-left"><h4><strong>total no. of commits: {this.state.totalCommits}</strong></h4></li>
                                            <li className="text-left"><h4><strong>total no. of issues:</strong> {this.state.totalIssues}</h4></li>
                                            <li className="text-left"><h4><strong>total no. of unit tests:</strong> 0</h4></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-2 container data-thumbnail">
                                    <div className="text-center">
                                        <h1><u>Tools</u></h1>
                                        <ul>
                                            <li className="text-left"><h4>Slack</h4></li>
                                            <li className="text-left"><h4>Flask</h4></li>
                                            <li className="text-left"><h4>React</h4></li>
                                            <li className="text-left"><h4>Postman</h4></li>
                                            <li className="text-left"><h4>Travis CI</h4></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-2 container data-thumbnail">
                                    <div className="text-center">
                                        <h1><u>Tools</u></h1>
                                        <ul>
                                            <li className="text-left"><h4>GitHub</h4></li>
                                            <li className="text-left"><h4>Mocha</h4></li>
                                            <li className="text-left"><h4>Selenium</h4></li>
                                            <li className="text-left"><h4>SQLAlchemy</h4></li>
                                            <li className="text-left"><h4>MySQL</h4></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 container data-thumbnail">
                                    <div className="text-center">
                                        <h1><u>Data</u></h1>
                                        <p><strong>FBI Crime Stats API:</strong> Provided crime stats through GET Requests</p>
                                        <p><strong>FBI Most Wanted API:</strong> Provided information on most wanted criminals</p>
                                        <p><strong>Google Maps API:</strong> Provided maps for the model pages</p>
                                    </div>
                                </div>
                                <div className="col-md-2 container data-thumbnail">
                                    <div className="text-center">
                                        <h1><u>Technical</u></h1>
                                        <a href="https://roshan-dongre.gitbooks.io/api/" style = {linkStyles}><h4><u>API Documentation</u></h4></a>
                                        <a href="https://roshan-dongre.gitbooks.io/report/" style = {linkStyles}><h4><u>Technical Report</u></h4></a>
                                        <a href="https://github.com/roshan-dongre/idb" style = {linkStyles}><h4><u>GitHub Repository</u></h4></a>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 container data-thumbnail">
                                    <div className="text-left">
                                        <ul>
                                            <li className="text-left"><h4><strong>Description: </strong>On The Run is a website that allows people to draw interesting connections between the FBI Most Wanted Page and information
                                            on different types of crimes as well as information on the states in which these crimes were committed</h4></li>
                                            <li className="text-left"><h4><strong>Purpose: </strong>To provide information linking criminals, their crimes, and the states they committed crimes in</h4></li>
                                            <li className="text-left"><h4><strong>Intended Users: </strong> Anyone interested in learning about crime/criminals</h4></li>
                                            <li className="text-left"><h4><strong>Explanation: </strong> This integration of disparate data allows people to not only see specfic information about each criminal, but also a macro look at crime in the states in which they committed their crimes</h4></li>
                                            <li className="text-left"><h4><strong>Scraping: </strong> We used the requests module to scrape the two FBI apis, and used React to request from the Google Maps API</h4></li>
                                            <li className="text-left"><h4><strong>Tools: </strong> We used Slack to communicate, Flask handles the API data requests and acts as an interface that communicates with the front-end, React for the 
                                            dynamic front-end, Postman for the API testing, Travis CI for the build logs, Mocha for the front-end tests, Selenium for the acceptance tests, and unnitest for the backend tests. SQLAlchemy
                                            and MySQL are used for the database and GitHub is used to store our code. </h4></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        );
}
}
