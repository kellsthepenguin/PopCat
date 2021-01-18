const IMG_CLOSED = './resources/close.png'
const IMG_OPENED = './resources/open.png'

const SENSITIVITY = 0.0094 // 0.0094 default, range is 0 ~ 1

const meter = new Tone.Meter({
  channels: 1
})

const mic = new Tone.UserMedia().connect(meter)

mic.open().then(() => {
  if (Tone.context.state !== 'running') {
    Tone.context.resume()
  }
  meter.normalRange = true
  
  setInterval(() => {
    const status = document.getElementById('status')
    const statusText = document.getElementById('text_status')

    if (meter.getValue() > SENSITIVITY) {
      if (status.getAttribute('src') === IMG_CLOSED) {
        status.setAttribute('src', IMG_OPENED)
        statusText.innerHTML = 'popping'
      }
    } else if (status.getAttribute('src') === IMG_OPENED) {
      status.setAttribute('src', IMG_CLOSED)
      statusText.innerHTML = 'not popping'
    }
  }, 1)
}).catch(e => {
  alert('please grant mic permission (if you granted mic permission, see console.)')
  console.log(e)
})
