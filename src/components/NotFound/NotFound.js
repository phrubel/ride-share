import React from 'react';
import { Container } from 'react-bootstrap';
import gif from '../../resource/404.gif'

const NotFound = () => {
    return (
        <Container>
            <img style={{ width: '50%' }} src={gif} alt="" />
        </Container>
    );
};

export default NotFound;