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

        /*let url_issues = "https://api.github.com/repos/roshan-dongre/idb/issues"
        axios.get(url_issues)
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
            }); */
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
                                <p>Number of issues: TBA</p>
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
                                <p>Number of issues: TBA</p>
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
                                <p>Number of issues: TBA</p>
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
                                <p>Responsibilities: Data Management: scraping, aggregating, and data modelling.</p>
                                <p>Number of commits: {this.state.ramonCommits}</p>
                                <p>Number of issues: TBA</p>
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
                                <p>Number of issues: TBA</p>
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
                                            <li className="text-left"><h4><strong>total no. of issues:</strong> TBA</h4></li>
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
                                            <li className="text-left"><h4>PostgresSQL</h4></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 container data-thumbnail">
                                    <div className="text-center">
                                        <h1><u>Data</u></h1>
                                        <p><strong>FBI Crime Stats API:</strong> Provided crime stats through GET Requests</p>
                                        <p><strong>FBI Most Wanted API:</strong> Provided information on most wanted criminals</p>
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
                        </div>
                    </div>
        );
}
}
