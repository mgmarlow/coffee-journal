import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { GET_COFFEES } from './CoffeeList'

const DELETE_COFFEE = gql`
  mutation DeleteCoffeeMutation($id: ID!) {
    deleteCoffee(id: $id)
  }
`

const CoffeeItem = ({ coffee }) => {
  const { id, name, roaster, rating, notes } = coffee

  const [deleteCoffee] = useMutation(DELETE_COFFEE, {
    update(cache, { data: { deleteCoffee } }) {
      const { coffees } = cache.readQuery({ query: GET_COFFEES })

      cache.writeQuery({
        query: GET_COFFEES,
        data: { coffees: coffees.filter(c => c.id !== id) },
      })
    },
  })

  return (
    <div>
      <p>{name}</p>
      <button onClick={() => deleteCoffee({ variables: { id } })}>
        delete
      </button>
      <p>Roaster: {roaster}</p>
      {notes && <p>Notes: {notes}</p>}
      <p>{rating}/5</p>
      <p>edit</p>
    </div>
  )
}

export default CoffeeItem
