(function($, undefined){
	"use strict";

	var models = APP.namespace('APP.models');

	var Pomodoro = Backbone.Model.extend({
		defaults: function() {
	      return {
	        done:  false,
	        created: new Date(),
	        sec : 0
	      };
	    },
	    continue : function(){
	    	if(this._timerStarted){
	    		this._stop();
	    	} else {
	    		this._start();
	    	}
	    },
	    _start : function(){
	    	var self = this;

	    	this._timerStarted = true;
        	self._countdown(); 
	    	
	    	// begin the interval
	    	this._timer = setInterval(function(){ 
                self._countdown(); 
        	}, 1000);
	    },
	    _stop : function (){
	    	this._timerStarted = false;
            clearInterval(this._timer);	
	    },
	    _padTime : function (time) {
    		return (time < 10) ? '0' + time  : time;
  		},
  		_finish : function(){
  			this._stop();
		    this.attributes.done = true;
		    this.trigger("done");
  		},
	    _countdown : function(){
		    if(this.attributes.min === 0 && this.attributes.sec === 0) {
		       this._finish();
		    } 
		    else if(this.attributes.sec == 0) {
		      this.attributes.min -= 1;
		      this.attributes.sec = 59;
		    } 
		    else {
		      this.attributes.sec -= 1;   
		    }
		    this.change();
		},
		getTime : function(){
			return this.attributes.min + ' : ' + this._padTime(this.attributes.sec);
		}
	});

	var PomodoroCollection = Backbone.Collection.extend({
		
		model : Pomodoro,
	    
	    // store the Todos's
	    localStorage : new Store("pomodoros"),
	    
		// Filter down the list of all todo items that are finished.
	    done: function() {
	      return this.filter(function(pomodoro){ return pomodoro.get('done'); });
	    },

	    current: function(){
	      return this.filter(function(pomodoro){ return pomodoro.get('done') == false; })[0];
	    }
	});

	models.Pomodoros = new PomodoroCollection();

})(jQuery);