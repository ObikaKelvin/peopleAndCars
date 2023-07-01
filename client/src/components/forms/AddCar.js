import { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PERSONS } from '../../queries'

const AddCar = (props) => {
  const [id] = useState(uuidv4())
  const [addCar] = useMutation(ADD_PERSON)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const { persons, setPersons } = props

  // to disable the submit button at the beginning
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    addCar({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_PERSONS })
        cache.writeQuery({
          query: GET_PERSONS,
          data: {
            ...data,
            contacts: [...data.contacts, addCar]
          }
        })
      }
    })
  }

  const displayPersons = () => {
    if(persons) {
        return persons.map(person => {
            return(<Select.Option value={`${person.id}`}>{person.firstName} {person.lastName}</Select.Option>)
        })
    }
  }

  return (
    <Form
      form={form}
      name='add-contact-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
        
      <Form.Item
        label='Year'
        name='year'
        rules={[{ required: true, message: 'Please input a year!' }]}
      >
        <Input placeholder='Year' />
      </Form.Item>

      <Form.Item
        label='Model'
        name='make'
        rules={[{ required: true, message: 'Please input a make!' }]}
      >
        <Input placeholder='Make' />
      </Form.Item>

      <Form.Item
        label='Model'
        name='model'
        rules={[{ required: true, message: 'Please input a model!' }]}
      >
        <Input placeholder='Model' />
      </Form.Item>

      <Form.Item
        label='price'
        name='price'
        rules={[{ required: true, message: 'Please input a price!' }]}
      >
        <Input placeholder='price' />
      </Form.Item>

        <Form.Item
            label='Person'
            name='person'
            rules={[{ required: true, message: 'Please input a person!' }]}
        >
            <Select>
                {displayPersons()}
            </Select>
        </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddCar
