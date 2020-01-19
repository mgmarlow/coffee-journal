// credit: https://hipsum.co/
const CORPUS =
  'single-origin coffee mustache beard four loko letterpress 8-bit chartreuse drinking vinegar VHS cloud bread aesthetic vaporware. Glossier asymmetrical mixtape health goth offal activated charcoal iPhone cray pour-over typewriter air plant kinfolk'

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max)) + 1

const createFakeDatabase = () => {
  const res = []
  const wordArray = CORPUS.split(' ')
  wordArray.forEach((word, i) => {
    if ((i + 1) % 2 === 0) {
      res.push(`${wordArray[i - 1]} ${word}`)
    }
  })

  return res.map(name => ({
    id: require('crypto')
      .randomBytes(10)
      .toString('hex'),
    name,
    rating: getRandomInt(5),
  }))
}

module.exports = createFakeDatabase
