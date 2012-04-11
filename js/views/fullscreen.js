(function($, undefined){
	"use strict";

	var timer = APP.namespace('APP.timer');

	timer.modalView = Backbone.View.extend({
		events: {
			"click a.btn" : "closeModal"
      	},
      	closeModal : function(event){
  			event.preventDefault();
  			
  			// unbind
			this._currentPomodoro.unbind('change', this._changeCallBack);
			this._currentPomodoro.unbind('done', this._completeCallBack);	

  			this._close();
  		},
  		_close : function(){
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
			this._changeCallBack = $.proxy(this._setTime, this);
			this._currentPomodoro.bind('change', this._changeCallBack);
			this._completeCallBack = $.proxy(this._close, this);
			this._currentPomodoro.bind('done', this._completeCallBack);

			this.el.modal({
		      "backdrop"  : "static",
		      "keyboard"  : true,
		      "show"      : true    
		    });
		}			
	});

})(jQuery);