// ==UserScript==
// @name         Plex fullscreen keybinding
// @namespace    https://www.lastrik.ch/
// @version      1.0
// @description  Add the possibility to use the F key to enter and exit fullscreen mode in plex
// @author       Lastrik
// @match        http*://*:32400/*
// @match        http*://app.plex.tv/web/*
// @grant        none
// @license  MIT
// ==/UserScript==

(function() {
    'use strict';

    /*
    You can add your own shortcuts here. Syntax : [new Shortcut("<keyCode","<action>"),new Shortcut("<keyCode","<action>"),etc...]
    List of possible actions :
    ------------------------------------
    toggleFullscreen : toggle fullscreen
    togglePlayPause : toggle play/pause
    volup : volume up
    voldown : volume down
    */
    const shortcuts = [new Shortcut("70","toggleFullscreen"),new Shortcut("75","togglePlayPause")]
    var vid = document.getElementById("html-video");

    function init(){
        if (location.hostname != 'app.plex.tv' && location.port != '32400'){
            return;
        }
        console.log("initialized Better plex keybindings");
        document.body.addEventListener('keydown',checkShortcuts);
    }
    init();

    function checkShortcuts(e){
        for (var i = shortcuts.length - 1; i >= 0; i--) {
            if (shortcuts[i].keyCode == e.keyCode){
                eval(shortcuts[i].action + "()")
            }
        }
    }

    function volup(){
        vid.volume += 0.1;
    }

    function voldown(){
        vid.volume -= 0.1;
    }

    function togglePlayPause(){
        if(isVideo()){
            if(vid.paused){
                vid.play();
            }else{
                vid.pause();
            }
        }
    }

    function toggleFullscreen(){
        if(isVideo()){
            if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")){
                runPrefixMethod(document, "CancelFullScreen");
            }else{
                runPrefixMethod(document.getElementsByClassName("video-container")[0], "RequestFullScreen");
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

function Shortcut(keycode,action){
    return {"keycode":keycode,"action":action};
}