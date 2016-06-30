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
          alert(idnotify);
          alert(localStorage.idnotify);
          if (idnotify == null || idnotify == "" || idnotify == undefined){
              alert('entró');
              var pushNotification = window.plugins.pushNotification;
              pushNotification.register(this.successHandler, this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"notify.onNotificationAPN"});
          }
        }catch(err) {
            alert(err);
        }
    },
    errorHandler: function(e) {
        alert(e);
    },
    successHandler: function(result) {
        try {
            alert(result);
            localStorage.idnotify = result;
            var notification = localStorage.notify;
            alert(notification);
            alert('notify');
            if (notification == null || notification == "" || notification == 'si' || notification == undefined){
              alert('sending action');
              $.get({ url: "http://www.wai-news.com/index.php?option=com_jbackend&view=request&action=put&module=push&resource=register&token=" + result + "&appcode=nms.wai.001&platform=ios&ios_alert=1&ios_badge=1&ios_sound=1",
                success    : function(response) {
                    //console.error(JSON.stringify(response));
                    alert('Works!');
                },
                error      : function() {
                    //console.error("error");
                    alert('Now working!');
                }
              });
            }
        }catch(err) {
            alert(err);
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
try {
    notify.initialize();
}catch(err) {
            alert(err);
        }
}(jQuery));
