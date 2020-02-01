import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { GET_COFFEES } from './CoffeeList'

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

const schema = yup.object().shape({
  roaster: yup.string().required(),
  name: yup.string().required(),
  origin: yup.string(),
  rating: yup
    .number()
    .required()
    .positive()
    .max(5)
    .integer(),
  roast_date: yup.date(),
  brew_date: yup.date().default(() => new Date().toLocaleDateString()),
  roast_style: yup.string(),
  notes: yup.string(),
})

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
      validationSchema={schema}
      onSubmit={values => {
        addCoffee({ variables: { input: values } })
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <label className="label">roaster</label>
          <Field className="input" type="text" name="roaster" />
          <ErrorMessage
            component="p"
            className="help is-danger"
            name="roaster"
          />

          <label className="label">name</label>
          <Field className="input" type="text" name="name" />
          <ErrorMessage component="p" className="help is-danger" name="name" />

          <label className="label">origin</label>
          <Field className="input" type="text" name="origin" />
          <ErrorMessage
            component="p"
            className="help is-danger"
            name="origin"
          />

          <label className="label">roast style</label>
          <Field className="input" type="text" name="roast_style" />
          <ErrorMessage
            component="p"
            className="help is-danger"
            name="roast_style"
          />

          <label className="label">rating</label>
          <Field
            className="input"
            type="number"
            name="rating"
            min="1"
            max="5"
          />
          <ErrorMessage
            component="p"
            className="help is-danger"
            name="rating"
          />

          <label className="label">roast date</label>
          <Field className="input" type="text" name="roast_date" />
          <ErrorMessage
            component="p"
            className="help is-danger"
            name="roast_date"
          />

          <label className="label">brew date</label>
          <Field className="input" type="text" name="brew_date" />
          <ErrorMessage
            component="p"
            className="help is-danger"
            name="brew_date"
          />

          <label className="label">brew date</label>
          <Field
            className="textarea"
            as="textarea"
            name="notes"
            placeholder="tasting notes"
          />

          <button className="button is-link" type="submit">
            add coffee
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default AddCoffee
