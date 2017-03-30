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
        .rkmd-slider {
          display: block;
          position: relative;
          font-size: 16px;
          font-family: 'Roboto', sans-serif;
        }
        .rkmd-slider input[type="range"] {
          overflow: hidden;
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
        }
        .rkmd-slider input[type="range"] + .slider {
          display: block;
          position: relative;
          width: 100%;
          height: 4px;
          background-color: #bebebe;
        }
        .rkmd-slider input[type="range"] + .slider .slider-fill {
          display: block;
          position: absolute;
          width: 0%;
          height: 100%;
          -webkit-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
          z-index: 1;
        }
        .rkmd-slider input[type="range"] + .slider .slider-handle {
          cursor: pointer;
          position: absolute;
          top: -5.5px;
          left: 0%;
          width: 15px;
          height: 15px;
          margin-left: -8px;
          border-radius: 50%;
          -webkit-transition: all .2s ease;
          transition: all .2s ease;
          -webkit-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
          z-index: 2;
        }
        .rkmd-slider input[type="range"]:disabled + .slider {
          background-color: #b0b0b0 !important;
        }
        .rkmd-slider input[type="range"]:disabled + .slider .slider-fill,
        .rkmd-slider input[type="range"]:disabled + .slider .slider-handle {
          cursor: default !important;
          background-color: #b0b0b0 !important;
        }
        .rkmd-slider input[type="range"]:disabled + .slider .slider-fill .slider-label,
        .rkmd-slider input[type="range"]:disabled + .slider .slider-handle .slider-label {
          display: none;
          background-color: #b0b0b0 !important;
        }
        .rkmd-slider input[type="range"]:disabled + .slider .slider-fill.is-active,
        .rkmd-slider input[type="range"]:disabled + .slider .slider-handle.is-active {
          top: -5.5px;
          width: 15px;
          height: 15px;
          margin-left: -8px;
        }
        .rkmd-slider input[type="range"]:disabled + .slider .slider-fill.is-active .slider-label,
        .rkmd-slider input[type="range"]:disabled + .slider .slider-handle.is-active .slider-label {
          display: none;
          border-radius: 50%;
          -webkit-transform: none;
                  transform: none;
        }
        .rkmd-slider input[type="range"]:disabled + .slider .slider-handle:active {
          box-shadow: none !important;
          -webkit-transform: scale(1) !important;
                  transform: scale(1) !important;
        }
        .rkmd-slider.slider-light input[type="range"] + .slider {
          background-color: #5c5c5c;
        }
        .rkmd-slider.slider-light input[type="range"]:disabled + .slider {
          background-color: #5c5c5c !important;
        }
        .rkmd-slider.slider-light input[type="range"]:disabled + .slider .slider-fill,
        .rkmd-slider.slider-light input[type="range"]:disabled + .slider .slider-handle {
          background-color: #5c5c5c !important;
        }
        .rkmd-slider.slider-continuous.slider-scale .slider-handle:active {
          -webkit-transform: scale(1.4);
                  transform: scale(1.4);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-lightBlue .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(3, 169, 244, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-teal .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(0, 150, 136, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-orange .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(255, 152, 0, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-amber .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(255, 193, 7, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-green .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(76, 175, 80, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-cyan .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(0, 188, 212, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-indigo .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(63, 81, 181, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-deepPurple .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(103, 58, 183, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-pink .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(233, 30, 99, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-red .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(244, 67, 54, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-yellow .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(255, 235, 59, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-lime .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(205, 220, 57, 0.26);
        }
        .rkmd-slider.slider-continuous.slider-shadow.slider-brown .slider-handle:active {
          box-shadow: 0 0 0 10px rgba(121, 85, 72, 0.26);
        }
        .rkmd-slider.slider-discrete .slider .slider-handle {
          position: relative;
          z-index: 1;
        }
        .rkmd-slider.slider-discrete .slider .slider-handle .slider-label {
          position: absolute;
          top: -17.5px;
          left: -2px;
          width: 30px;
          height: 30px;
          -webkit-transform-origin: 50% 100%;
                  transform-origin: 50% 100%;
          border-radius: 50%;
          -webkit-transform: scale(0.5) rotate(-45deg);
                  transform: scale(0.5) rotate(-45deg);
          -webkit-transition: all .2s ease;
          transition: all .2s ease;
        }
        .rkmd-slider.slider-discrete .slider .slider-handle .slider-label span {
          position: absolute;
          top: 7px;
          left: 0px;
          width: 100%;
          color: #fff;
          font-size: 12px;
          text-align: center;
          -webkit-transform: rotate(45deg);
                  transform: rotate(45deg);
          opacity: 0;
          -webkit-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
        }
        .rkmd-slider.slider-discrete .slider .slider-handle.is-active {
          top: 0px;
          margin-left: -2px;
          width: 4px;
          height: 4px;
        }
        .rkmd-slider.slider-discrete .slider .slider-handle.is-active .slider-label {
          top: -15px;
          left: -2px;
          border-radius: 15px 15px 15px 0;
          -webkit-transform: rotate(-45deg) translate(23px, -25px);
                  transform: rotate(-45deg) translate(23px, -25px);
        }
        .rkmd-slider.slider-discrete .slider .slider-handle.is-active .slider-label span {
          opacity: 1;
        }
        .rkmd-slider.slider-discrete.slider-lightBlue .slider-label {
          background-color: #03a9f4;
        }
        .rkmd-slider.slider-discrete.slider-teal .slider-label {
          background-color: #009688;
        }
        .rkmd-slider.slider-discrete.slider-orange .slider-label {
          background-color: #ff9800;
        }
        .rkmd-slider.slider-discrete.slider-amber .slider-label {
          background-color: #ffc107;
        }
        .rkmd-slider.slider-discrete.slider-green .slider-label {
          background-color: #4caf50;
        }
        .rkmd-slider.slider-discrete.slider-cyan .slider-label {
          background-color: #00bcd4;
        }
        .rkmd-slider.slider-discrete.slider-indigo .slider-label {
          background-color: #3f51b5;
        }
        .rkmd-slider.slider-discrete.slider-deepPurple .slider-label {
          background-color: #673ab7;
        }
        .rkmd-slider.slider-discrete.slider-pink .slider-label {
          background-color: #e91e63;
        }
        .rkmd-slider.slider-discrete.slider-red .slider-label {
          background-color: #f44336;
        }
        .rkmd-slider.slider-discrete.slider-yellow .slider-label {
          background-color: #ffeb3b;
        }
        .rkmd-slider.slider-discrete.slider-lime .slider-label {
          background-color: #cddc39;
        }
        .rkmd-slider.slider-discrete.slider-brown .slider-label {
          background-color: #795548;
        }
        .rkmd-slider.slider-lightBlue .slider-fill,
        .rkmd-slider.slider-lightBlue .slider-handle {
          background-color: #03a9f4;
        }
        .rkmd-slider.slider-teal .slider-fill,
        .rkmd-slider.slider-teal .slider-handle {
          background-color: #009688;
        }
        .rkmd-slider.slider-orange .slider-fill,
        .rkmd-slider.slider-orange .slider-handle {
          background-color: #ff9800;
        }
        .rkmd-slider.slider-amber .slider-fill,
        .rkmd-slider.slider-amber .slider-handle {
          background-color: #ffc107;
        }
        .rkmd-slider.slider-green .slider-fill,
        .rkmd-slider.slider-green .slider-handle {
          background-color: #4caf50;
        }
        .rkmd-slider.slider-cyan .slider-fill,
        .rkmd-slider.slider-cyan .slider-handle {
          background-color: #00bcd4;
        }
        .rkmd-slider.slider-indigo .slider-fill,
        .rkmd-slider.slider-indigo .slider-handle {
          background-color: #3f51b5;
        }
        .rkmd-slider.slider-deepPurple .slider-fill,
        .rkmd-slider.slider-deepPurple .slider-handle {
          background-color: #673ab7;
        }
        .rkmd-slider.slider-pink .slider-fill,
        .rkmd-slider.slider-pink .slider-handle {
          background-color: #e91e63;
        }
        .rkmd-slider.slider-red .slider-fill,
        .rkmd-slider.slider-red .slider-handle {
          background-color: #f44336;
        }
        .rkmd-slider.slider-yellow .slider-fill,
        .rkmd-slider.slider-yellow .slider-handle {
          background-color: #ffeb3b;
        }
        .rkmd-slider.slider-lime .slider-fill,
        .rkmd-slider.slider-lime .slider-handle {
          background-color: #cddc39;
        }
        .rkmd-slider.slider-brown .slider-fill,
        .rkmd-slider.slider-brown .slider-handle {
          background-color: #795548;
        }
        </style>
        <div class="rkmd-slider slider-continuous slider-shadow slider-lightBlue">
          <input type="range" min="${this.getAttribute('min') || 0}" max="${this.getAttribute('max') || 100}" value="${this.getAttribute('value') || 50}">
        </div>
      `
    }

    sliderPrototype.attachedCallback = function() {
      createRangeSlider(this, this.shadowRoot.querySelector('.rkmd-slider'));
    }

    function createRangeSlider(dispatchNode, node) {
      var curnt, range, slider;
      var qs = node.querySelector.bind(node);
      var {width: slider_width, left: slider_offset } = node.getBoundingClientRect();

      if(node.classList.contains('slider-continuous') === true) {
        node.appendChild(toNode(sliderContinuous_tmplt()));
        range         = qs('input[type="range"]');
        slider_fill   = qs('.slider-fill');
        slider_handle = qs('.slider-handle');
        slider_fill.style.width = range.value +'%';
        slider_handle.style.left = range.value +'%';
        dispatchNode.value = range.value;
      }

      qs('.slider-handle').addEventListener('mousedown', function(e) {
        if(e.button === 2) {
          return false;
        }


        function updateSliderOnMouseMove(e){
          var slider_new_width = e.pageX - slider_offset;

          if(slider_new_width <= slider_width && !(slider_new_width < '0')) {
            slider_move(dispatchNode, node, slider_new_width, slider_width);
          }
        }

        document.addEventListener('mousemove', updateSliderOnMouseMove);
        document.addEventListener('mouseup', function(e){
          document.removeEventListener('mousemove', updateSliderOnMouseMove);
          document.removeEventListener('mouseup', this);
        });

      });

      qs('.slider').addEventListener('mousedown', function(e) {
        if(e.button === 2) {
          return false;
        }

        var slider_new_width = e.pageX - slider_offset;
        if(slider_new_width <= slider_width && !(slider_new_width < '0')) {
          slider_move(dispatchNode, node, slider_new_width, slider_width);
        }
      });
    };

    function toNode(html){
      var div = document.createElement('div');
      div.innerHTML = html;
      return div.firstChild;
    }

    function sliderContinuous_tmplt() {
      var tmplt = '<div class="slider">' +
      '<div class="slider-fill"></div>' +
      '<div class="slider-handle"></div>' +
      '</div>';

      return tmplt;
    }

    function slider_move(dispatchNode, node, newW, sliderW) {
      var slider_new_val = parseInt(Math.round(newW / sliderW * 100));
      var slider_fill    = node.querySelector('.slider-fill');
      var slider_handle  = node.querySelector('.slider-handle');
      var range          = node.querySelector('input[type="range"]');
      slider_fill.style.width = slider_new_val +'%';
      slider_handle.style.left = slider_new_val +'%';
      slider_handle.style.transition = 'none';
      slider_handle.style.webkitTransition = 'none';
      slider_handle.style.mozTransition = 'none';
      range.value = slider_new_val;
      dispatchNode.dispatchEvent(new CustomEvent('change'))
      dispatchNode.value = slider_new_val;
    }

    document.registerElement('dd-slider', { prototype: sliderPrototype })
  }
})()
