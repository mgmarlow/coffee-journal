class User {
  constructor(id, fields) {
    this.id = id
    this.email = fields['Email']
  }
}

module.exports = User
