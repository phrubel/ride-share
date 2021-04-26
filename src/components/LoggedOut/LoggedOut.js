import React, { useContext, useState } from 'react';
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../resource/logo.png'
import { useHistory, useLocation } from 'react-router-dom';
import './LoggedOut.css'
import {UserContext} from '../../App'
import { handleSignOut, initializeLoginFramework } from '../Login/LoginManager';


const LoggedInHeader = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
        password: '',
        error: '',
        success: false,
    })

    
    initializeLoginFramework();

    const signOut = () => {
        handleSignOut()
        .then(res => {
            handleResponse(res, false);
        })
    }

    const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    } 

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
                                    <button onClick={signOut} className="login-btn" type="submit">Log Out</button>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LoggedInHeader;