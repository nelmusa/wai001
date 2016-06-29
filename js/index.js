/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        try {
        var idnotify = localStorage.idnotify;
        alert(idnotify);
        if (idnotify == null || idnotify == "" || notify == undefined){
            var pushNotification = window.plugins.pushNotification;
            pushNotification.register(this.successHandler, this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
        }catch(err) {
            alert(err);
        }
        console.log('Received Event: ' + id);
    },
    errorHandler: function(e) {
        alert(e);
    },
    successHandler: function(result) {
        alert(result);
        localStorage.idnotify = result;
        var notify = localStorage.notify;
        if (notify == null || notify == "" || notify == 'si' || notify == undefined){
            $.get({ url: "http://www.wai-news.com/index.php?option=com_jbackend&view=request&action=put&module=push&resource=register&token=" + result + "&appcode=nms.wai.001&platform=ios&ios_alert=1&ios_badge=1&ios_sound=1" });
        }
    },
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        alert(event.body);
        try {
            event.body = JSON.parse(event.body);
            if (event.body.data.badge){
                pushNotification.setApplicationIconBadgeNumber(this.errorHandler, this.errorHandler, event.body.data.badge);
            }
            if (event.body.data.sound) {
                var snd = new Media(event.body.data.sound);
                snd.play();
            }else {
                var snd = new Media(event.sound);
                snd.play();
            }
        }catch(err) {
            alert(err);
        }
    }
};
