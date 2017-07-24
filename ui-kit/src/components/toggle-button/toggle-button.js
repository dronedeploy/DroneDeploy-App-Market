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
    const toggleButtonPrototype = Object.create(HTMLElement.prototype)
    toggleButtonPrototype.createdCallback = function() {
      this.root_ = this.attachShadow({mode: 'open'})
      const checked = this.hasAttribute("on")
      const disabled = this.hasAttribute("disabled")
      this.root_.innerHTML = `
        <style>
          *{
            box-sizing: border-box;
          }
          .button {
            display: inline-block;
            padding: 5px;
            border-radius: 5px;
            user-select: none;
            border: 1px solid black;
          }

          .button:hover{
            cursor:pointer;
          }
          .button.on {
            color: white;
            background-color: black;
          }

          .button.off {
            color: black;
            background-color: white;
          }

          .button.disabled {
            background-color: #ccc;
            color: #eee;
            border: 1px solid #ccc;
          }

          .visually-hidden {
            display: none;
          }
        </style>
        <label>
          <input class="md-button-toggle-input visually-hidden"
          type="checkbox"
               ${checked ? 'checked' : ''}
               ${disabled ? 'disabled' : ''}
               >
          <div id="this-button" class="button ${checked ? 'on' : disabled ? 'disabled' : 'off' }">
            <slot></slot>
          </div>
        </label>
      `
    }

    toggleButtonPrototype.attachedCallback = function() {
      const self_ = this
      const thisButton = this.root_.getElementById('this-button')
      this.root_.querySelector('input[type="checkbox"]').onchange = function(event) {
        if(this.hasAttribute('disabled')) { return }
        if(event.target.hasAttribute('checked')) {
          this.removeAttribute('checked')
          thisButton.classList.remove('on')
          thisButton.classList.add('off')
          self_.removeAttribute('on')
        } else {
          this.setAttribute('checked', true)
          thisButton.classList.remove('off')
          thisButton.classList.add('on')
          self_.setAttribute('on', '')
        }
      }
    }

    document.registerElement('dd-toggle-button', { prototype: toggleButtonPrototype })
  }
})()