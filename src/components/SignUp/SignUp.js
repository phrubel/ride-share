import React, { useContext, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import google from '../../resource/google.png'
import facebook from '../../resource/facebook.png'
import {UserContext} from '../../App'
import './SignUp.css'
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, initializeLoginFramework } from '../Login/LoginManager';



const SignUp = () => {
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

    const handleSubmit = (e) => {
        if(user.email && user.password){
          createUserWithEmailAndPassword(user.name, user.email, user.password)
          .then(res => {
            handleResponse(res, true);
          })
        }
        e.preventDefault();
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
          isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
        }

        if(e.target.name === 'password'){
          const isPasswordValid = e.target.value.length > 5;
          const passwordHasNumber = /\d{1}/.test(e.target.value)
          isFieldValid = isPasswordValid && passwordHasNumber;
        }
        
        if(e.target.name === 'confirmPassword'){
            const isPasswordValid = e.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }

        if(isFieldValid){
          const newUserInfo = {...user};
          newUserInfo[e.target.name] = e.target.value;
          setUser(newUserInfo)
        }
    }

    const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }
    
    return (
        <div>
            <Container style={{marginTop: '50px'}}>
            <Row>
                <Col></Col>
                <Col className="form">
                    <h3 style={{textAlign:'center'}}>Create an Account</h3>                    
                    <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicText">
                        <Form.Control name="name" onBlur={handleBlur} style={{border:'none', borderBottom:'1px solid gray'}} type="text" placeholder="FirstName" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control name="name" onBlur={handleBlur} style={{border:'none', borderBottom:'1px solid gray'}} type="text" placeholder="LastName" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Control name="email" onBlur={handleBlur} style={{border:'none', borderBottom:'1px solid gray'}} type="email" placeholder="Username or Email" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control name="password" onBlur={handleBlur} style={{border:'none', borderBottom:'1px solid gray'}} type="password" placeholder="Password" required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control name="confirmPassword" onBlur={handleBlur} style={{border:'none', borderBottom:'1px solid gray'}} type="password" placeholder="Confirm Password" required />
                    </Form.Group>

                    <button style={{width: '100%'}} className="signUP-Btn" variant="primary" type="submit">Create an Account</button>

                    <Form.Group style={{marginTop:'5px', textAlign:'center'}}>
                        <p>Already have an account? <Link to="/login" style={{color:'#F9A51A'}}>Login</Link></p>
                    </Form.Group>
                    </Form>

                    <div className="d-flex justify-content-center">
                        <div style={{borderTop: '1px solid gray', width:'48%'}}></div>
                        <p style={{marginTop:'-13px'}}>or</p>
                        <div style={{borderTop:'1px solid gray', width:'48%'}}></div>
                    </div>

                    <div className="loginSign">
                                <button className=' btn' onClick={fbSignIn}><img src={facebook} alt=""/> Continue with Facebook</button>
                                <button className=' mt-3 btn' onClick={googleSignIn}><img src={google} alt=""/> Continue with Google</button>
                    </div>
                    
                    <p style={{color: 'red', textAlign:'center'}}>{user.error}</p>
                    {user.success && <p style={{color: 'green', textAlign:'center'}}>Account created successfully!</p>}
                </Col>
                <Col></Col>
            </Row>
            </Container>
        </div>
    );
};

export default SignUp;