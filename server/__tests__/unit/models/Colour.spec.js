const Colour = require('../../../models/Colour')

const db = require('../../../db')

describe('Dog', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('class', () => {
    it('exists', () => {
      expect(Colour).toBeDefined()
    })

    it('should be an instance of a Colour', () => {
      const colour = new Colour('cadeblue')
      expect(colour).toBeInstanceOf(Colour)
    })
  })


  describe('getAll', () => {
    it('resolves with Colours on successful', async () => {
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({
          rows: [{ name: 'red' }, { name: 'blue' }, { name: 'green' }]
        })

      const colours = await Colour.getAll()
      expect(colours).toHaveLength(3)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('oh no'))

      try {
        await Colour.getAll()
      } catch (err) {
        expect(err).toBeDefined()
        expect(err.message).toBe('oh no')
      }
    })
  })

  describe('findByName', () => {
    it('resolves with colour on successful db query', async () => {
      let colourData = { id: 1, name: 'cadetblue' }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [colourData] })

      const result = await Colour.findByName('cadetblue')
      expect(result).toBeInstanceOf(Colour)
      expect(result.name).toBe('cadetblue')
      expect(result.id).toBe(1)
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue()

      try {
        await Colour.findByName('red')
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('colour red does not exist')
      }
    })
  })

  describe('create', () => {
    it('resolves with colour on successful db query', async () => {
      let colourData = { name: 'plum' }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ ...colourData, id: 1 }] });

      const result = await Colour.create(colourData);
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('created_at')
    })

    it('should throw an Error on db query error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('name missing'))

      try {
        await Colour.create({})
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('name missing')
      }
    })
  })

  describe('destroy', () => {
    it('resolves with colour on successful db query', async () => {
      let colourData = { name: 'plum' }
      jest.spyOn(db, 'query')
        .mockResolvedValueOnce({ rows: [{ ...colourData, id: 1 }] });

      const result = await Colour.create(colourData);
      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('created_at')
    })
  })
})
