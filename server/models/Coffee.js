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

module.exports = Coffee