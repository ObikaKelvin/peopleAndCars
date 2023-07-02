import { useQuery } from '@apollo/client'
import { GET_PERSONS } from '../../queries'
import { List } from 'antd'
import Person from '../listItems/Person'
import { useEffect } from 'react'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Persons = (props) => {
  const styles = getStyles()

  const { persons, setPersons, cars, setCars } = props
  
  const { loading, error, data } = useQuery(GET_PERSONS)

  useEffect(() => {
    if(data) {
        setPersons(data.persons)
    }
  }, [data?.persons?.length])


  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`


  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {persons.map(({ id, firstName, lastName }) => (
            <List.Item key={id}>
                <Person
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    cars={cars}
                    setCars={setCars}
                    persons={persons}
                    setPersons={setPersons}
                />
            </List.Item>
        ))}
    </List>
  )
}

export default Persons
