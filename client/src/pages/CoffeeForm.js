import React from 'react'
import { useHistory } from 'react-router-dom'
import omit from 'lodash/omit'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

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

const UPDATE_COFFEE = gql`
  mutation UpdateCoffeeMutation($id: ID!, $input: CoffeeInput!) {
    updateCoffee(id: $id, input: $input) {
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
  origin: yup.string().nullable(),
  rating: yup
    .number()
    .required()
    .positive()
    .max(5)
    .integer(),
  roast_date: yup.date().nullable(),
  brew_date: yup
    .date()
    .default(() => new Date().toLocaleDateString())
    .nullable(),
  roast_style: yup.string().nullable(),
  notes: yup.string().nullable(),
})

const CoffeeForm = ({ coffee }) => {
  const history = useHistory()
  const [addCoffee] = useMutation(ADD_COFFEE)
  const [updateCoffee] = useMutation(UPDATE_COFFEE)

  const defaultValues = {
    roaster: '',
    name: '',
    origin: '',
    rating: 1,
    // roast_date: new Date().toLocaleDateString(),
    // brew_date: new Date().toLocaleDateString(),
    roast_style: '',
    notes: '',
  }

  const initialValues = coffee
    ? omit(coffee, ['id', '__typename'])
    : defaultValues

  const handleSubmit = async values => {
    if (coffee) {
      await updateCoffee({ variables: { id: coffee.id, input: values } })
      history.push('/')
    } else {
      await addCoffee({ variables: { input: values } })
      history.push('/')
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
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

          {/* <label className="label">roast date</label>
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
          /> */}

          <label className="label">brew date</label>
          <Field
            className="textarea"
            as="textarea"
            name="notes"
            placeholder="tasting notes"
          />

          <button className="button is-link" type="submit">
            {coffee ? 'edit' : 'add'} coffee
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default CoffeeForm
