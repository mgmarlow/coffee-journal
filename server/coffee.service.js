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

async function getById({ id }, { base }) {
  const result = await base('Coffee ratings').find(id)
  return new Coffee(result.id, result.fields)
}

async function create({ input }, { base }) {
  const result = await base('Coffee ratings').create(fieldsFromInput(input))
  return new Coffee(result.id, result.fields)
}

async function update({ id, input }, { base }) {
  const result = await base('Coffee ratings').update(id, fieldsFromInput(input))
  return new Coffee(result.id, result.fields)
}

async function destroy({ id }, { base }) {
  const result = await base('Coffee ratings').destroy(id)
  return 'success'
}

function fieldsFromInput(input) {
  return {
    Name: input.name,
    Roaster: input.roaster,
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
  getById,
  create,
  update,
  destroy,
}
