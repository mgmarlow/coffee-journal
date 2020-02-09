class BrewMethod {
  constructor(id, fields) {
    this.id = id
    this.name = fields['Name']
    this.description = fields['Description']
  }
}

module.exports = BrewMethod
