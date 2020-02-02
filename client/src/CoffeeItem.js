import React from 'react'
import { Link } from 'react-router-dom'
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
      <div className="columns is-mobile">
        <div className="column">
          <p className="has-text-weight-bold">{name}</p>
        </div>
        <div className="column">
          <Link to={{ pathname: `/edit/${id}`, state: coffee }}>
            <button>edit</button>
          </Link>
        </div>
        <div className="column">
          <button onClick={() => deleteCoffee({ variables: { id } })}>
            delete
          </button>
        </div>
      </div>

      <p>Roaster: {roaster}</p>
      <p>Rating: {rating}/5</p>
      {notes && (
        <>
          <h3 className="is-size-3">Notes:</h3>
          <p>{notes}</p>
        </>
      )}
    </div>
  )
}

export default CoffeeItem
