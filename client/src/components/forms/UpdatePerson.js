import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import filter from 'lodash.filter'

import { UPDATE_PERSON } from '../../queries'

const UpdatePerson = props => {
  const { id, firstName, lastName, persons, setPersons } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updatePerson] = useMutation(UPDATE_PERSON)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    const filteredPersons = filter(persons, p => {
        return p.id !== id
    });

    const variables = {
        id,
        firstName,
        lastName
      }
    
    filteredPersons.push(variables);
    
    filteredPersons.sort(( a, b ) => {
        if ( a.id < b.id ){
          return -1;
        }
        if ( a.id > b.id ){
          return 1;
        }
        return 0;
    })

    setPersons(filteredPersons)

    updatePerson({
        variables
      })

    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-contact-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName
      }}
      size='large'
    >
      <Form.Item
        name='firstName'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder='i.e. John' />
      </Form.Item>
      <Form.Item
        name='lastName'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input placeholder='i.e. Smith' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdatePerson
