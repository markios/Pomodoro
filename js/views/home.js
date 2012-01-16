(function($, undefined){
	"use strict";
	
	var home = APP.namespace('APP.home');

	home.view = Backbone.View.extend({
	    el : '.main',
        initialize : function() {
	      var tasks = new APP.tasks.view({el : $('.task-holder')}),
	          timer = new APP.timer.view({el : $('.timer-holder')});

	          timer.render();
	      		
		},
	    render: function(){
			
	    }
	});
	
})(jQuery)