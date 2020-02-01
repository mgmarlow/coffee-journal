const Coffee = require('../models/Coffee')

const fieldsFromInput = input => ({
  Name: input.name,
  Roaster: input.roaster,
  Rating: input.rating,
  'Roast Date': input.roast_date,
  'Brew Date': input.brew_date,
  'Roast Style': input.roast_style,
  Origin: input.origin,
  Notes: input.notes,
})

class CoffeeService {
  constructor(base) {
    this.base = base
  }

  async get() {
    const result = await this.base('Coffee ratings')
      .select({
        view: 'Grid view',
      })
      .all()

    return result.map(c => new Coffee(c.id, c.fields))
  }

  async getById(id) {
    const result = await this.base('Coffee ratings').find(id)
    return new Coffee(result.id, result.fields)
  }

  async create(input) {
    const result = await this.base('Coffee ratings').create(
      fieldsFromInput(input),
    )
    return new Coffee(result.id, result.fields)
  }

  async update(id, input) {
    const result = await this.base('Coffee ratings').update(
      id,
      fieldsFromInput(input),
    )
    return new Coffee(result.id, result.fields)
  }

  async destroy(id) {
    const result = await this.base('Coffee ratings').destroy(id)
    return 'success'
  }
}

module.exports = CoffeeService
