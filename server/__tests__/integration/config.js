const { Pool } = require('pg');

const resetQuery = `
TRUNCATE colours RESTART IDENTITY;

INSERT INTO owners (name, address) 
VALUES
    ('Owner1', 'Address1' ),
    ('Owner2', 'Address2' );

INSERT INTO dogs (name, age, owner_id) 
VALUES
    ('Dog1', 10, 1 ),
    ('Dog2', 3, 2 ),
    ('Dog3', 5, 1 );
`


// enable resetting of db between tests
const resetTestDB = () => {
  return new Promise(async (res, rej) => {
    try {
      const db = new Pool();
      await db.query(resetQuery)
      res('Test DB reset')
    } catch (err) {
      rej('Could not reset TestDB')
    }
  })
}

// make these things available to test suites
// global.request = request
// global.app = apiServer
// global.resetTestDB = resetTestDB
