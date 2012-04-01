(function($, undefined){
  "use strict";

  var settings = APP.namespace('APP.settings');

  settings.view = Backbone.View.extend({
  	events: {
  		"click a.btn" : "closeModal"
  	},
	initialize : function(){
  		var self = this;
  		this._button = this.el.find('a.btn');
  		
    	// remove the event listeners when the dialog is hidden
	    this.el.bind("hide", function() {
	        // remove event listeners on the buttons
	        self._button.unbind();
	    });
  	},
  	closeModal : function(event){
  		event.preventDefault();
  		this.el.modal('hide');
  	},
  	render : function(){
		this.el.modal({
	      "backdrop"  : "static",
	      "keyboard"  : true,
	      "show"      : true    // this parameter ensures the modal is shown immediately
	    });
  	}
  });



})(jQuery);


