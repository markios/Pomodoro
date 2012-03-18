(function($, undefined){
	"use strict";
	var home = APP.namespace('APP.home');

	home.view = Backbone.View.extend({
	    el : '.main',
        initialize : function() {
          var tasks = new APP.tasks.View({el : $('.task-holder')}),
	          timer = new APP.timer.view({el : $('.timer-holder')}),
	          statistics = new APP.statistics.view({ el : $('#statistics')});
			
			  APP.models.Todos.fetch();
	          timer.render();
	      	  statistics.render();

		},
	    render: function(){
			
	    }
	});
	
})(jQuery)