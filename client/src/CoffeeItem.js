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
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">{name}</p>
        <button
          onClick={() => deleteCoffee({ variables: { id } })}
          className="card-header-icon"
        >
          delete
        </button>
      </header>
      <div className="card-content">
        <p className="subtitle is-6">Roaster: {roaster}</p>
        {notes && <p>Notes: {notes}</p>}
      </div>
      <div className="card-footer">
        <p className="card-footer-item">{rating}/5</p>
        <p className="card-footer-item">edit</p>
      </div>
    </div>
  )
}

export default CoffeeItem
