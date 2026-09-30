const express = require ('express')
const app = express()
const cors = require('cors')
const helmet = require('helmet')
const multer = require('multer')
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

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

app.post("/upload", upload.single("file"), (req, res) => {
    if(!req.file){
        return res.status(400).json({
            error: "No file uploaded"
        })
    }

    console.log(req.file);

    res.json({
        message: "Successfully upload",
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
    })
})


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


app.post("/upload", upload.single("file"), (req, res) => {
    const buffer = req.file.buffer;
    console.log(req.file);

    res.json({
        filename: req.file.origninalname,
        size: req.file.size,
        type: req.file.mimetype
    });
})

app.listen(port, () => {
    console.log(`Serveur démaré sur http://localhost:${port}`)
})