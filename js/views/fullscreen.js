(function($, undefined){
	"use strict";

	var timer = APP.namespace('APP.timer');

	var view = Backbone.View.extend({
		events: {
			"click a.btn" : "closeModal"
      	},
      	closeModal : function(event){
  			event.preventDefault();
  			this.el.modal('hide');
  		},
  		_setTime : function(){
  			
  		},  		
		initialize: function() {
			var self = this;
			this._currentPomodoro = options.pomodoro;
			this._currentPomodoro.bind('change', function(event){
	    		self._setTime(self._currentPomodoro.getTime());
	    	});
		},
		render : function(){


			this.el.modal({
		      "backdrop"  : "static",
		      "keyboard"  : true,
		      "show"      : true    
		    });
		}			
	});


})(jQuery);