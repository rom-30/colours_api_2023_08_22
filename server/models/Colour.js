const db = require('../db')

class Colour {
  constructor(data) {
    this.id = data.id
    this.name = data.name
  }

  static async getAll() {
    try {
      const coloursData = await db.query('SELECT * FROM colours')
      return coloursData.rows.map(c => new Colour(c))
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async findByName(colourName) {
    try {
      const colourData = await db.query("SELECT * FROM colours where name = $1", [colourName])
      return new Colour(colourData.rows[0])
    } catch (error) {
      throw new Error(`${colourName} colour does not exist`)
    }
  }

  static async create(data) {
    try {
      const response = await db.query("INSERT INTO colours(name) VALUES ($1) RETURNING *", [data.name])

      return new Colour(response.rows[0])
    } catch (err) {
      throw new Error(err)
    }
  }

  async destroy() {
    const response = await db.query("DELETE FROM colours WHERE name = $1 RETURNING *", [this.name])
    return new Colour(response.rows[0])
  }
}

module.exports = Colour
