import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import CoffeeItem from './CoffeeItem'
import LinkButton from '../../components/LinkButton'

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
  if (error) return <p>Error when fetching coffee.</p>

  return (
    <div>
      <div className="columns is-mobile is-vcentered">
        <div className="column">
          <h2 className="is-size-1 is-inline-block">Your Coffees</h2>
        </div>
        <div className="column is-narrow has-text-right">
          <Link to="/add">
            <LinkButton>Add more!</LinkButton>
          </Link>
        </div>
      </div>

      <ul>
        {data.coffees.map(coffee => (
          <li style={{ marginBottom: '1rem' }} key={coffee.id}>
            <CoffeeItem coffee={coffee} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CoffeeList
