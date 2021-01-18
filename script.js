const IMG_CLOSED = './resources/close.png'
const IMG_OPENED = './resources/open.png'

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

    if (meter.getValue() > 0.0094) {
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
