import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PERSONS } from '../../queries'

const AddPerson = (props) => {
  const [addPerson] = useMutation(ADD_PERSON)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const { persons, setPersons } = props

  // to disable the submit button at the beginning
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const id = uuidv4()
    const { firstName, lastName } = values
    const variables = { id, firstName, lastName }
    setPersons([...persons, variables])

    addPerson({
      variables,
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PERSONS })
        cache.writeQuery({
          query: GET_PERSONS,
          data: {
            ...data,
            persons: [...data.persons, addPerson]
          }
        })
      }
    })

    form.resetFields();
  }

  return (
    <Form
      form={form}
      name='add-person-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
        
      <Form.Item
        label='First Name'
        name='firstName'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder='First Name' />
      </Form.Item>
      <Form.Item
        label='Last Name'
        name='lastName'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input placeholder='Last Name' />
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
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddPerson
