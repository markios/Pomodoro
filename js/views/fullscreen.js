(function($, undefined){
	"use strict";

	var timer = APP.namespace('APP.timer');

	timer.modalView = Backbone.View.extend({
		events: {
			"click a.btn" : "closeModal"
      	},
      	closeModal : function(event){
  			event.preventDefault();
  			this._currentPomodoro.unbind('change', this._callBack);
  			this.el.modal('hide');

  			// let parent know @closing
  			this.trigger('close');
  		},
  		_setTime : function(){
  			var time  = this._currentPomodoro.getTime();
  			this._timeArea.html(time);
  		},  		
		initialize: function() {
			this._timeArea = this.el.find('#js_time_area');
		},
		render : function(pomodoro){
			this._currentPomodoro = pomodoro;

			// set the callback this way so that it can be unbound
			this._callBack = $.proxy(this._setTime, this);
			this._currentPomodoro.bind('change', this._callBack);

			this.el.modal({
		      "backdrop"  : "static",
		      "keyboard"  : true,
		      "show"      : true    
		    });
		}			
	});

})(jQuery);