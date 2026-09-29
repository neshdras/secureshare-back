const express = require ('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const ratelimit = require('express-rate-limit')
const port = 3000

require('dotenv').config()
require('./config/db')

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin"}
    })
)

const corsOption = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsOption))

const limiter = ratelimit({
    windowsMs: 15 * 60 * 1000,
    limit: 100,
    message: {status: 429, error: 'Too many requests; please try again later.'}
})

app.use(limiter)


//Middleware
app.use(express.json())

//Import des routes
// const authRoutes = require('./routes/authRoutes')

// app.use('/api/vi/auth', authRoutes)

// Routeur

app.listen(port, () => {
    console.log(`Serveur démaré sur http://localhost:${port}`)
})