import React from 'react'
import { Formik, Form, Field } from 'formik'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { GET_COFFEES } from './CoffeeList'

// Full object is needed from the
const ADD_COFFEE = gql`
  mutation CreateCoffeeMutation($input: CoffeeInput!) {
    createCoffee(input: $input) {
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

const FormItem = ({ label, children, className }) => (
  <div className="field">
    <label className="label is-small">{label}</label>
    <div className="control">
      {React.cloneElement(children, {
        className: className || 'input is-small',
      })}
    </div>
  </div>
)

const AddCoffee = () => {
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

  return (
    <Formik
      initialValues={{
        roaster: '',
        name: '',
        origin: '',
        rating: 1,
        roast_date: new Date().toLocaleDateString(),
        brew_date: new Date().toLocaleDateString(),
        roast_style: '',
        notes: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        addCoffee({ variables: { input: values } })
      }}
    >
      {() => (
        <Form>
          <FormItem label="roaster">
            <Field type="text" name="roaster" />
          </FormItem>

          <FormItem label="name">
            <Field type="text" name="name" />
          </FormItem>

          <FormItem label="origin">
            <Field type="text" name="origin" />
          </FormItem>

          <FormItem label="rating">
            <Field type="number" name="rating" min="1" max="5" />
          </FormItem>

          <FormItem label="roast date">
            <Field type="text" name="roast_date" />
          </FormItem>

          <FormItem label="brew date">
            <Field type="text" name="brew_date" />
          </FormItem>

          <FormItem label="roast style">
            <Field type="text" name="roast_style" />
          </FormItem>

          <FormItem className="textarea" label="notes">
            <Field as="textarea" name="notes" placeholder="tasting notes" />
          </FormItem>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">
                add coffee
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default AddCoffee
