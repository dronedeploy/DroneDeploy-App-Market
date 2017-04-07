(function() {
    const webcomponentsjs = 'https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.23/webcomponents.min.js'
    if (!HTMLElement.prototype.createdCallback) {
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
        if (!HTMLElement.prototype.attachShadow) {
            HTMLElement.prototype.attachShadow = HTMLElement.prototype.createShadowRoot
        }
        const containerPrototype = Object.create(HTMLElement.prototype)
        containerPrototype.createdCallback = function() {
            const title = this.getAttribute('title')
            const logo = this.getAttribute('logo')
            const alt = this.getAttribute('alt')
            this.root_ = this.attachShadow({ 'mode': 'open' })
            this.root_.innerHTML = `
            <style>
                body {
                    /*Reset margins and padding*/
                    margin:0;
                    padding:0;
                    overflow: hidden;
                }

                div {
                    margin:0;
                    padding:0;
                }

                #expand-target {
                    cursor: pointer;
                }

                a {
                    color: #2196f3;
                    text-decoration: none;
                }

                img.logo {
                    height:22px;
                    margin-right:.5rem;
                }

                /*Icons*/
                svg {
                    height:24px;
                    width:24px;
                    opacity: .2;
                }

                .container {
                    position: relative;
                    top: -1px;
                    border-top: 1px solid rgba(0, 0, 0, 0.12);
                    border-bottom:1px solid rgba(0, 0, 0, 0.12);
                    width:100%;
                    margin:0;
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                }

                .row {
                    position:relative;
                    padding: 0 0;
                    box-sizing: border-box;
                    display: -ms-flexbox;
                    display: -webkit-box;
                    display: flex;
                    -ms-flex: 0 1 auto;
                    -webkit-box-flex: 0;
                    flex: 0 1 auto;
                    -ms-flex-direction: row;
                    -webkit-box-orient: horizontal;
                    -webkit-box-direction: normal;
                    flex-direction: row;
                    -ms-flex-wrap: wrap;
                    flex-wrap: wrap;
                    margin: 0 10px;
                    /*Added space in between by default custom G*/
                    justify-content: space-between;
                }

                .col-1,
                .col-2,
                .col-3,
                .col-4 {
                    box-sizing: border-box;
                    -ms-flex: 0 0 auto;
                    -webkit-box-flex: 0;
                    flex: 0 0 auto;
                    padding-left: 4px;
                }

                .col-1 {
                    -ms-flex-preferred-size: calc(25% - 4px);
                    flex-basis: calc(25% - 4px);
                    max-width: calc(25% - 4px);
                }
                .col-2 {
                    -ms-flex-preferred-size: 50%;
                    flex-basis: calc(50% - 4px);
                    max-width: calc(50% - 4px);
                }
                .col-3 {
                    -ms-flex-preferred-size: 75%;
                    flex-basis: calc(75% - 4px);
                    max-width: calc(75% - 4px);
                }
                .col-4 {
                -ms-flex-preferred-size: 100%;
                    flex-basis: calc(100% - 4px);
                    max-width: calc(100% - 4px);
                }

                /*Vertically center aligned*/
                .vert-center {
                    display:flex;
                    -ms-flex-align: center;
                    -webkit-box-align: center;
                    align-items: center;
                }

                .right{
                    display: flex;
                    justify-content: flex-end;
                }
                #expand-section{
                    display: none;
                    margin: 0px 10px;
                    padding-left: 4px;
                    padding-right: 4px;
                }
            </style>
            <div class="container">
                <div class="row" id="expand-target">
                    <div class="col-3">
                        <span class="lead vert-center"><img class="logo" src="${logo}" alt="${alt}">${title}</span>
                    </div>
                    <div class="col-1 right" id="arrow-container">
                        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
                            <path d="M0-.75h24v24H0z" fill="none"/>
                        </svg>
                    </div>
                </div>

                <div id="expand-section" style="">
                    <slot></slot>
                </div>
            </div>
            <template id="up-arrow">
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
            </template>
            <template id="down-arrow">
                <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
                    <path d="M0-.75h24v24H0z" fill="none"/>
                </svg>
            </template>
            `
        }

        containerPrototype.attachedCallback = function() {
            let isExpanded = false
            const upArrow = this.root_.querySelector('#up-arrow').innerHTML
            const downArrow = this.root_.querySelector('#down-arrow').innerHTML
            const expandBody = this.root_.querySelector('#expand-section');
            const expandTarget = this.root_.querySelector('#expand-target');
            const arrowContainer = this.root_.querySelector('#arrow-container')
            expandTarget.addEventListener('click', function() {
                isExpanded = !isExpanded
                if (isExpanded) {
                    arrowContainer.innerHTML = upArrow;
                    expandBody.style.display = 'block';
                } else {
                    arrowContainer.innerHTML = downArrow;
                    expandBody.style.display = 'none';
                }
            })
        }

        document.registerElement('dd-app', { prototype: containerPrototype })
    }
})()
