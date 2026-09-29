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
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: {status: 429, error: 'Too many requests; please try again later.'}
})

app.use(limiter)


//Middleware
app.use(express.json())

//Import des routes
const authRoutes = require('./routes/authRoutes')


// Routeur
app.use('/api/v1/auth', authRoutes)


app.get('/', (req, res) => {
    res.send('Bienvenue sur SecureShare !')
})

app.listen(port, () => {
    console.log(`Serveur démaré sur http://localhost:${port}`)
})