import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import './Destination.css'
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import fakedata from '../../fakedata/fakeData';
import man from '../../resource/peopleicon.png';
import LoggedOut from '../LoggedOut/LoggedOut'


const Destination = () => {

    const { id } = useParams();
    const typeOFRide = fakedata.filter(ride => ride.id == id)
    // console.log(typeOFRide[0]);
    const [isSearch, setIsSearch] = useState(false)

    const { register, handleSubmit, errors } = useForm();
    const [searchResult, setSearchResult] = useState({})
    const onSubmit = data => {
        const newSearchResult = {
            pickFrom: data.pickFrom,
            pickTo: data.pickTo
        }
        setSearchResult(newSearchResult)
        setIsSearch(true)
    }

    return (
        <div className="background">
            <LoggedOut></LoggedOut>
            <section className="container pt-4 mt-3 border-top">
                <div className="row">
                    <div className="col-md-3">
                        {!isSearch ? <div className="search-box">
                            <form onSubmit={handleSubmit(onSubmit)} className="pickup-form rounded p-3">
                                <label htmlFor="pickFrom" className="mb-0">Pick From</label>
                                <input name="pickFrom" id="pickFrom" ref={register({ required: true })} className="d-block m-0 w-100 rounded border-0 py-1 px-2" />
                                {errors.pickFrom && <p className="error mt-1 mb-2">Input Your Place Name</p>}

                                <label htmlFor="pickTo" className="mb-0">Your Destination</label>
                                <input name="pickTo" id="pickTo" ref={register({ required: true })} className="d-block m-0 w-100 rounded border-0 py-1 px-2" />
                                {errors.pickTo && <p className="error mt-1 mb-2">Input where are you want to go</p> }
                                
                                <input type="date"  style={{ width: '75%' }} id="" />

                                <input type="submit" value="Search" className="d-block w-100 btn btn-danger mt-3" />
                            </form>
                        </div> : <div className="searchResult">
                            <h5 className="bg-danger text-white p-3 rounded">From : {searchResult.pickFrom} <br /> To : {searchResult.pickTo}</h5>
                            <div className="searchResultCard bg-danger d-flex justify-content-around rounded py-3 px-2">
                                <img className="w-25" src={typeOFRide[0].image} alt={typeOFRide[0].id} />
                                <h4 style={{ color: 'white' }}> <img style={{ height: '15px', width: '15px', color: 'white' }} src={man} alt="" />{typeOFRide[0].capacity} </h4>
                                <h4 style={{ color: 'white' }}>$ {typeOFRide[0].price}</h4>
                            </div>
                            <div className="searchResultCard bg-danger d-flex justify-content-around rounded mt-3 py-3 px-2">
                                <img className="w-25" src={typeOFRide[0].image} alt={typeOFRide[0].id} />
                                <h4 style={{ color: 'white' }}> <img style={{ height: '15px', width: '15px', color: 'white' }} src={man} alt="" />{typeOFRide[0].capacity} </h4>
                                <h4 style={{ color: 'white' }}>$ {typeOFRide[0].price}</h4>
                            </div>
                            <div className="searchResultCard bg-danger d-flex justify-content-around rounded mt-3 py-3 px-2">
                                <img className="w-25" src={typeOFRide[0].image} alt={typeOFRide[0].id} />
                                <h4 style={{ color: 'white' }}> <img style={{ height: '15px', width: '15px', color: 'white' }} src={man} alt="" />{typeOFRide[0].capacity} </h4>
                                <h4 style={{ color: 'white' }}>$ {typeOFRide[0].price}</h4>
                            </div>
                        </div>
                        
                        }

                    </div>

                    <div className=" map">
                        <div ><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Bangladesh+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe><a href="https://www.maps.ie/route-planner.htm">Journey Planner</a></div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Destination;