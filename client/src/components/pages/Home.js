import { useState } from 'react';
import Title from '../layout/Title'
import AddPerson from '../forms/AddPerson'
import AddCar from '../forms/AddCar'
import Persons from '../lists/Persons'

const Home = () => {
    const [persons, setPersons] = useState([]);
    const [cars, setCars] = useState([]);
    
    return (
        <div className='App'>
            <Title title='People and their cars' />
            
            <Title title='Add Person' />
            <AddPerson persons={persons} setPersons={setPersons}/>
            
            <Title title='Add Car' />
            <AddCar persons={persons} setPersons={setPersons}/>
            
            <Persons persons={persons} setPersons={setPersons} />
        </div>
    )
}

export default Home;