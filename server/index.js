const dotenv = require('dotenv')
const path = require('path')
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const app = require('./server')

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Express running on port ${port}`))
