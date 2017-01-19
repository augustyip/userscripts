// ==UserScript==
// @name         cyclub.happyhongkong.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       August Yip
// @match        http://cyclub.happyhongkong.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var aTags = document.getElementsByTagName('a');
    Array.prototype.forEach.call(aTags, function(el, i){
        el.removeAttribute('target');
    });

    document.getElementById('silentDiv').remove();

})();
