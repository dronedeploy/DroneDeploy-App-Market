(function(document) {
  // TODO we need to compile this with babel
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
    const loadingPrototype = Object.create(HTMLElement.prototype);
    loadingPrototype.createdCallback = function() {
      const elem = this.attachShadow({mode: 'open'})
      elem.innerHTML = `
      <style>
        .loader {
          position: relative;
          width: 30px;
        }
        .loader:before {
          content: '';
          display: block;
          padding-top: 100%;
        }

        .circular {
          -webkit-animation: rotate 2s linear infinite;
                  animation: rotate 2s linear infinite;
          height: 100%;
          -webkit-transform-origin: center center;
                  transform-origin: center center;
          width: 100%;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
        }

        .path {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
          -webkit-animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
                  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
          stroke-linecap: round;
        }

        @-webkit-keyframes rotate {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
          }
        }

        @keyframes rotate {
          100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
          }
        }
        @-webkit-keyframes dash {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
          }
          100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
          }
        }
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
          }
          100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
          }
        }
        @-webkit-keyframes color {
          100%,
          0% {
            stroke: #2196F3;
          }
          40% {
            stroke: #2196F3;
          }
          66% {
            stroke: #2196F3;
          }
          80%,
          90% {
            stroke: #2196F3;
          }
        }
        @keyframes color {
          100%,
          0% {
            stroke: #2196F3;
          }
          40% {
            stroke: #2196F3;
          }
          66% {
            stroke: #2196F3;
          }
          80%,
          90% {
            stroke: #2196F3;
          }
        }
        </style>
        <div class="loader">
          <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>
          </svg>
        </div>
      `;
    };

    document.registerElement('dd-loading', {prototype: loadingPrototype});
  }
})(document)