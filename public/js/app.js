

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageTwo.textContent = 'Loading...'
    fetch('/weather?address=' + location).then((response) => {
        response.json().then(data => {
            if (!data.error) {
                messageTwo.textContent = 'Temperature is ' + data.temperature + ' in ' + data.location
            } else {
                messageTwo.textContent = data.error
            }
        })
    })
})