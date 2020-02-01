const Airtable = require('airtable')
const CoffeeService = require('../services/coffee.service')

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.BASE_ID)

module.exports = {
  service: {
    coffee: new CoffeeService(base),
  },
}
