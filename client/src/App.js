import React from 'react'
import { useLocation } from 'react-router-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import CoffeeList from './pages/CoffeeList'
import CoffeeForm from './pages/CoffeeForm'
import Nav from './components/Nav'
import Footer from './components/Footer'

const Page = ({ children }) => (
  <div>
    <Nav />
    <section className="container">{children}</section>
    <Footer />
  </div>
)

const EditCoffeePage = () => {
  const { state } = useLocation()

  return (
    <Page>
      <h1 className="is-size-1">edit coffee</h1>
      <CoffeeForm coffee={state} />
    </Page>
  )
}

const AddCoffeePage = () => (
  <Page>
    <h1 className="is-size-1">add coffee</h1>
    <CoffeeForm />
  </Page>
)

// TODO: Add slab: https://tachyons.io/components/lists/slab-stat-large/index.html
const Home = () => (
  <Page>
    <CoffeeList />
  </Page>
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
