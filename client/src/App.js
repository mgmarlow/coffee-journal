import React from 'react'
import CoffeeList from './CoffeeList'
import AddCoffee from './AddCoffee'

function App(props) {
  return (
    <div>
      <h1>Coffee Journal</h1>
      <AddCoffee />
      <CoffeeList />
    </div>
  )
}

function AppRoot(props) {
  return <App />
}

export default AppRoot
