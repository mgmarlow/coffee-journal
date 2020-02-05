module.exports = {
  coffees: (_, ctx) => {
    return ctx.service.coffee.get()
  },

  getCoffee: ({ id }, ctx) => {
    return ctx.service.coffee.getById(id)
  },

  createCoffee: ({ input }, ctx) => {
    try {
      return ctx.service.coffee.create(input)
    } catch (err) {
      throw new Error('failed to create coffee')
    }
  },

  updateCoffee: ({ id, input }, ctx) => {
    try {
      return ctx.service.coffee.update(id, input)
    } catch (err) {
      throw new Error(`failed to update coffee with id ${id}`)
    }
  },

  deleteCoffee: ({ id }, ctx) => {
    try {
      return ctx.service.coffee.destroy(id)
    } catch (err) {
      throw new Error(`failed to delete coffee with id ${id}`)
    }
  },

  me: (_, ctx) => {
    if (!ctx.user) {
      throw new Error('unauthenticated')
    }

    return ctx.service.user.get(ctx.user.id)
  },

  signup: ({ email, password }, ctx) => {
    return ctx.service.user.signup(email, password)
  },

  login: ({ email, password }, ctx) => {
    return ctx.service.user.login(email, password)
  },
}
