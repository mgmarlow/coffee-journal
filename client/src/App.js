import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CoffeeList from './CoffeeList'
import AddCoffee from './AddCoffee'

const AddCoffeePage = () => (
  <section>
    <h1>add coffee</h1>
    <AddCoffee />
  </section>
)

// TODO: Add slab: https://tachyons.io/components/lists/slab-stat-large/index.html
const Home = () => (
  <section className="mw7 center">
    <h1 className="f1 1h-title">coffee journal</h1>
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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
