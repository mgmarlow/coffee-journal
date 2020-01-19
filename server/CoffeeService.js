const Airtable = require('airtable')
const Coffee = require('./Coffee')

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.BASE_ID)

class CoffeeService {
  static async get() {
    const result = await base('Coffee ratings')
      .select({
        view: 'Grid view',
      })
      .all()

    return result.map(c => new Coffee(c.id, c.fields))
  }

  static async create({ input }) {
    const result = await base('Coffee ratings').create([
      {
        fields: this.fieldsFromInput(input),
      },
    ])

    return new Coffee(result[0].id, result[0].fields)
  }

  static async update({ id, input }) {
    const result = await base('Coffee ratings').update([
      {
        id,
        fields: this.fieldsFromInput(input),
      },
    ])

    return new Coffee(result[0].id, result[0].fields)
  }

  static fieldsFromInput(input) {
    return {
      Name: input.name,
      Rating: input.rating,
      'Roast Date': input.roast_date,
      'Brew Date': input.brew_date,
      'Roast Style': input.roast_style,
      Origin: input.origin,
      Notes: input.notes,
    }
  }
}

module.exports = CoffeeService
