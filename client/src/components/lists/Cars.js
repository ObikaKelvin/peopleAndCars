import { useQuery } from '@apollo/client'
import { GET_PERSONS } from '../../queries'
import { List } from 'antd'
import Contact from '../listItems/Person'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Cars = () => {
  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_PERSONS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`


  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.persons.map(({ id, firstName, lastName, cars }) => (
        <List.Item key={id}>
            <Contact
                id={id}
                firstName={firstName}
                lastName={lastName}
                cars={cars}
            />
        </List.Item>
      ))}
    </List>
  )
}

export default Cars
