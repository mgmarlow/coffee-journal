const Airtable = require('airtable')
const CoffeeService = require('../services/coffee.service')
const UserService = require('../services/user.service')

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.BASE_ID)

module.exports = req => ({
  user: req.user,
  service: {
    coffee: new CoffeeService(base),
    user: new UserService(base),
  },
})
