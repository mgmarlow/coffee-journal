import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { GET_COFFEES } from './CoffeeList'
import LinkButton from './components/LinkButton'
import styles from './CoffeeItem.module.scss'

const DELETE_COFFEE = gql`
  mutation DeleteCoffeeMutation($id: ID!) {
    deleteCoffee(id: $id)
  }
`

const CoffeeItem = ({ coffee }) => {
  const [notesVisible, setNotesVisible] = React.useState(false)
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
    <div className={styles.wrapper}>
      <div className="columns is-mobile is-vcentered">
        <div className="column">
          <h3 className="is-size-2">{name}</h3>
        </div>
        <div className="column is-narrow is-right">
          <Link to={{ pathname: `/edit/${id}`, state: coffee }}>
            <LinkButton>edit</LinkButton>
          </Link>
        </div>
        <div className="column is-narrow is-right">
          <button
            className={classnames('delete', styles.delete)}
            type="button"
            onClick={() => deleteCoffee({ variables: { id } })}
          />
        </div>
      </div>

      <p>
        <span className="has-text-weight-bold">Roaster</span>: {roaster}
      </p>
      <p>
        <span className="has-text-weight-bold">Rating</span>: {rating}/5
      </p>

      {notes && (
        <>
          <LinkButton
            className="is-paddingless"
            onClick={() => setNotesVisible(!notesVisible)}
          >
            {notesVisible ? 'hide' : 'show'} notes
          </LinkButton>
          {notesVisible && <p>{notes}</p>}
        </>
      )}
    </div>
  )
}

export default CoffeeItem
