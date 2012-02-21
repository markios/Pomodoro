(function($, undefined){
	var timer = APP.namespace('APP.timer');
	
	timer.view = APP.parentView.extend({
		initialize: function() {
			this.el = $(this.el).find('.time');
		},
        render : function(){
			this._showTime();
		},
        events : {
	        "click .time" : "activate",
    	    "dblclick .time" : "reset"
    	},
    	_min : 25,
    	_sec : 0,
    	_timerStarted : false,
    	_countdown : function(){
		    this._showTime();      
		    
		    if(this._min == 0 && this._sec == 0) {
		      this._stop();
		    } 
		    if(this._sec == 0) {
		      this._min -= 1;
		      this._sec = 59;
		    } else {
		      this._sec -= 1;   
		    }
		},
        activate : function() {
        	if(this._timerStarted) {
        		this._stop();
        	} 
        	else {
        		this._start();
        	}
        },
        _padTime : function (time) {
    		return (time < 10) ? '0' + time  : time;
  		},
  		_showTime : function () {
     		this.el.html(this._padTime(this._min) + ' : ' + this._padTime(this._sec));
  		},
        reset : function(){
        	this._min = 25;
        	this._sec = 0;
        	this._showTime();
        },
        _start : function () {
        	var self = this;
        	this._timerStarted = true;
        	self._countdown(); 
            
            this._timer = setInterval(function(){ 
                self._countdown(); 
        	}, 1000);
		},
        _stop : function () {
            this._timerStarted = false;
            clearInterval(this._timer);	
        }
		
	});
})(jQuery)