import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Button, Container, Nav, MenuItem, NavDropdown, FormGroup, FormControl } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Search from './Search'

export default class Header extends Component {

    render(){
        return(
          <Navbar className="navbar-default" inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
              <a href="/"><img src="https://static.spin.com/files/TOOTHY_21B.jpg" height="50" width="70" class="inline-block"/> On The Run</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>

            <Navbar.Collapse>
                <Nav pullRight>
                <LinkContainer to="/about">
                <NavItem eventKey={1}>About</NavItem>
                </LinkContainer>
                <LinkContainer to="/criminals">
                <NavItem eventKey={1}>Criminals</NavItem>
                </LinkContainer>
                <LinkContainer to="/states">
                <NavItem eventKey={1}>States</NavItem>
                </LinkContainer>
                <LinkContainer to="/crimes">
                <NavItem eventKey={1}>Crimes</NavItem>
                </LinkContainer>
                <Search allData={this.props.allData}/>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )
    }
}
