const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Tom', message: 'Hey'},
    {name: 'Tam', message: 'Hello'}
]

app.get('/messages', (req, res) => {
    res.send(messages)
})

app.post('/messages', (req, res) => {
    console.log(req.body)
    messages.push(req.body);
    res.sendStatus(200)
})


const server = app.listen(3000, () => {
    console.log('server is listening on port: ', server.address().port)
})