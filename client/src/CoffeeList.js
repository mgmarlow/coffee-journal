import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import CoffeeItem from './CoffeeItem'

export const GET_COFFEES = gql`
  {
    coffees {
      id
      roaster
      name
      rating
      roast_date
      brew_date
      roast_style
      origin
      notes
    }
  }
`

const CoffeeList = () => {
  const { loading, error, data } = useQuery(GET_COFFEES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <ul>
      {data.coffees.map(coffee => (
        <li style={{ marginBottom: '1rem' }} key={coffee.id}>
          <CoffeeItem coffee={coffee} />
        </li>
      ))}
    </ul>
  )
}

export default CoffeeList
