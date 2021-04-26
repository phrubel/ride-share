import React from 'react';
import './RidingCard.css'
import { Button, Card, Container } from 'react-bootstrap';
import { useHistory } from 'react-router';

const RidingCard = (props) => {
    const { name, image, id } = props.ride;

    const history = useHistory()

    const handleRides = () => {
        history.push(`/destination/${id}`)
    }

    return (

        <div className="main-content">
            <Container>
                <Card className="card mt-3">
                    <Card.Img variant="top" src={image} />
                    <h2 className="text-center">{name}</h2>
                    <Button onClick={handleRides}>Share Ride</Button>

                </Card>
            </Container>
        </div>
    );
};

export default RidingCard;