import React from 'react'
import CoffeeList from './CoffeeList'
import AddCoffee from './AddCoffee'

const App = () => {
  return (
    <div className="container">
      <h1 className="title">Coffee Journal</h1>
      <CoffeeList />
      <AddCoffee />
    </div>
  )
}

export default App
