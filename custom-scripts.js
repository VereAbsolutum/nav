/**
 * @author [VereAbsolutum]
 * @email [sergiopile3@gmail.com]
 * @create date 2021-12-01 19:45:21
 * @modify date 2021-12-01 19:45:21
 * @desc [Animated overlay menu]
 */

'use strict'

var form = document.querySelector('#form')
var inputs = form.querySelectorAll('input')
var fieldsName = form.querySelectorAll('input[name]')

var setAnimation = navkit.setAnimation
var defaultSettings = navkit.settings
var updateSettings = navkit.updateSettings

var inputsAdapter = {
  numberOfWaves: 'waveNumber',
  delay: 'waveDelay',
  orientation: 'inverse',
  direction: 'orientation',
  numberOfCrests: 'crestNumber',
  amplitude: 'maxAmplitude',
  duration: 'duration',
  shapeFunction: 'shapeFunction',
  exitAnimation: 'navItemsAnimeExit',
  enterAnimation: 'navItemsAnimeEnter',
  color: 'color',
  navItemsOrientation: 'navItemsOrientation',
  navItemsDirection: 'navItemsDirection',
  skin: 'skin',
  navItemsDelay: 'navItemsDelay'
}

var it = {
  is: {
    positive: function (v) {
      return v >= 0
    },
    integer: function (v) {
      return v % 1 === 0
    },
    float: function (v) {
      return v % 1 !== 0
    },
    nonzero: function (v) {
      return v !== 0
    },
    object: function (v) {
      return typeof v === 'object'
    },
    number: function (v) {
      return typeof v == 'number'
    },
    string: function (v) {
      return typeof v == 'string'
    },
    sin: function (v) {
      return v === 'sin'
    },
    square: function (v) {
      return v === 'square'
    },
    random: function (v) {
      return v === 'random'
    }
  },

  will: {
    create: function (val, priorVal) {
      return val > priorVal
    },
    remove: function (val, priorVal) {
      return val < priorVal
    }
  }
}

var inputObject = (function () {
  var array = []
  for (var i = 0; i < fieldsName.length; i++) {
    var field = fieldsName[i]
    array[i] = {
      field: field.name,
      target: field,
      value: field.value
    }
  }
  return array
})()

function setAttributes(elem, attributes) {
  var length = attributes.length
  for (var i = 0; i < length; i++) {
    var attr = attributes[i].attr
    var val = attributes[i].value
    elem.setAttribute(attr, val)
  }
  return elem
}

function createNode(obj) {
  var tag = document.createElement(obj.tag)
  return setAttributes(tag, obj.attributes)
}

function ColorComponent(color) {
  var formContent = createNode({
    tag: 'div',
    attributes: [
      {
        attr: 'class',
        value: 'form__content flex__wrapper-100'
      }
    ]
  })
  var label = createNode({
    tag: 'label',
    attributes: [
      {
        attr: 'for',
        value: 'color'
      },
      {
        attr: 'class',
        value: 'form__label input-text'
      }
    ]
  })
  var formPopup = createNode({
    tag: 'div',
    attributes: [
      {
        attr: 'class',
        value: 'form__popup'
      }
    ]
  })
  var formPopupWrapper = createNode({
    tag: 'div',
    attributes: [
      {
        attr: 'class',
        value: 'form__popup-wrapper'
      }
    ]
  })
  var span = createNode({
    tag: 'span',
    attributes: [
      {
        attr: 'class',
        value: 'form__popup-span'
      }
    ]
  })
  var input = createNode({
    tag: 'input',
    attributes: [
      {
        attr: 'class',
        value: 'form__input'
      },
      {
        attr: 'required',
        value: ''
      },
      {
        attr: 'type',
        value: 'color'
      },
      {
        attr: 'value',
        value: color
      },
      {
        attr: 'name',
        value: 'color'
      }
    ]
  })
  var formInputDescription = createNode({
    tag: 'div',
    attributes: [
      {
        attr: 'class',
        value: 'form__input-description'
      }
    ]
  })
  var formDescriptionSpan = createNode({
    tag: 'span',
    attributes: [
      {
        attr: 'class',
        value: 'form__description-span'
      }
    ]
  })

  formDescriptionSpan.innerText = 'wave'
  span.innerText = 'wave'
  formPopupWrapper.appendChild(span)
  formPopup.appendChild(formPopupWrapper)
  formInputDescription.appendChild(formDescriptionSpan)
  label.appendChild(formPopup)
  label.appendChild(input)
  label.appendChild(formInputDescription)
  formContent.appendChild(label)

  return formContent
}

function createComponentArray(component, array) {
  var componentArray = []
  for (let i = 0; i < array.length; i++) {
    var value = array[i]
    componentArray[i] = component(value)
  }
  return componentArray
}

function createFragment(array) {
  var frag = document.createDocumentFragment()
  var length = array.length
  for (var i = 0; i < length; i++) {
    var child = array[i]
    frag.appendChild(child)
  }
  return frag
}

function appendColorComponent(colorArray) {
  var parent = document.querySelector('.color-element')
  var colorComponentArray = createComponentArray(ColorComponent, colorArray)
  var frag = createFragment(colorComponentArray)
  parent.appendChild(frag)
}

function updateInput(ev, value) {
  var param = 'value'
  var type = ev.target.type

  if (type === 'checkbox') {
    param = 'checked'
  }

  if (type === 'color' || ev.target.name === 'color') {
    var position = getColorPosition(ev.target)
    value = value[position]
  }

  ev.target[param] = value
}

function setDefault() {
  var form = document.querySelector('#form')
  form.reset()
}

var param = {
  navItemsDelay: function (p) {
    return 1 - p
  },
  direction: function (p) {
    p = p.toLowerCase()
    var value = 'h'
    if (p == 'vertical') {
      value = 'v'
    }
    return value
  },
  duration: function (p) {
    return (p = +p)
  },
  numberOfWaves: function (p) {
    p = +p
    return p
  },
  amplitude: function (p) {
    return (p = +p)
  },
  numberOfCrests: function (p) {
    return (p = +p)
  },
  delay: function (p) {
    return (p = +p)
  }
}

function parametrization(fieldName, value) {
  if (param[fieldName]) return param[fieldName](value)
  return value
}

function validate(type, value, fieldName) {
  if (defaultSettings.status === 'opened') {
    return false
  }

  if (
    type === 'number' &&
    fieldName !== 'navItemsDelay' &&
    it.is.nonzero(value) &&
    it.is.integer(value) &&
    it.is.number(value) &&
    it.is.positive(value)
  ) {
    return true
  }

  if (fieldName === 'navItemsDelay' && it.is.positive(value) && value <= 1) {
    return true
  }

  if (type === 'select-one' && it.is.string(value)) {
    return true
  }

  if (type === 'checkbox') {
    return true
  }

  if (
    (type === 'color' && fieldName === 'color') ||
    (fieldName === 'color' && type === 'text')
  ) {
    return true
  }

  return false
}

function findIndex(array, callback) {
  if (array === null) {
    throw new Error('argument array is null or undefined')
  } else if (typeof callback !== 'function') {
    throw new Error('callback must be a function')
  }
  var length = array.length >>> 0
  for (var i = 0; i < length; i++) {
    if (callback(array[i], i, array)) {
      return i
    }
  }
  return -1
}

function getColorsArray(target) {
  var name = target.name
  var value = target.value
  var colorsArray = Object.assign([], defaultSettings.color)
  var container = document.querySelector('.color-element')
  var pathNodes = container.querySelectorAll('input')
  var position = findIndex(pathNodes, function (elem) {
    return elem === target
  })
  colorsArray[position] = parametrization(name, value)

  return colorsArray
}

function randomHEX() {
  var getHexa = function (val) {
    var hexa = parseInt(val).toString(16)
    return hexa.length == 1 ? '0' + hexa : hexa
  }
  var rangeRGB = function () {
    return Math.trunc(Math.random() * 255)
  }
  var r = rangeRGB()
  var g = rangeRGB()
  var b = rangeRGB()

  return '#' + getHexa(r) + getHexa(g) + getHexa(b)
}

function arrayUnion(array, array2) {
  var length = array2.length
  for (var i = 0; i < length; i++) {
    var lastPosition = array.length
    var pushElem = array2[i]
    array[lastPosition] = pushElem
  }
  return array
}

function getTargetValue(target) {
  if (target.type === 'checkbox') return target.checked
  if (target.type === 'color' || target.name === 'color')
    return getColorsArray(target)
  return target.value
}

function removeChildNode(element, number) {
  var firstChild = element.firstChild
  while (number > 0 && firstChild != element.lastChild) {
    number--
    element.removeChild(element.lastChild)
  }
}

function updateColorComponent(value, priorValue) {
  var parent = document.querySelector('.color-element')

  if (it.will.create(value, priorValue)) {
    var numberOfColorsToAdd = value - priorValue
    var colorsToAdd = defaultSettings.color.slice(-numberOfColorsToAdd)
    var componentsArray = createComponentArray(ColorComponent, colorsToAdd)
    var frag = createFragment(componentsArray)
    parent.appendChild(frag)
  } else if (it.will.remove(value, priorValue)) {
    var numberOfComponents = priorValue - value
    removeChildNode(parent, numberOfComponents)
  }
}

function getColorPosition(target) {
  var container = document.querySelector('.color-element')
  var pathNodes = container.querySelectorAll('input')
  var position = findIndex(pathNodes, function (elem) {
    return elem === target
  })
  return position
}

var delay
var memory = []

function handleChanges(e) {
  e.stopPropagation()
  e.preventDefault()
  var target = e.target

  if (!target.name) {
    return
  }

  clearTimeout(delay)

  delay = setTimeout(function () {
    var name = target.name
    var value = parametrization(name, getTargetValue(target))
    var response = validate(target.type, value, name)

    memory[0] = defaultSettings[inputsAdapter[name]]

    if (response) {
      setAnimation({
        fieldName: inputsAdapter[name],
        value: value
      })
      if (name === 'numberOfWaves') {
        updateColorComponent(value, memory[0])
      }
    } else {
      var priorValue = memory[0]

      updateInput(e, priorValue)
      if (defaultSettings.status === 'opened') {
        alert('Please, close the menu first.')
      }
    }
  }, 200)

  return false
}

function init(defaultSettings) {
  setDefault()
  var colorArray = defaultSettings.color
  appendColorComponent(colorArray)
  form.addEventListener('change', handleChanges)
}

init(defaultSettings)

// ======================================================================================================================================
// ======================================================================================================================================

// BACKGROUND

// ======================================================================================================================================
// ======================================================================================================================================

var txt = document.querySelector('#navText')
var wrapper = { target: txt }

function setBackground(e) {
  if (defaultSettings.status === 'opened') {
    return
  }

  var background = document.querySelector('main')

  background.classList.remove('white', 'dark')

  if (e.target.value === 'dark') {
    background.classList.add('white')
  }
  if (e.target.value === 'light') {
    background.classList.add('dark')
  }
  if (e.target.value === 'dark-light') {
    background.classList.add('white')
  }
  if (e.target.value === 'light-dark') {
    background.classList.add('dark')
  }
}

txt.addEventListener('change', setBackground)
setBackground(wrapper)

// ======================================================================================================================================
// ======================================================================================================================================

// CREATE DOWNLOAD FILES

// ======================================================================================================================================
// ======================================================================================================================================

var btnHide = document.querySelector('#btn-export-hide')
var btnShow = document.querySelector('#btn-export-show')
var btnExport = document.querySelector('#btn-export')
var downloadHTML = document.querySelector('#download-html')
var downloadCSS = document.querySelector('#download-css')
var downloadJS = document.querySelector('#download-js') // here
var downloadNavkitJS = document.querySelector('#download-navkit-js')
var downContainer = document.querySelector('#download-container')

function downloadData(data, fileName, mimeType) {
  var blob = new Blob([data], { type: mimeType })

  if (window.navigator && window.navigator.msSaveOrOpenBlob)
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  else {
    var href = URL.createObjectURL(blob)
    var a = Object.assign(document.createElement('a'), {
      href: href,
      style: 'display:none',
      download: fileName,
      target: '_blank'
    })
    // var handler = function (e) {
    //   e.preventDefault()
    //   window.open(href, '_blank', 'width=600,height=400')
    // }

    // a.addEventListener('click', handler)
    a.click()
    URL.revokeObjectURL(href)
    a.remove()
    // a.removeEventListener('click', handler)
  }

  return false
}

function downloadFromFile(fileName, src, mimeType) {
  var xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = xhr.responseText
      downloadData(data, fileName, mimeType)
    }
  }
  xhr.open('GET', src)
  xhr.send()

  return false
}

// here
function downloadJSFile() {
  var data =
    'var updateSettings = navkit.updateSettings \n updateSettings({\n    waveNumber: '
      .concat(defaultSettings.waveNumber, ',\n    waveDelay: ')
      .concat(defaultSettings.waveDelay, ',\n    inverse: ')
      .concat(defaultSettings.inverse, ',\n    orientation: "')
      .concat(defaultSettings.orientation, '",\n    crestNumber: ')
      .concat(defaultSettings.crestNumber, ',\n    maxAmplitude: ')
      .concat(defaultSettings.maxAmplitude, ',\n    duration: ')
      .concat(defaultSettings.duration, ',\n    shapeFunction: "')
      .concat(defaultSettings.shapeFunction, '",\n    color: "')
      .concat(defaultSettings.color, '",\n    navItemsOrientation: ')
      .concat(
        defaultSettings.navItemsOrientation,
        ',\n    navItemsDirection: "'
      )
      .concat(defaultSettings.navItemsDirection, '",\n    durationPlusDelay: ')
      .concat(defaultSettings.durationPlusDelay, ',\n    skin: "')
      .concat(defaultSettings.skin, '",\n  })')

  downloadData(data, 'custom-scripts.js', 'text/plain')
}

function downloadNakvitFile() {
  downloadFromFile('navkit.min.js', './navkit.min.js', 'text/plain')
}

function downloadCSSFile() {
  downloadFromFile('navkit.min.css', './css/navkit.min.css', 'text/plain')
}

function downloadHtml() {
  downloadFromFile('index.html', './assets/templates/index.md', 'text/plain')
}

btnHide.classList.add('display-none')
btnExport.addEventListener('click', function () {
  downContainer.classList.toggle('display-none')
  btnHide.classList.toggle('display-none')
  btnShow.classList.toggle('display-none')
  return false
})
downloadHTML.addEventListener('click', function (e) {
  downloadHtml()
  e.preventDefault()

  e.stopPropagation()
  return false
})
downloadCSS.addEventListener('click', function (e) {
  downloadCSSFile()
  return false
})
downloadJS.addEventListener('click', function (e) {
  downloadJSFile()
  return false
})
downloadNavkitJS.addEventListener('click', function (e) {
  downloadNakvitFile()
  return false
})
