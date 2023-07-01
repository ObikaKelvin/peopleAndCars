import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdatePerson from '../forms/UpdatePerson'

const getStyles = () => ({
  card: {
    width: '500px'
  }
})

const Person = props => {
  const { id, firstName, lastName, cars, persons, setPersons } = props
  console.log(cars);
  const styles = getStyles()
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
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
                    
            <RemovePerson id={id} firstName={firstName} lastName={lastName} persons={persons} setPersons={setPersons}/>
          ]}
        >
          {firstName} {lastName}
        </Card>
      )}
    </div>
  )
}

export default Person
