import { useEffect, useState } from 'react'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from '@apollo/client'
import { ADD_CAR, GET_CARS } from '../../queries'
import formatPrice from '../../utils/formatPrice'

const AddCar = (props) => {
  const [addCar] = useMutation(ADD_CAR)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()
  const { cars, setCars, persons } = props

  // to disable the submit button at the beginning
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values
    const id = uuidv4();

    const variables = {id, year, make, model, price, personId }
    
    setCars([...cars, variables]);

    addCar({
      variables,
      update: (cache, { data: { addCar } }) => {
        const data = cache.readQuery({ query: GET_CARS })
        cache.writeQuery({
          query: GET_CARS,
          data: {
            cars: [...data.cars, addCar]
          }
        })
      }
    })

    form.resetFields();
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
        <InputNumber placeholder='Year' />
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
        <InputNumber placeholder='price' 
            formatter={formatPrice}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

        <Form.Item
            label='Person'
            name='personId'
            rules={[{ required: true, message: 'Please select a person!' }]}
        >
            <Select placeholder="Select a person">
                {persons.map(person => {
                    return(<Select.Option key={person.id} value={`${person.id}`}>{person.firstName} {person.lastName}</Select.Option>)
                })}
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
