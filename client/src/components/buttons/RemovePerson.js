import { useMutation } from '@apollo/client'
import { GET_PERSONS, REMOVE_PERSON } from '../../queries'

import { DeleteOutlined } from '@ant-design/icons'
import filter from 'lodash.filter'

const RemovePerson = ({ id, persons, setPersons }) => {
    
//   const [removePerson] = useMutation(REMOVE_PERSON)

  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const results = cache.readQuery({ query: GET_PERSONS })
      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          persons: filter(results.persons, c => {
            return c.id !== removePerson.id
        })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want ot delete this person?')
    if (result) {
    
        const filteredPersons = filter(persons, p => {
            return p.id !== id
        });

        setPersons(filteredPersons)
        
        removePerson({
            variables: {
            id
            }
        })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemovePerson
