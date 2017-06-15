// ==UserScript==
// @name         Plex fullscreen keybinding
// @namespace    https://www.lastrik.ch/
// @version      1.0
// @description  Add the possibility to use the F key to enter and exit fullscreen mode in plex
// @author       Lastrik
// @match        http*://*:32400/*
// @match        http*://app.plex.tv/web/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function init(){
        if (location.hostname != 'app.plex.tv' && location.port != '32400'){
            return;
        }
        console.log("initialized Better plex keybindings");
        document.body.addEventListener('keydown',checkShortcuts);
    }
    init();

    function checkShortcuts(e){
        if(e.keyCode == 70){
            console.log("keyDown event ! " + e.keyCode);
            toggleFullscreen();
        }
    }

    function toggleFullscreen(){
        if(isVideo()){
            if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")){
                runPrefixMethod(document, "CancelFullScreen");
            }else{
                runPrefixMethod(document.getElementsByClassName("video-container")[0], "RequestFullScreen");
                console.log("Fullscreen !");
            }
        }
    }

    function isVideo(){
        if (document.getElementsByClassName("video-container").length === 1){
            return true;
        }else{
            return false;
        }
    }

    var pfx = ["webkit", "moz", "ms", "o", ""];
    function runPrefixMethod(obj, method) {
        var p = 0, m, t;
        while (p < pfx.length && !obj[m]) {
            m = method;
            if (pfx[p] == "") {
                m = m.substr(0,1).toLowerCase() + m.substr(1);
            }
            m = pfx[p] + m;
            t = typeof obj[m];
            if (t != "undefined") {
                pfx = [pfx[p]];
                return (t == "function" ? obj[m]() : obj[m]);
            }
            p++;
        }
    }

})();
