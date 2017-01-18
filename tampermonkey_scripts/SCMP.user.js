// ==UserScript==
// @name         SCMP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      http://*.scmp.com/*
// @include      https://*.scmp.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    var css = `
#env-switch {
position: fixed;
z-index: 10000;
bottom: 40px;
right: 40px;
background-color: #fff;
border: none;
outline: none;
box-shadow: 0 0 10px rgba(0,0,0,.15);
font-weight: 700;
line-height: normal
}
#env-switch ul {margin: 0;}
#env-switch li {
padding: 2px 0;
}
`;
    addGlobalStyle(css);
    var envSwitchList = document.createElement('div');
    envSwitchList.setAttribute('id', 'env-switch');
    envSwitchList.innerHTML = '<ul><li><a href="#" data-env="local">Local</a></li><li><a href="#" data-env="devuat">DevUAT</a></li><li><a href="#" data-env="staging">Staging</a></li><li><a href="#" data-env="production">Production</a></li></ul>';
    document.body.insertBefore(envSwitchList, document.body.firstChild);

    var aTags = document.getElementById('env-switch').getElementsByTagName('a');

    Array.prototype.forEach.call(aTags, function(el, i){
        aTags[i].addEventListener("click",function(e) {
            e.stopPropagation();
            e.preventDefault();
            var protocol = window.location.protocol;
            var hostname = window.location.hostname;
            var pathname = window.location.pathname;
            var localDomain, devuatDomain, stagingDomain, productionDomain;
            if (/^m./.test(hostname)) {
                localDomain = 'm.dev-august.scmp.com';
                devuatDomain = 'm.scmpdevuat.scmp.com';
                stagingDomain = 'm.stag.scmp.com';
                productionDomain = 'm.scmp.com';
            }
            else {
                localDomain = 'dev-august.scmp.com';
                devuatDomain = 'scmpdevuat.scmp.com';
                stagingDomain = 'stag.scmp.com';
                productionDomain = 'www.scmp.com';
            }

            switch (e.target.getAttribute('data-env')){
                case 'devuat':
                    window.location.assign(protocol + '//' + devuatDomain + pathname);
                    break;
                case 'staging':
                    window.location.assign(protocol + '//' + stagingDomain + pathname);
                    break;
                case 'production':
                    window.location.assign(protocol + '//' + productionDomain + pathname);
                    break;
                case 'local':
                default:
                     window.location.assign(protocol + '//' + localDomain + pathname);
                    break;
            }
        });
    });

})();