request = require('request')

const forecast = (lat, long, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=8d79c0f10fd41401423d955acd667f7b&query=' + lat + ',' + long
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('No internet bodoh', un)
        } else if (body.error) {
            callback('Invalid lat long, try again boiii')
        } else {
            const { observation_time, temperature, feelslike } = body.current
            callback(undefined, {
                observation_time,
                temperature,
                feelslike
            })
        }
    })
}

module.exports = {
    forecast: forecast
}