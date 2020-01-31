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

const FormItem = ({ name, label, children, className }) => (
  <div className="field">
    <label className="label is-small">{label}</label>
    <div className="control">
      {React.cloneElement(children, {
        className: className || 'input is-small',
      })}
      <ErrorMessage
        component="p"
        className="help is-danger"
        name={label || name}
      />
    </div>
  </div>
)

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

          <FormItem label="roast date" name="roast_date">
            <Field type="text" name="roast_date" />
          </FormItem>

          <FormItem label="brew date" name="brew_date">
            <Field type="text" name="brew_date" />
          </FormItem>

          <FormItem label="roast style" name="roast_style">
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
