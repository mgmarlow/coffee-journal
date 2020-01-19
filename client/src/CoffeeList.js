import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const COFFEES = gql`
  {
    coffees {
      id
      name
      rating
    }
  }
`
const CoffeeList = () => {
  const { loading, error, data } = useQuery(COFFEES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <ul>
      {data.coffees.map(coffee => (
        <li key={coffee.id}>
          {coffee.name}: ({coffee.rating})
        </li>
      ))}
    </ul>
  )
}

export default CoffeeList
