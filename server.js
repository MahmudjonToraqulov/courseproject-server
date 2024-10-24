const express = require('express')
const cors = require('cors')

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173/'
}

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

const db = require('./models')
const Role = db.role

// db.sequalize.sync()
db.sequalize.sync({ force: true }).then(() => {
    console.log('Drop and resync DB');
    initial()
})

function initial() {
    Role.create({
        id: 1,
        name: 'user'
    }),
    Role.create({
        id: 2,
        name: 'admin'
    })
}

app.get('/', (req, res) => {
    res.json({ message: "Welcome to my Web application!" })
})

// routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/topic.routes')(app)
require('./routes/commets.routes')(app)
require('./routes/tag.routes')(app)
// require('./routes/form.routes')(app)
// require('./routes/like.routes')(app)
// require('./routes/template.routes')(app)



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server is running on PORT - ', PORT, '!!!');
})