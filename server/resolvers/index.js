const protected = resolver => (...args) => {
  if (!args[2].user) {
    throw new Error('unauthenticated')
  }

  return resolver(...args)
}

module.exports = {
  Query: {
    coffees: (_obj, _args, ctx) => {
      return ctx.service.coffee.get()
    },
    getCoffee: (_obj, { id }, ctx) => {
      return ctx.service.coffee.getById(id)
    },
    user: protected((_ob, _args, ctx) => {
      return ctx.service.user.get(ctx.user.id)
    }),
  },

  Mutation: {
    createCoffee: protected((_obj, { input }, ctx) => {
      try {
        return ctx.service.coffee.create(input, ctx.user.id)
      } catch (err) {
        throw new Error('failed to create coffee')
      }
    }),
    updateCoffee: protected((_obj, { id, input }, ctx) => {
      try {
        return ctx.service.coffee.update(id, input)
      } catch (err) {
        throw new Error(`failed to update coffee with id ${id}`)
      }
    }),
    deleteCoffee: protected((_obj, { id }, ctx) => {
      try {
        return ctx.service.coffee.destroy(id)
      } catch (err) {
        throw new Error(`failed to delete coffee with id ${id}`)
      }
    }),

    signup: (_obj, { email, password }, ctx) => {
      return ctx.service.user.signup(email, password)
    },
    login: (_obj, { email, password }, ctx) => {
      return ctx.service.user.login(email, password)
    },
  },

  User: {
    coffees: (user, _args, ctx) => ctx.service.coffee.getByUserId(user.id),
  },
}
