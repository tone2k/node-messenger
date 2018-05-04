const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

mongoose.Promise = Promise;

const DBURL = "mongodb://tone2k:dcb22191@ds113640.mlab.com:13640/node-messenger"

const Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages) 
    })
})

app.get('/messages:user', (req, res) => {
    const user = req.params.user
    Message.find({name: user}, (err, messages) => {
        res.send(messages)
    })
})

app.post('/messages', async (req, res) => {

    try {
        const message = new Message(req.body)

        const savedMessage = await message.save()

        console.log('saved')

        const censored = await Message.findOne({ message: 'badword' })
        if (censored)
            await message.remove({ _id: censored.id })
        else
            io.emit('message', req.body)

        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    } finally {
        
    }
})

io.on('connection', (socket) => {
    console.log('user connected!')
})

mongoose.connect(DBURL, {useMongoClient: true}, (err) => {
    console.log('mongo db connection', err)
})

const server = http.listen(3000, () => {
    console.log('server is listening on port: ', server.address().port)
})