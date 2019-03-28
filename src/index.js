var gQuery = function (selector, context) {
  return new gQuery.fn.init(selector, context)
}

gQuery.fn = gQuery.prototype = {
  constructor: gQuery,
  length: 0,
  toArray: function () {
    return [].slice.call(this)
  },
  init: function (selector, context, root) {
    var elem
    // 通过id获取元素
    if (/^#\w+$/g.test(selector)) {
      elem = document.getElementById(selector.substr(1))
      this[0] = elem
      this.length = 1
    }
    // 通过类名获取元素
    if (/^\.\w+$/g.test(selector)) {
      elem = document.getElementsByClassName(selector.substr(1))
      for (var i = 0; i < elem.length; i++) {
        this[i] = elem[i]
      }
      this.length = i
    }

    if (selector === document) {
      this[0] = elem = document.getElementsByTagName('document')
      this.length = 1
    }

    return this
  },
  show() {
    return showHide(this, true)
  },
  hide() {
    return showHide(this)
  },
  click(handler) {
    var len = this.length
    for (var i = 0; i < len; i++) {
      var elem = this[i]
      elem.addEventListener('click', handler)
    }
  },
  ready(handler) {
    document.addEventListener('DOMContentLoaded', handler)
  },
  html(innerHTML) {
    console.log('innerhtml:', innerHTML)
    // this[0].innerHTML = innerHTML
    var i = 0,
      len = this.length
    for (; i < len; i++) {
      this[i].innerHTML = innerHTML
    }
  }
}

gQuery.fn.init.prototype = gQuery.prototype

function showHide(elements, show) {
  var display, elem,
    values = [],
    index = 0,
    len = elements.length

  // TBD 待优化 Set the display of the elements in a second loop to avoid constant reflow
  // v1
  for (; index < len; index++) {
    elem = elements[index]
    display = elem.style.display
    if (show) {
      elem.style.display = ''
    } else {
      elem.style.display = 'none'
    }
  }

  // v2
  // for (index = 0; index < length; index++) {
  //   if (values[index] != null) {
  //     elements[index].style.display = values[index];
  //   }
  // }
  return elements
}

module.exports = gQuery