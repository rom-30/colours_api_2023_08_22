const app = require('../../app');
const request = require('supertest')

xdescribe('description', () => {
  let api;

  // beforeEach(async () => {
  //   await resetTestDB()
  // })

  beforeAll(async () => {
    api = app.listen(5000, () => console.log('Test server running on port 5000'))
  })

  afterAll(async () => {
    console.log('Gracefully stopping the server')
    await api.close()
  })

  it('should return a list of all colours in database', async () => {
    const res = await request(api).get('/colours')
    expect(res.body).toHaveLength(9)
  })
})
