import { useMutation } from '@apollo/client'
import { REMOVE_CAR } from '../../queries'

import { DeleteOutlined } from '@ant-design/icons'
import filter from 'lodash.filter'

const RemoveCar = ({ id, cars, setCars }) => {
    
  const [removeCar] = useMutation(REMOVE_CAR)

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want ot delete this car?')
    if (result) {
    
        const filteredCars = filter(cars, c => {
            return c.id !== id
        });

        setCars(filteredCars)
        
        removeCar({
            variables: {
            id
            }
        })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemoveCar
