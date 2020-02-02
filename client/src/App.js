import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CoffeeList from './CoffeeList'
import AddCoffee from './AddCoffee'

const EditCoffeePage = () => {
  const { state } = useLocation()

  return (
    <section className="container">
      <h1 className="is-size-1">edit coffee</h1>
      <AddCoffee coffee={state} />
    </section>
  )
}

const AddCoffeePage = () => (
  <section className="container">
    <h1 className="is-size-1">add coffee</h1>
    <AddCoffee />
  </section>
)

// TODO: Add slab: https://tachyons.io/components/lists/slab-stat-large/index.html
const Home = () => (
  <section className="container">
    <h1 className="is-size-1">coffee journal</h1>
    <Link to="/add">
      <button>Add a new coffee</button>
    </Link>
    <CoffeeList />
  </section>
)

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/add">
          <AddCoffeePage />
        </Route>
        <Route path="/edit/:id">
          <EditCoffeePage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
