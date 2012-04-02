(function($, undefined){
  "use strict";

  var settings = APP.namespace('APP.settings');

  settings.view = Backbone.View.extend({
  	events: {
  		"click a.btn" : "closeModal",
      "change .js_time_setting" : "setTimeSetting"
  	},
    _displaySuccessFor : function($element){
      $element
        .parent()
          .addClass('success')
          .find('.js_save_message')
            .removeClass('hide');

    },
	  initialize : function(){
  		var self = this;
  		this._button = this.el.find('a.btn');
      this._settingsElement = this.el.find('.js_setting_element');
      
    	// remove the event listeners when the dialog is hidden
	    this.el.bind("hide", function() {
	        // remove event listeners on the buttons
	        self._button.unbind();
	    });
  	},
    setTimeSetting : function(event){
      var element = $(event.currentTarget);
      APP.models.Settings['set' + element.attr('rel')](element.val());
      this._displaySuccessFor(element);
    },
  	closeModal : function(event){
  		event.preventDefault();
  		this.el.modal('hide');
  	},
  	render : function(){
      // set current rest time

      // set current pomodoro time
      this._settingsElement.each(function(el){
         var $element = $(el);
         $element.removeClass('success')
              .find('.js_save_message')
                .addClass('hide');
      });


		  this.el.modal({
	      "backdrop"  : "static",
	      "keyboard"  : true,
	      "show"      : true    // this parameter ensures the modal is shown immediately
	    });
    }
  });



})(jQuery);


