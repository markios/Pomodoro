
(function($, undefined){
	var timer = APP.namespace('APP.timer');
	
	timer.view = Backbone.View.extend({
		_setModal : function(){
            this._timerModal = new APP.timer.modalView({el : 
                                    this.el.find('#fullScreenTimerModal')});

            var self = this;
            this._timerModal.bind('close', function(){
                self.modalOn = false;
            });
        },
        events : {
            "click .time" : "activate",
            "dblclick .time" : "reset",
            "click #js_fullscreen" : "_fullScreen"
        },
        initialize: function() {
            
            this.el = $(this.el)
            this._timeArea = this.el.find('.time');
            this._fullscreen = this.el.find('#js_fullscreen');
            this._createPomodoro();
            this._setModal();
            
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
            if(this.modalOn) return;

            this._timeArea.html(this._currentPomodoro.getTime());
		},
        _onPomodoroComplete : function(){
            if(APP.models.Settings.getNotifications()){
                APP.showNotification();
            }
            
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
        _fullScreen : function(event){
            event.preventDefault();
            // open window
            this._timerModal.render(this._currentPomodoro);
            // stop own display
            this.modalOn = true;
        },
        
        activate : function() {
            this._fullscreen.toggleClass('hide');
            this._currentPomodoro.continue();
        },
        reset : function(){
           this._currentPomodoro.destroy();
           this._createPomodoro();
           this._fullscreen.addClass('hide');
           this.render();
           this.el.addClass('reset');
        }
	});
})(jQuery)