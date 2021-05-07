request = require('request')

const forecast = (lat, long, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=8d79c0f10fd41401423d955acd667f7b&query=' + lat + ',' + long
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('No internet bodoh', un)
        } else if (body.error) {
            callback('Invalid lat long, try again boiii')
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + ' degrees out.  It feels like ' +
                body.current.feelslike + " degrees out. The humidity is " + body.current.humidity + "%. ")
        }
    })
}

module.exports = {
    forecast: forecast
}