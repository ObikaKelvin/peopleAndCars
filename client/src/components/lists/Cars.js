import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_CARS } from '../../queries'
import { List } from 'antd'
import Car from '../listItems/Car'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Cars = (props) => {
  const styles = getStyles()

  const { cars, setCars, currentPersonId, persons } = props

  const { loading, error, data } = useQuery(GET_CARS)

  useEffect(() => {
    if(data) {
        setCars(data.cars)
    }
  }, [data?.cars?.length])

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`


  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {cars.map(({ id, year, make, model, price, personId }) => {
        
        if(currentPersonId === personId) {
            return (
                <List.Item key={id}>
                    <Car
                        id={id}
                        year={year}
                        make={make}
                        model={model}
                        price={price}
                        cars={cars}
                        setCars={setCars}
                        persons={persons}
                        personId={personId}
                    />
                </List.Item>
            )
        }
      })}
    </List>
  )
}

export default Cars
