import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import facebook from '../../resource/facebook.png'
import google from '../../resource/google.png'
import './Login.css'
import { handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

const Login = () => {

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

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            })

    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo)
        }
    }

    const handleSubmit = (e) => {
        if (user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }

    return (
        <div>
            <Container style={{ marginTop: '50px' }}>
                <Row>
                    <Col></Col>
                    <Col className="form">
                        <h3 style={{ textAlign: 'center', color: 'red', fontWeight: '700' }}>Login</h3>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control name="email" onBlur={handleBlur} style={{ border: 'none', borderBottom: '1px solid gray' }} type="email" placeholder="Username or Email" required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control name="password" onBlur={handleBlur} style={{ border: 'none', borderBottom: '1px solid gray' }} type="password" placeholder="Password" required />
                            </Form.Group>

                            <button style={{ width: '100%' }} className="logIn-Btn" variant="primary" type="submit"> Login </button>

                            <Form.Group style={{ marginTop: '5px', textAlign: 'center' }}>
                                <p>Don't have account? <Link to="/signup" style={{ color: '#F9A51A' }}>Create an Account</Link></p>
                            </Form.Group>
                        </Form>

                        <p style={{ marginTop: '-13px' }} className='text-center'>or</p>

                        <div className="loginSign">
                            <button className=' btn' onClick={fbSignIn} ><img src={facebook} alt="" /> Continue with Facebook</button>
                            <button className='mt-3 btn' onClick={googleSignIn}><img src={google} alt="" /> Continue with Google</button>
                        </div>

                        <p style={{ color: 'red', textAlign: 'center' }}>{user.error}</p>
                        {user.success && <p style={{ color: 'green', textAlign: 'center' }}>Logged In successfully!</p>}
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
