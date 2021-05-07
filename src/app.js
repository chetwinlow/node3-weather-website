const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecastFile = require('./utils/forecast.js')
const geocodeFile = require('./utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000


// Defined paths for Express config
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')
const pub = path.join(__dirname, '../public')

// Setup HBS engine and views loc
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Set up static dir to serve
app.use(express.static(pub))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Chetwin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Chetwin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        exampleMessage: 'dont play play hor',
        name: 'Chetwin'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to provide an address!'
        })
    }
    geocodeFile.geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecastFile.forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                temperature: data.temperature,
                feelslike: data.feelslike,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
     });
})

app.get('/help/*', (req, res) => {
    res.render('errors', {
        title: 'Error 404',
        error: 'Help article not found',
        name: 'Chetwin'
    })
})

app.get('*', (req,res) => {
    res.render('errors', {
        title: 'Error 404',
        error: 'Page not found',
        name: 'Chetwin'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
