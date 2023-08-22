const Colour = require('../models/Colour')

const index = async (req, res) => {
  try {
    const colours = await Colour.getAll()
    res.status(200).send({ data: colours })
  } catch (error) {
    res.status(500).send({ error })
  }
}

const create = async (req, res) => {
  try {
    const data = req.body
    const colour = await Colour.create(data)
    res.status(201).send({ data: colour })
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}

const destroy = async (req, res) => {
  try {
    const { name } = req.params
    const colour = await Colour.findByName(name)
    await colour.destroy()
    res.sendStatus(204)
  } catch (err) {
    res.status(404).send({ error: err.message })
  }
}

module.exports = { index, create, destroy }
