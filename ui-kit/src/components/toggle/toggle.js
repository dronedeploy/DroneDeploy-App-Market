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
    const toggleSwitchPrototype = Object.create(HTMLElement.prototype)
    toggleSwitchPrototype.createdCallback = function() {
      const fontFace = `@font-face{
                    font-family:'MaterialIcons';
                    src:url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
                    font-weight:normal;
                    font-style:normal;
                  }
            @import url(https://fonts.googleapis.com/css?family=Lato:400,100,100italic,300,300italic,400italic,700,700italic,900,900italic);`
      if(!document.head.classList.contains('dd-font')) {
        const documentHead = document.head
        const pollutingStyle = document.createElement('style')
        pollutingStyle.appendChild(document.createTextNode(fontFace))
        documentHead.appendChild(pollutingStyle)
        document.head.classList.add('dd-font')
      }
      this.root_ = this.attachShadow({ mode: 'open' })
      this.value = this.hasAttribute('on')
      this.root_.innerHTML = `
        <style>
          .track {
            border-radius: 24px;
            width: 34px;
            height: 14px;
            background-color: rgba(0, 0, 0, 0.38);
            display: inline-flex;
            align-items: center;
            margin-bottom: 10px;
            cursor: pointer;
          }
          .track .ball {
            border-radius: 50%;
            width: 20px;
            height: 20px;
            box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
            background-color: #fafafa;
            transition: margin-left 0.2s, box-shadow 0.3s;
          }
          .track.active {
            background-color: rgba(3, 169, 244, 0.5);
          }
          .track.active .ball {
            background-color: #03a9f4;
            margin-left: 14px;
          }

          .track:focus {
            outline: none;
          }

          .track:focus .ball{
            outline: none;
            box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.12);
          }
        </style>
        <div class="track ${this.value ? 'active' : ''}" tabindex="0">
          <div class="ball">
          </div>
        </div>
      `
    }

    toggleSwitchPrototype.attachedCallback = function() {
      function toggleActive(track, self) {
        track.classList.toggle('active')
        self.value = track.classList.contains('active')
        self.dispatchEvent(new CustomEvent('change'))
      }

      const self = this
      const track = this.root_.querySelector('.track')
      track.onclick = () => {
        toggleActive(track, self)
        setTimeout(() => { self.blur() }, 500)
      }
      track.onkeypress = () => {
        if(event.keyCode !== 32) { return false }
        toggleActive(track, self)
      }
    }


    document.registerElement('dd-toggle', { prototype: toggleSwitchPrototype })
  }
})()