// ==UserScript==
// @name         SCMP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://*.scmp.com/*
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

    function addEnvSwitchList() {
        var body;
        body = document.getElementsByTagName('body')[0];
        if (!body) { return; }
        EnvSwitchList = document.createElement('div');
        EnvSwitchList.id = 'env-switch';
        EnvSwitchList.innerHTML = 'testaaaaa';
        body.appendChild(EnvSwitchList);
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

`;
    addGlobalStyle(css);
    var envSwitchList = document.createElement('div');
    envSwitchList.setAttribute('id', 'env-switch');
    envSwitchList.innerHTML = '<ul><li>teststestset</li></ul>';
    document.body.insertBefore(envSwitchList, document.body.firstChild);
})();