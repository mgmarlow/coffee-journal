import React from 'react'
import CoffeeList from './CoffeeList'
import AddCoffee from './AddCoffee'

function App(props) {
  return (
    <div className="container is-fluid">
      <h1 className="title">Coffee Journal</h1>
      <CoffeeList />
      <AddCoffee />
    </div>
  )
}

function AppRoot(props) {
  return <App />
}

export default AppRoot
