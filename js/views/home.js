(function($, undefined){
	"use strict";
	var home = APP.namespace('APP.home');

	

	home.view = Backbone.View.extend({
	    el : '.main',
        initialize : function() {
    	
          // if settings are valid start pomodoro

    	  var tasks = new APP.tasks.View({el : $('.task-holder')}),
	          timer = new APP.timer.view({el : $('.timer-holder')}),
	          statistics = new APP.statistics.view({ el : $('#statistics')});
			
			  // fetch models
			  APP.models.Todos.fetch();
			  APP.models.Pomodoros.fetch();

			  // render the views
			  timer.render();
	      	  statistics.render();

		},
	    render: function(){
			
	    }
	});
	
})(jQuery)