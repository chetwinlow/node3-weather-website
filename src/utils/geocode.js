const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY2hldHdpbmxvdyIsImEiOiJja21nNGplZGExYzFyMnZraHBwOHJldDM2In0._P8oq4MKSJdE6zHY8Qjw-g&limit=1`
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location, try again!', undefined)
        } else {
            const { features } = body;
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}


module.exports = {
    geocode: geocode
}