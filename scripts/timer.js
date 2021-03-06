'use strict';

var Pomodoro = Pomodoro || new function() {

    this.Timer = function(duration, subscribers) {

        var _id = null;
        var _initial = duration;
        var _remaining = duration;
        var _subscribers = subscribers;
        
        var notifySubscribers = function(tick) {
            _subscribers.forEach(function(subscriber) { subscriber(tick); });
        };

        notifySubscribers(_initial);

        this.start = function() {

            var obj = this;

            if(obj.isRunning()) {
                return;
            }

            _id = setInterval(function() {
                if(--_remaining < 0) {
                   obj.stop(); 
                   return;  
                }

                notifySubscribers(_remaining);

           }, 1000);
        }

        this.stop = function() {
            if(this.isRunning()){
                clearInterval(_id);
                _id = null;
            }
        }

        this.reset = function() {
            this.stop();
            _remaining = _initial;
            notifySubscribers(_remaining);
        }

        this.isRunning = function() {
            return _id != null ? true : false;
        }
    }
};