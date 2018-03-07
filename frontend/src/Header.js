import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavItem, Button, Container, Nav, MenuItem, NavDropdown, FormGroup, FormControl } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import './Header.css'

// The Header creates links that can be used to navigate
// between routes.
//Got the basic outline for the navbar from https://react-bootstrap.github.io/components.html#navigation


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
          <Navbar className="navbar-default" inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">On The Run</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>


            <Navbar.Collapse>
                <Nav>
                <LinkContainer to="/home">
                <NavItem eventKey={1}>Home</NavItem>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )

    }

}
export default Header
