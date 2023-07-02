import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom';  
import { GET_PERSON_WITH_CARS } from '../../queries'
import { List, Button } from 'antd'
import Person from '../listItems/Person'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  },

  button: {
    display: 'block',
    margin: '0 auto'
  }
})

const People = (props) => {
  const styles = getStyles()
  const { id } = useParams();
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState(null);
  
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, 
    { variables: {
        id
    }})

  useEffect(() => {
    console.log(data)
    if(data) {
        setPerson(data.personWithCars)
    }
  }, [data])


  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  if(!person) {
    return <></>
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <>
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            <List.Item key={id}>
                <Person
                    id={person.id}
                    firstName={person.firstName}
                    lastName={person.lastName}
                    cars={cars}
                    setCars={setCars}
                    persons={persons}
                    setPersons={setPersons}
                    showLink={false}
                    showActions={false}
                />
            </List.Item>
        </List>

        <Button onClick={goHome} style={styles.button}>GO HOME</Button>
    </>
  )
}

export default People
