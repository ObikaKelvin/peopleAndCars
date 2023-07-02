import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdatePerson from '../forms/UpdatePerson'
import Cars from '../lists/Cars'

const getStyles = () => ({
  personCard: {
    minWidth: '900px'
  }
})

const Person = props => {
    const styles = getStyles()
    const { id, firstName, lastName, cars, setCars, persons, setPersons } = props
  
    const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
          persons={persons}
          setPersons={setPersons}
        />
      ) : (
        <Card
            title={`${firstName} ${lastName}`}
            style={styles.personCard}
            actions={[
                <EditOutlined key='edit' onClick={handleButtonClick} />,
                        
                <RemovePerson id={id} firstName={firstName} lastName={lastName} persons={persons} setPersons={setPersons}/>
            ]}
        >

            <Cars cars={cars} setCars={setCars} currentPersonId={id} persons={persons} />
            
            Learn More
        </Card>
      )}
    </div>
  )
}

export default Person
