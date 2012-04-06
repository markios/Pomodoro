
(function($, undefined){
	var timer = APP.namespace('APP.timer');
	
	timer.view = Backbone.View.extend({
		initialize: function() {
            this.el = $(this.el).find('.time');
            this._createPomodoro();
            // create shortcut stuff
            var self = this;    
            $(document).on('keypress', function(e){
                if(e.keyCode === 174){
                    self.reset();
                }
                if(e.keyCode === 960){
                    self.activate();
                }    
            });

            this.render();
        },
        render : function(){
            this.el.html(this._currentPomodoro.getTime());
		},
        _onPomodoroComplete : function(){
            
            notification.show();
            this._playBuzzer();
        },
        _playBuzzer : function(){
            var buzz = new Audio('sounds/buzzer.wav');
            buzz.play();
        },
        _createPomodoro : function(){
            var min = APP.models.Settings.getSettings().pomodoro_time,
                self = this;

            this._currentPomodoro = APP.models.Pomodoros.create({min : min});
            this._currentPomodoro.bind('change', $.proxy(this.render, this));
            this._currentPomodoro.bind('done', $.proxy(this._onPomodoroComplete, this));
        },
        events : {
	        "click .time" : "activate",
    	    "dblclick .time" : "reset"
    	},
        activate : function() {
            this._currentPomodoro.continue();
        },
        reset : function(){
           this._currentPomodoro.destroy();
           this._createPomodoro();
           this.render();
           this.el.addClass('reset');
        }
	});
})(jQuery)