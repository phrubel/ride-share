import React from 'react';
import { useState } from 'react';
import Header from '../Header/Header';
import fakedata from '../../fakedata/fakeData'
import RidingCard from '../RidingCard/RidingCard';
import './Home.css';

const Home = () => {
    const ridesData=fakedata
    const [rides, setRides] = useState(ridesData)

    return (
        <div className='home-background'>
            <Header></Header>
            {
                rides.map(ride => <RidingCard ride={ride} key={ride.id}></RidingCard>)
            }
        </div>
    );
};

export default Home;





import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const CheckOut = (props) => {
    const [order, setOrder] = useState([])
    const { _id } = useParams()
    const checkoutProduct = order.filter(product => product._id == _id)
    const singleProduct = checkoutProduct[0]
    const { name, weight, price } = singleProduct || {};

    const handleOrder = () => {
        const newOrder ={
            name:order.name,
            weight: order.weight,
            price: order.price,
        }
        console.log(order)
        console.log(order.name)

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(newOrder)
        })
            .then(res => res.json())
            .then(data => console.log(data))
    }


    useEffect(() => {
        fetch('http://localhost:5000/order')
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [])
   


    return (
        <div style={{ marginTop: "65px" }}>
            <Container>
                <h3>Check Out</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Weight</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{name}</td>
                            <td>1</td>
                            <td>{weight}</td>
                            <td>{price}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button onClick={handleOrder} style={{ marginLeft: "85%" }} variant="warning">Check Out</Button>
            </Container>

        </div>
    );
};

export default CheckOut;