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

app.post('/messages', (req, res) => {
    const message = new Message(req.body)

    message.save()
    .then(() =>{
        console.log('saved')
       return  Message.findOne({ message: 'badword' })
    })
    .then( censored => {
        if (censored) {
            console.log('censored words found', censored)
            return message.remove({ _id: censored.id })
        }
        io.emit('message', req.body)
        res.sendStatus(200)

    })
    .catch((err) => {
        res.sendStatus(500)
        return console.error(err)
    })
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