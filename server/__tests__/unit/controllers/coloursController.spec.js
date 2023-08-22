const coloursController = require('../../../controllers/colours')
const Colour = require('../../../models/Colour')

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }


describe('colours controller', () => {
  beforeEach(() => jest.clearAllMocks())

  describe('index', () => {
    it('returns dogs with a 200 status code', async () => {
      const testColours = ['c1', 'c2']
      jest.spyOn(Colour, 'getAll')
        .mockResolvedValue(testColours)

      await coloursController.index(null, mockRes)
      expect(mockStatus).toHaveBeenCalledWith(200)
      expect(mockSend).toHaveBeenCalledWith({ "data": testColours })
    })

    it('calls Colour.getAll', async () => {
      const testColours = { "data": ['c1', 'c2'] }

      jest.spyOn(Colour, 'getAll')
        .mockResolvedValue(testColours)

      await coloursController.index(null, mockRes)
      expect(Colour.getAll).toHaveBeenCalledTimes(1)
    })

    it('sends an error upon fail', async () => {
      jest.spyOn(coloursController, 'index')
        .mockRejectedValue(new Error('Something happened to your db'))

      try {
        await coloursController.index(null, mockRes)
      } catch (error) {
        expect(error).toBeTruthy()
        expect(error.message).toBe('Something happened to your db')
      }
    })
  })
})
