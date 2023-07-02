import { useMutation } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR } from '../../queries'

const UpdateCar = props => {
  const { id, year, make, model, price, personId, persons } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updateCar] = useMutation(UPDATE_CAR)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values

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
        <Input placeholder='i.e. 1995' />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input car make!' }]}
      >
        <Input placeholder='i.e. Toyota' />
      </Form.Item>

      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input car model!' }]}
      >
        <Input placeholder='i.e. Toyota' />
      </Form.Item>

      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input car price!' }]}
      >
        <Input placeholder='i.e. Toyota' />
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
