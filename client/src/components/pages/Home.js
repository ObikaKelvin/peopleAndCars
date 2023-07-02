import { useState } from 'react';
import { Divider } from "antd";

import Title from '../layout/Title'
import AddPerson from '../forms/AddPerson'
import AddCar from '../forms/AddCar'
import Persons from '../lists/Persons'

const Home = () => {
    const [persons, setPersons] = useState([]);
    const [cars, setCars] = useState([]);
    
    return (
        <div className='App'>
            <Title title='PEOPLE AND THEIR CARS' />

            <Divider />
            
            <Divider>
                <Title title='Add Person' />
            </Divider>

            <AddPerson persons={persons} setPersons={setPersons}/>
            
            {persons.length !== 0 &&
                (
                    <>
                        <Divider>
                            <Title title='Add Car' />
                        </Divider>

                        <AddCar cars={cars} setCars={setCars} persons={persons} />
                    </>
                )
            }

            <Divider>
                <Title title='Records' />
            </Divider>
            
            <Persons 
                persons={persons} 
                setPersons={setPersons}
                cars={cars}
                setCars={setCars}
            />
        </div>
    )
}

export default Home;