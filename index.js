const $ = {
    getEl(id) {
        return document.getElementById(id)
    },
    createEl(tag) {
        return document.createElement(tag)
    },
    createSvgEl(tag) {
        return document.createElementNS('http://www.w3.org/2000/svg', tag)
    },
    setAttr(el, attr, value) {
        el.setAttribute(attr, value)
    },
}

const face = $.getEl('face')
const clock = $.getEl('clock')
const secondHand = $.getEl('second-hand')
const minuteHand = $.getEl('minute-hand')
const hourHand = $.getEl('hour-hand')

function createMinuteIndicators(parent) {  
    for (let i = 0; i < 60; i++) {
      const line = $.createSvgEl('line')
      line.classList.add('minute-indicator')
      if (i % 5 === 0) {
        line.classList.add('minute-indicator--major')
      }
      $.setAttr(line, 'x1', '50')
      $.setAttr(line, 'y1', '5')
      $.setAttr(line, 'x2', '50')
      $.setAttr(line, 'y2', i % 5 === 0 ? 14 : 7.8)
      $.setAttr(line, 'transform', `rotate(${i * 6} 50 50)`)
      parent.appendChild(line)
    }
}

function updateClock() {
    const now = new Date()
    const seconds = now.getSeconds()
    const minutes = now.getMinutes()
    const hours = now.getHours()

    $.setAttr(secondHand, 'transform', `rotate(${seconds * 6} 50 50)`)
    $.setAttr(minuteHand, 'transform', `rotate(${minutes * 6 + seconds * 0.1} 50 50)`)
    $.setAttr(hourHand, 'transform', `rotate(${hours * 30 + minutes * 0.5} 50 50)`)
    
    requestAnimationFrame(updateClock)
}

createMinuteIndicators($.getEl('minute-indicators'))
updateClock()
clock.hidden = false