const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const mongoose = require('mongoose')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const DBURL = "mongodb://tone2k:dcb22191@ds113640.mlab.com:13640/node-messenger"

const messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Tom', message: 'Hey'},
    {name: 'Tam', message: 'Hello'}
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body)
    res.sendStatus(200)
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