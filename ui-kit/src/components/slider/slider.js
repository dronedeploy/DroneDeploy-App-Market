(function() {
  const webcomponentsjs = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.23/webcomponents.min.js'
  if(!HTMLElement.prototype.createdCallback) {
    polyfillWebComponents(webcomponentsjs, build, document)
  } else {
    build(document)
  }

  function polyfillWebComponents(url, webcomponent, document) {
    const documentHead = document.head
    const shim = document.createElement('script')
    shim.type = 'application/javascript'
    shim.src = url
    shim.onload = () => {
      webcomponent(document)
    }
    documentHead.appendChild(shim)
  }

  function build(document) {
    if(!HTMLElement.prototype.attachShadow) {
      HTMLElement.prototype.attachShadow = HTMLElement.prototype.createShadowRoot
    }
    const sliderPrototype = Object.create(HTMLElement.prototype)
    sliderPrototype.createdCallback = function() {
      this.root_ = this.attachShadow({ mode: 'open' })
      console.log('created', this, this.root_)
      this.root_.innerHTML = `
        <style>
        </style>
        <div>
          Slider Here
        </div>
      `
    }

    sliderPrototype.attachedCallback = function() {
      console.log(this)
    }


    document.registerElement('dd-slider', { prototype: sliderPrototype })
  }
})()
