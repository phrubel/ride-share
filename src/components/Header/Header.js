import React from 'react';
import "./Header.css";
import logo from '../../resource/logo.png'

import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <Container>
                <Row>
                    <Col>
                        <Navbar expand="lg">
                            <Link to="/home"><img style={{ width: "150px" }} src={logo} alt="" /></Link>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto nav">
                                    <Link className="menu-bar" to="/home">Home</Link>
                                    <Link className="menu-bar" to="/destination">Destination</Link>
                                    <Link className="menu-bar" to="/blog">Blog</Link>
                                    <Link className="menu-bar" to="/contact">Contact Us</Link>
                                    <Link to="/login"><button className="login-btn" type='submit'>Log In</button></Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Header;