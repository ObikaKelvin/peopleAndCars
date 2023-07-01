import { useQuery } from '@apollo/client'
import { GET_PERSONS } from '../../queries'
import { List } from 'antd'
import Contact from '../listItems/Contact'
import { useEffect } from 'react'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Contacts = (props) => {
  const styles = getStyles()

  const { persons, setPersons } = props
  
  const { loading, error, data } = useQuery(GET_PERSONS)

  useEffect(() => {
    if(data) {
        setPersons(data.persons)
    }
  }, [data])

  useEffect(() => {
    if(persons) {
        setPersons(persons)
    }
  }, [persons])

  const displayPersons = () => {
    if(persons) {
        return persons.map(({ id, firstName, lastName, cars }) => (
            <List.Item key={id}>
                <Contact
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    cars={cars}
                    persons={persons}
                    setPersons={setPersons}
                />
            </List.Item>
        ))
    }
    else {
        return (<></>)
    }
  }

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  console.log('data', data)

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {displayPersons()}
    </List>
  )
}

export default Contacts
