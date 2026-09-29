const express = require ('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const ratelimit = require('express-rate-limit')
const port = 3000

require('dotenv').config()
require('./config/db')

const limiter = ratelimit({
    windowsMs: 15 * 60 * 1000,
    limit: 100,
    message: {status: 429, error: 'Too many requests; please try again later.'}
})

//Import des routes


app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin"}
    })
)
app.use(express.json())

const corsOption = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsOption))
app.use(limiter)

// Routeur

app.listen(port, () => {
    console.log(`Serveur démaré sur http://localhost:${port}`)
})