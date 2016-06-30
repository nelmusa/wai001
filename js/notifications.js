 (function ($) {
  'use strict';
  var notify = {
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
        notify.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        try {
          var idnotify = localStorage.idnotify;
          if (idnotify == null || idnotify == "" || idnotify == undefined){
              var pushNotification = window.plugins.pushNotification;
              pushNotification.register(this.successHandler, this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"notify.onNotificationAPN"});
          }
        }catch(err) {
        }
    },
    errorHandler: function(e) {
    },
    successHandler: function(result) {
        try {
            localStorage.idnotify = result;
            var notification = localStorage.notify;
            if (notification == null || notification == "" || notification == 'si' || notification == undefined){
              var request = new XMLHttpRequest();
              request.open("GET", "http://www.wai-news.com/index.php?option=com_jbackend&view=request&action=put&module=push&resource=register&token=" + result + "&appcode=nms.wai.001&platform=ios&ios_alert=1&ios_badge=1&ios_sound=1",
              true);
              request.send();
            }
        }catch(err) {
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
            alert('push APN full event ' + JSON.stringify(event));
        }catch(err) {
            alert(err);
        }
    }
};
  notify.initialize();
}(jQuery));
