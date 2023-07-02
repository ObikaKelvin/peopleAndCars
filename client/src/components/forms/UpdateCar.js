import { useMutation } from '@apollo/client'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import { useEffect, useState } from 'react'
import filter from 'lodash.filter'

import { UPDATE_CAR } from '../../queries'
import formatPrice from '../../utils/formatPrice'

const UpdateCar = props => {
  const { id, year, make, model, price, personId, persons, cars, setCars } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updateCar] = useMutation(UPDATE_CAR)
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values;

    const filteredCars = filter(cars, c => {
        return c.id !== id
    });

    const variables = {
        id,
        year,
        make,
        model,
        price,
        personId
      }
    
    filteredCars.push(variables);

    setCars(filteredCars)
    console.log(filteredCars)

    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      }
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
        year,
        make,
        model,
        price,
        personId
      }}
      size='large'
    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input car year!' }]}
      >
        <InputNumber placeholder='year' />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input car make!' }]}
      >
        <Input placeholder='make' />
      </Form.Item>

      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input car model!' }]}
      >
        <Input placeholder='model' />
      </Form.Item>

      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input car price!' }]}
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
            <Select
                placeholder="Select a person"
            >
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
              (!form.isFieldTouched('year') && !form.isFieldTouched('make')
              && !form.isFieldTouched('model') && !form.isFieldTouched('year') && !form.isFieldTouched('personId') )
              ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
