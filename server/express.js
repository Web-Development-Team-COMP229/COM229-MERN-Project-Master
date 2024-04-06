import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import appointmentRoutes from './routes/appointment.routes.js'
import path from 'path'
const app = express()
const CURRENT_WORKING_DIR = process.cwd()

/*app.get('/', (req, res) => {
 res.status(200).send(Template()) 
 })*/
app.use(cookieParser())
app.use(compress())
app.use(helmet())
var whitelist = ['http://localhost:3000','http://localhost:5173', 'http://127.0.0.1:5173', 'https://com229-mern-project-group4.onrender.com']
var corsOptions = {
    credentials: true,
    origin: function(origin, callback) {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ " + origin);
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
}

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', appointmentRoutes)


app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})


export default app

