import { gql } from '@apollo/client'

export const GET_PERSONS = gql`
  {
    persons {
      id
      firstName
      lastName
    }
  }
`

export const GET_PERSON_WITH_CARS = gql`
    query GetPerson($id: String!){
        personWithCars(id: $id) {
            id
            firstName
            lastName
            cars {
                id
                make
                model
                year
                price
            }
        }
  }
`

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`

export const GET_CARS = gql`
  {
    cars {
        id
        make
        model
        year
        price
        personId
    }
  }
`

export const ADD_CAR = gql`
    mutation AddCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
        addCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
            id
            year
            make
            model
            price  
            personId 
        }
    }
`

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $make: String!, $model: String!, $year: Int!, $price: Float!, $personId: String!) {
    updateCar(id: $id, make: $make, model: $model, year: $year, price: $price, personId: $personId) {
        id
        make
        model
        year
        price  
        personId 
    }
}
  
`

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
        id
        make
        model
        year
        price
        personId
    }
  }
`
