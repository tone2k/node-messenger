const request = require('request')

describe('calc', () =>{
    it('should multiple 2 and 2', () =>{
        expect(2*2).toBe(4)
    })
})

describe('get messages', () =>{
    it('should return 200 OK', (done) =>{
        request.get('http://localhost:3000/messages', (err, res) =>{
            console.log(res.body)
            expect(res.statusCode).toEqual(200)
            done()
        })
    it('should return a list that is not empty', (done) => {
            request.get('http://localhost:3000/messages', (err, res) => {
                expect(JSON.parse(res.body).legnth).toBeGreaterThan(0)
                done()
            })
        })
    })
})

describe('get messages from a user', () =>{
    it('should return 200 OK', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            console.log(res.body)
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('name should be john', (done) => {
        request.get('http://localhost:3000/messages/tim', (err, res) => {
            console.log(res.body)
            expect(JSON.parse(res.body)[0].name).toEqual('tim')
            done()
        })
        
    })
})