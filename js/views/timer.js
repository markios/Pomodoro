
(function($, undefined){
	var timer = APP.namespace('APP.timer');
	
	timer.view = Backbone.View.extend({
		_isResting : false,
        initialize: function() {
            
            this.el = $(this.el)
            this._timeArea = this.el.find('.time');
            this._fullscreen = this.el.find('#js_fullscreen');
            this._restOptions = this.el.find('#js_rest_options');
            this._createPomodoro('pomodoro_time');
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
        events : {
            "click .time" : "activate",
            "dblclick .time" : "reset",
            "click #js_fullscreen" : "_fullScreen",
            "click #js_take_a_rest" : "_takeARest",
            "click #js_cancel_rest" : "_closeOptionalRest"
        },
        _setModal : function(){
            this._timerModal = new APP.timer.modalView({el : 
                                    this.el.find('#fullScreenTimerModal')});

            var self = this;
            this._timerModal.bind('close', function(){
                self.modalOn = false;
            });
        },
        render : function(){
            if(this.modalOn) return;

            this._timeArea.html(this._currentPomodoro.getTime());
		},
        _showOptionalRest : function(){
            this._timeArea.addClass('slideOut').fadeOut("slow");
            this._restOptions.removeClass('slideOut').fadeIn("slow");
        },
        _closeOptionalRest : function(){
            this._timeArea.removeClass('slideOut').fadeIn("slow");
            this._restOptions.addClass('slideOut').fadeOut("Slow");
        },
        _onPomodoroComplete : function(){
            if(APP.models.Settings.getNotifications()){
                APP.showNotification();
            }
            
            this._playBuzzer();
            this.reset();
            this.render();
            this._showOptionalRest();    
        },
        _takeARest : function(){
            this._isResting = true;
            this._currentPomodoro.destroy();
            this._createPomodoro('short_rest_time');
            this._timeArea.addClass('rest_time');
            this.render();

            this._closeOptionalRest();
        },
        _playBuzzer : function(){
            var buzz = new Audio('sounds/buzzer.wav');
            buzz.play();
        },
        _createPomodoro : function(forTime){
            var min = APP.models.Settings.getSettings()[forTime],
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
           this._createPomodoro('pomodoro_time');
           
           this._fullscreen.addClass('hide');
           this._timeArea.removeClass('rest_time');
           
           this.render();
        }
	});
})(jQuery)