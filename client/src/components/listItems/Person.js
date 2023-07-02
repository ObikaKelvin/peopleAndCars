import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'

import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../forms/UpdatePerson'
import Cars from '../lists/Cars'

const getStyles = () => ({
  personCard: {
    minWidth: '900px'
  }
})

const Person = props => {
    const styles = getStyles()
    const { id, firstName, lastName, cars, setCars, persons, setPersons, showLink, showActions } = props
  
    const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }
  const actions = []

    if(showActions) {
        actions.push(<EditOutlined key='edit' onClick={handleButtonClick} />)
        
        actions.push(<RemovePerson id={id} firstName={firstName} lastName={lastName} persons={persons} setPersons={setPersons}/>)
        
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
            actions={actions}
        >

            <Cars cars={cars} setCars={setCars} currentPersonId={id} persons={persons} />
            
            {showLink && <Link to={`/people/${id}`}>Learn More</Link>}
        </Card>
      )}
    </div>
  )
}

Person.defaultProps = {
    showLink: true,
    showActions: true
}

export default Person
