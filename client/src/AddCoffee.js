import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const GET_COFFEES = gql`
  {
    coffees {
      id
      name
      rating
    }
  }
`

// Full object is needed from the
const ADD_COFFEE = gql`
  mutation CreateCoffeeMutation($input: CoffeeInput!) {
    createCoffee(input: $input) {
      id
      name
      rating
    }
  }
`

const AddCoffee = () => {
  const [name, setName] = React.useState('')
  const [rating, setRating] = React.useState(3)

  const [addCoffee] = useMutation(ADD_COFFEE, {
    // Note: update queries automatically update local cache
    update(cache, { data: { createCoffee } }) {
      const { coffees } = cache.readQuery({ query: GET_COFFEES })
      cache.writeQuery({
        query: GET_COFFEES,
        data: { coffees: coffees.concat([createCoffee]) },
      })
    },
  })

  const handleSubmit = e => {
    e.preventDefault()
    addCoffee({ variables: { input: { name, rating } } })
    setName('')
    setRating(3)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} type="text" />
      <input
        value={rating}
        onChange={e => setRating(parseInt(e.target.value), 10)}
        type="number"
        min="1"
        max="5"
      />
      <button type="submit">add coffee</button>
    </form>
  )
}

export default AddCoffee
