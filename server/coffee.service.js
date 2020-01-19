class Coffee {
  constructor(id, fields) {
    this.id = id
    this.roaster = fields['Roaster']
    this.name = fields['Name']
    this.rating = fields['Rating']
    this.roast_date = fields['Roast Date']
    this.brew_date = fields['Brew Date']
    this.roast_style = fields['Roast Style']
    this.origin = fields['Origin']
    this.notes = fields['Notes']
  }
}

async function get(_, { base }) {
  const result = await base('Coffee ratings')
    .select({
      view: 'Grid view',
    })
    .all()

  return result.map(c => new Coffee(c.id, c.fields))
}

async function create({ input }, { base }) {
  const result = await base('Coffee ratings').create([
    {
      fields: fieldsFromInput(input),
    },
  ])

  return new Coffee(result[0].id, result[0].fields)
}

async function update({ id, input }, { base }) {
  const result = await base('Coffee ratings').update([
    {
      id,
      fields: fieldsFromInput(input),
    },
  ])

  return new Coffee(result[0].id, result[0].fields)
}

function fieldsFromInput(input) {
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

module.exports = {
  get,
  create,
  update,
}
