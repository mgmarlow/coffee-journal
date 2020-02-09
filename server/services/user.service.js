const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/User')

class UserService {
  constructor(base) {
    this.base = base
  }

  async get(id) {
    const result = await this.base('Users').find(id)
    return new User(id, result.fields)
  }

  async signup(email, password) {
    const result = await this.base('Users').create({
      Email: email,
      Hash: await bcrypt.hash(password, 10),
    })

    return jsonwebtoken.sign({ id: result.id, email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
  }

  async login(email, password) {
    let user
    await this.base('Users')
      .select()
      .eachPage((records, fetch) => {
        user = records.find(record => record.get('Email') === email)
        fetch()
      })

    if (!user) {
      throw new Error('no user found')
    }

    const valid = await bcrypt.compare(password, user.get('Hash'))

    if (!valid) {
      throw new Error('incorrect password')
    }

    return jsonwebtoken.sign({ id: user.id, email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })
  }
}

module.exports = UserService
