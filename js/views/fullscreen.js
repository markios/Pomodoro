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
			$(document).unbind('keyup', this._keyPressCallBack);

  			this._close();
  		},
  		_close : function(){
			this.el.modal('hide');
  			// let parent know @closing
  			this.trigger('close');
  		},
  		_keyHandler : function(e){
  			if(e.keyCode === 27) this._close();
  		},
  		_setTime : function(){
  			var time  = this._currentPomodoro.getTime();
  			this._timeArea.html(time);
  		},  		
		initialize: function() {
			var self = this;

			this._timeArea = this.el.find('#js_time_area');

			this.el.modal({
		      "backdrop"  : "static",
		      "keyboard"  : false,
		      "show"      : false
		    });
		},
		render : function(pomodoro){
			this._currentPomodoro = pomodoro;

			// set the callback this way so that it can be unbound
			this._changeCallBack = $.proxy(this._setTime, this);
			this._currentPomodoro.bind('change', this._changeCallBack);
			this._completeCallBack = $.proxy(this._close, this);
			this._currentPomodoro.bind('done', this._completeCallBack);
			
			this._keyPressCallBack = $.proxy(this._keyHandler, this);
			$(document).on('keyup', this._keyPressCallBack);

			this.el.modal('show');			
		}			
	});

})(jQuery);