import { Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdateCar from '../forms/UpdateCar'
import formatPrice from '../../utils/formatPrice'


const getStyles = () => ({
    carCard: {
      minWidth: '900px',
      marginBottom: "40px"
    }
  })

const Car = props => {
  const { id, year, make, model, price, cars, personId, setCars, persons } = props
  const styles = getStyles()
  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
          cars={cars}
          setCars={setCars}
          persons={persons}
        />
      ) : (
        <Card
            title={`${year} ${make} ${model} -> ${formatPrice(price)}`}
            type="inner"
            style={styles.carCard}
            actions={[
                <EditOutlined key='edit' onClick={handleButtonClick} />,
                        
                <RemoveCar id={id} cars={cars} setCars={setCars}/>
            ]}
        >
            
        </Card>
      )}
    </div>
  )
}

export default Car
