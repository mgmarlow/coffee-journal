const BrewMethod = require('../models/BrewMethod')

class BrewMethodService {
  constructor(base) {
    this.base = base
  }

  async byId(id) {
    const result = await this.base('Brew Methods').find(id)
    return new BrewMethod(result.id, result.fields)
  }
}

module.exports = BrewMethodService
